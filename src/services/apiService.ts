import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

class ApiService {
  private api;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => {
        console.log(`API Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error('API Response Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  // Health check
  async checkHealth() {
    const response = await this.api.get('/health');
    return response.data;
  }

  // Organ Registry
  async getOrgans() {
    const response = await this.api.get('/organs');
    return response.data;
  }

  async registerOrgan(organData: any) {
    const response = await this.api.post('/organs/register', organData);
    return response.data;
  }

  // Matching System
  async submitMatchingRequest(requestData: any) {
    const response = await this.api.post('/matching/request', requestData);
    return response.data;
  }

  async getMatchingQueue() {
    const response = await this.api.get('/matching/queue');
    return response.data;
  }

  // Verification
  async submitVerification(verificationData: any) {
    const response = await this.api.post('/verification/submit', verificationData);
    return response.data;
  }

  async getVerificationRequests() {
    const response = await this.api.get('/verification/requests');
    return response.data;
  }

  async approveVerification(id: string, verifierId: string) {
    const response = await this.api.put(`/verification/${id}/approve`, { verifierId });
    return response.data;
  }

  // Blockchain
  async getBlockchainAccount() {
    const response = await this.api.get('/blockchain/account');
    return response.data;
  }

  async submitBlockchainTransaction(method: string, data: any) {
    const response = await this.api.post('/blockchain/transaction', { method, data });
    return response.data;
  }
}

export const apiService = new ApiService();