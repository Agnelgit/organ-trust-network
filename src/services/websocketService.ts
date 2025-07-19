import { io, Socket } from 'socket.io-client';

const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL || 'ws://localhost:3001';

class WebSocketService {
  private socket: Socket | null = null;
  private listeners: Map<string, Function[]> = new Map();

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.socket = io(WEBSOCKET_URL, {
          transports: ['websocket', 'polling'],
          timeout: 5000,
        });

        this.socket.on('connect', () => {
          console.log('WebSocket connected:', this.socket?.id);
          resolve();
        });

        this.socket.on('disconnect', () => {
          console.log('WebSocket disconnected');
        });

        this.socket.on('connect_error', (error) => {
          console.error('WebSocket connection error:', error);
          reject(error);
        });

        // Set up event listeners
        this.setupEventListeners();

      } catch (error) {
        console.error('Failed to initialize WebSocket:', error);
        reject(error);
      }
    });
  }

  private setupEventListeners() {
    if (!this.socket) return;

    // Real-time organ registration updates
    this.socket.on('organRegistered', (organ) => {
      console.log('New organ registered:', organ);
      this.emit('organRegistered', organ);
    });

    // Real-time matching updates
    this.socket.on('matchingRequest', (request) => {
      console.log('New matching request:', request);
      this.emit('matchingRequest', request);
    });

    // Real-time verification updates
    this.socket.on('verificationRequest', (verification) => {
      console.log('New verification request:', verification);
      this.emit('verificationRequest', verification);
    });

    this.socket.on('verificationApproved', (verification) => {
      console.log('Verification approved:', verification);
      this.emit('verificationApproved', verification);
    });

    // Initial data
    this.socket.on('initialData', (data) => {
      console.log('Received initial data:', data);
      this.emit('initialData', data);
    });
  }

  joinRoom(room: string) {
    if (this.socket) {
      this.socket.emit('joinRoom', room);
    }
  }

  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)?.push(callback);
  }

  off(event: string, callback: Function) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      const index = eventListeners.indexOf(callback);
      if (index > -1) {
        eventListeners.splice(index, 1);
      }
    }
  }

  private emit(event: string, data: any) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(callback => callback(data));
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.listeners.clear();
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }
}

export const websocketService = new WebSocketService();