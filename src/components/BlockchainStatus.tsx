import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wallet, Link, AlertCircle, CheckCircle } from 'lucide-react';
import { blockchainService } from '@/services/blockchainService';
import { apiService } from '@/services/apiService';
import { websocketService } from '@/services/websocketService';

const BlockchainStatus = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('0');
  const [serverStatus, setServerStatus] = useState<'connected' | 'disconnected' | 'connecting'>('disconnected');
  const [wsStatus, setWsStatus] = useState<'connected' | 'disconnected' | 'connecting'>('disconnected');

  useEffect(() => {
    checkServerConnection();
    connectWebSocket();
  }, []);

  const checkServerConnection = async () => {
    try {
      setServerStatus('connecting');
      const health = await apiService.checkHealth();
      console.log('Server health:', health);
      setServerStatus('connected');
    } catch (error) {
      console.error('Server connection failed:', error);
      setServerStatus('disconnected');
    }
  };

  const connectWebSocket = async () => {
    try {
      setWsStatus('connecting');
      await websocketService.connect();
      setWsStatus('connected');
    } catch (error) {
      console.error('WebSocket connection failed:', error);
      setWsStatus('disconnected');
    }
  };

  const connectWallet = async () => {
    try {
      const address = await blockchainService.connectWallet();
      if (address) {
        setAccount(address);
        setIsConnected(true);
        
        // Get balance
        const bal = await blockchainService.getBalance(address);
        setBalance(bal);
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'connecting':
        return <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />;
      default:
        return <AlertCircle className="h-4 w-4 text-destructive" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge variant="default" className="bg-success">Connected</Badge>;
      case 'connecting':
        return <Badge variant="outline">Connecting...</Badge>;
      default:
        return <Badge variant="destructive">Disconnected</Badge>;
    }
  };

  return (
    <Card className="p-6 bg-gradient-card border-primary/20">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">System Status</h3>
          <div className="flex items-center space-x-2">
            <Link className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">LifeChain Network</span>
          </div>
        </div>

        {/* Server Status */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getStatusIcon(serverStatus)}
              <span className="text-sm font-medium">Backend Server</span>
            </div>
            {getStatusBadge(serverStatus)}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getStatusIcon(wsStatus)}
              <span className="text-sm font-medium">WebSocket</span>
            </div>
            {getStatusBadge(wsStatus)}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getStatusIcon(isConnected ? 'connected' : 'disconnected')}
              <span className="text-sm font-medium">Blockchain</span>
            </div>
            {getStatusBadge(isConnected ? 'connected' : 'disconnected')}
          </div>
        </div>

        {/* Wallet Connection */}
        <div className="border-t pt-4">
          {!isConnected ? (
            <Button 
              onClick={connectWallet} 
              className="w-full"
              variant="medical"
            >
              <Wallet className="mr-2 h-4 w-4" />
              Connect MetaMask Wallet
            </Button>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Connected Account:</span>
                <Badge variant="outline" className="font-mono text-xs">
                  {account?.slice(0, 6)}...{account?.slice(-4)}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Balance:</span>
                <span className="text-sm font-mono">{parseFloat(balance).toFixed(4)} BNB</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Network:</span>
                <Badge variant="default">BNB Smart Chain</Badge>
              </div>
            </div>
          )}
        </div>

        {/* Connection Info */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Backend: {serverStatus === 'connected' ? 'localhost:3001' : 'Offline'}</p>
          <p>• WebSocket: {wsStatus === 'connected' ? 'Real-time updates active' : 'Offline'}</p>
          <p>• Target Account: 0x9A45...0ef</p>
        </div>
      </div>
    </Card>
  );
};

export default BlockchainStatus;