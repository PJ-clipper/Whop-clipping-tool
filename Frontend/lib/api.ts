const API_BASE_URL = 'https://whop-clipper-backend.onrender.com';

export interface ServerStatus {
  status: string;
  timestamp: string;
  version: string;
  endpoints: string[];
}

export interface VideoProcessingOptions {
  start_time?: number;
  end_time?: number;
}

export const api = {
  async getHello(): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch from backend');
    }
    return response.text();
  },

  async getStatus(): Promise<ServerStatus> {
    const response = await fetch(`${API_BASE_URL}/status`);
    if (!response.ok) {
      throw new Error('Failed to fetch server status');
    }
    return response.json();
  },

  async uploadVideo(file: File): Promise<{ filename: string; path: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload video');
    }

    return response.json();
  },

  async processVideo(filename: string, options?: VideoProcessingOptions): Promise<{ output_filename: string }> {
    const response = await fetch(`${API_BASE_URL}/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filename, ...options }),
    });

    if (!response.ok) {
      throw new Error('Failed to process video');
    }

    return response.json();
  }
}; 