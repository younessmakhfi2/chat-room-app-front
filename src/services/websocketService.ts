import { ChatMessage, WebSocketMessage } from "../types/chat";

class WebSocketService {
  private ws: WebSocket | null = null;
  private url: string;
  private sessionId: string | null = null;
  private isConnecting: boolean = false;
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
    // Prevent multiple concurrent connection attempts
    if (this.isConnecting) {
      return Promise.resolve();
    }

    // Already connected, don't reconnect
    if (this.ws && this.isConnected()) {
      return Promise.resolve();
    }

    this.isConnecting = true;
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
          this.isConnecting = false;
          this.sessionId = this.generateSessionId();
          this.reconnectAttempts = 0;
          this.notifyConnectionStatus("connected");
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const data: WebSocketMessage = JSON.parse(event.data);
            console.log("[WebSocket] Message received:", {
              sessionId: this.sessionId,
              userId: data.payload.userId,
              from: data.payload.displayName,
              room: data.payload.roomId,
              type: data.payload.type,
              content: data.payload.content,
              timestamp: new Date(data.payload.timestamp).toLocaleTimeString(),
            });
            this.notifyMessageHandlers(data.payload);
          } catch (error) {
            console.error("[WebSocket] Failed to parse message:", error);
          }
        };

        this.ws.onerror = (error) => {
          this.isConnecting = false;
          this.notifyConnectionStatus("error");
          reject(error);
        };

        this.ws.onclose = () => {
          this.isConnecting = false;
          this.notifyConnectionStatus("disconnected");
          this.attemptReconnect();
        };
      } catch (error) {
        this.isConnecting = false;
        reject(error);
      }
    });
  }

  /**
   * Send a chat message
   */
  public sendMessage(message: ChatMessage): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
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
   * Generate a unique session ID
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Attempt to reconnect
   */
  private attemptReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;

      setTimeout(() => {
        this.connect().catch((error) => {
          console.error("[WebSocket] Reconnect failed:", error);
        });
      }, this.reconnectDelay);
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
        // Silently catch handler errors
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
        // Silently catch connection handler errors
      }
    });
  }
}

// Singleton instance
export const wsService = new WebSocketService("ws://192.168.3.17:8080/ws");

export default WebSocketService;
