import { ethers } from 'ethers';

export interface BlockchainConfig {
  chainId: number;
  chainName: string;
  rpcUrl: string;
  blockExplorer: string;
  metamaskAccount: string;
}

export interface OrganData {
  donorId: string;
  organType: string;
  bloodType: string;
  medicalData: any;
  location: string;
}

export interface MatchingRequest {
  patientId: string;
  organType: string;
  bloodType: string;
  urgency: number;
  medicalData: any;
}

class BlockchainService {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.Signer | null = null;
  private config: BlockchainConfig;

  constructor() {
    this.config = {
      chainId: parseInt(import.meta.env.VITE_CHAIN_ID || '56'),
      chainName: import.meta.env.VITE_CHAIN_NAME || 'BNB Smart Chain',
      rpcUrl: import.meta.env.VITE_RPC_URL || 'https://bsc-dataseed1.binance.org/',
      blockExplorer: import.meta.env.VITE_BLOCK_EXPLORER || 'https://bscscan.com',
      metamaskAccount: import.meta.env.VITE_METAMASK_ACCOUNT || '0x9A45b64D0B57F8a5C23a277e94779baEcf0330ef'
    };
  }

  async connectWallet(): Promise<string | null> {
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask not installed');
      }

      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      this.provider = new ethers.BrowserProvider(window.ethereum);
      this.signer = await this.provider.getSigner();
      
      const address = await this.signer.getAddress();
      
      // Switch to BNB Smart Chain if needed
      await this.switchToBNBChain();
      
      console.log('Connected to wallet:', address);
      return address;
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  }

  async switchToBNBChain(): Promise<void> {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${this.config.chainId.toString(16)}` }],
      });
    } catch (switchError: any) {
      // Chain not added to MetaMask
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: `0x${this.config.chainId.toString(16)}`,
            chainName: this.config.chainName,
            rpcUrls: [this.config.rpcUrl],
            blockExplorerUrls: [this.config.blockExplorer],
            nativeCurrency: {
              name: 'BNB',
              symbol: 'BNB',
              decimals: 18,
            },
          }],
        });
      } else {
        throw switchError;
      }
    }
  }

  async getBalance(address?: string): Promise<string> {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }

    const targetAddress = address || this.config.metamaskAccount;
    const balance = await this.provider.getBalance(targetAddress);
    return ethers.formatEther(balance);
  }

  async registerOrgan(organData: OrganData): Promise<string> {
    try {
      if (!this.signer) {
        throw new Error('Wallet not connected');
      }

      // Simulate smart contract interaction
      const tx = await this.signer.sendTransaction({
        to: this.config.metamaskAccount,
        value: ethers.parseEther('0.001'), // Small fee for registration
        data: ethers.hexlify(ethers.toUtf8Bytes(JSON.stringify(organData)))
      });

      console.log('Organ registration transaction:', tx.hash);
      await tx.wait();
      
      return tx.hash;
    } catch (error) {
      console.error('Failed to register organ:', error);
      throw error;
    }
  }

  async submitMatchingRequest(request: MatchingRequest): Promise<string> {
    try {
      if (!this.signer) {
        throw new Error('Wallet not connected');
      }

      // Simulate smart contract interaction
      const tx = await this.signer.sendTransaction({
        to: this.config.metamaskAccount,
        value: ethers.parseEther('0.002'), // Fee for matching request
        data: ethers.hexlify(ethers.toUtf8Bytes(JSON.stringify(request)))
      });

      console.log('Matching request transaction:', tx.hash);
      await tx.wait();
      
      return tx.hash;
    } catch (error) {
      console.error('Failed to submit matching request:', error);
      throw error;
    }
  }

  async verifyUser(userId: string, verificationData: any): Promise<string> {
    try {
      if (!this.signer) {
        throw new Error('Wallet not connected');
      }

      const data = { userId, verificationData, timestamp: Date.now() };
      
      const tx = await this.signer.sendTransaction({
        to: this.config.metamaskAccount,
        value: ethers.parseEther('0.001'),
        data: ethers.hexlify(ethers.toUtf8Bytes(JSON.stringify(data)))
      });

      console.log('User verification transaction:', tx.hash);
      await tx.wait();
      
      return tx.hash;
    } catch (error) {
      console.error('Failed to verify user:', error);
      throw error;
    }
  }

  async getTransactionStatus(txHash: string): Promise<any> {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }

    const receipt = await this.provider.getTransactionReceipt(txHash);
    return receipt;
  }

  getConfig(): BlockchainConfig {
    return this.config;
  }

  isConnected(): boolean {
    return this.provider !== null && this.signer !== null;
  }
}

export const blockchainService = new BlockchainService();