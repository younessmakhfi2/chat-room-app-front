export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`);
      const data = await response.json();
      return { success: response.ok, data, error: response.ok ? undefined : data.message };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return { success: response.ok, data, error: response.ok ? undefined : data.message };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }
}

export const apiClient = new ApiClient();
