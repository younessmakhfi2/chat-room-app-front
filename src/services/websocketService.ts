import { ChatMessage, WebSocketMessage } from "../types/chat";

class WebSocketService {
  private ws: WebSocket | null = null;
  private url: string;
  private messageHandlers: Set<(message: ChatMessage) => void> = new Set();
  private connectionHandlers: Set<
    (status: "connected" | "disconnected" | "error") => void
  > = new Set();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 3000;

  constructor(url: string = "ws://localhost:8080") {
    this.url = url;
  }

  /**
   * Connect to WebSocket server
   */
  public connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
          console.log("[WebSocket] Connected");
          this.reconnectAttempts = 0;
          this.notifyConnectionStatus("connected");
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const data: WebSocketMessage = JSON.parse(event.data);
            this.notifyMessageHandlers(data.payload);
          } catch (error) {
            console.error("[WebSocket] Failed to parse message:", error);
          }
        };

        this.ws.onerror = (error) => {
          console.error("[WebSocket] Error:", error);
          this.notifyConnectionStatus("error");
          reject(error);
        };

        this.ws.onclose = () => {
          console.log("[WebSocket] Disconnected");
          this.notifyConnectionStatus("disconnected");
          this.attemptReconnect();
        };
      } catch (error) {
        console.error("[WebSocket] Connection failed:", error);
        reject(error);
      }
    });
  }

  /**
   * Send a chat message
   */
  public sendMessage(message: ChatMessage): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.warn("[WebSocket] Connection not open");
      return;
    }

    const wsMessage: WebSocketMessage = {
      type: message.type,
      payload: {
        ...message,
        timestamp: Date.now(),
      },
    };

    this.ws.send(JSON.stringify(wsMessage));
  }

  /**
   * Subscribe to incoming messages
   */
  public onMessage(handler: (message: ChatMessage) => void): () => void {
    this.messageHandlers.add(handler);

    // Return unsubscribe function
    return () => {
      this.messageHandlers.delete(handler);
    };
  }

  /**
   * Subscribe to connection status changes
   */
  public onConnectionChange(
    handler: (status: "connected" | "disconnected" | "error") => void
  ): () => void {
    this.connectionHandlers.add(handler);

    // Return unsubscribe function
    return () => {
      this.connectionHandlers.delete(handler);
    };
  }

  /**
   * Disconnect from server
   */
  public disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  /**
   * Get connection status
   */
  public isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  /**
   * Attempt to reconnect
   */
  private attemptReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(
        `[WebSocket] Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`
      );

      setTimeout(() => {
        this.connect().catch((error) => {
          console.error("[WebSocket] Reconnect failed:", error);
        });
      }, this.reconnectDelay);
    } else {
      console.error("[WebSocket] Max reconnection attempts reached");
    }
  }

  /**
   * Notify all message handlers
   */
  private notifyMessageHandlers(message: ChatMessage): void {
    this.messageHandlers.forEach((handler) => {
      try {
        handler(message);
      } catch (error) {
        console.error("[WebSocket] Handler error:", error);
      }
    });
  }

  /**
   * Notify all connection handlers
   */
  private notifyConnectionStatus(
    status: "connected" | "disconnected" | "error"
  ): void {
    this.connectionHandlers.forEach((handler) => {
      try {
        handler(status);
      } catch (error) {
        console.error("[WebSocket] Connection handler error:", error);
      }
    });
  }
}

// Singleton instance
export const wsService = new WebSocketService('ws://localhost:8080/ws');

export default WebSocketService;
