import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, Clock, Shield, Activity, Database } from 'lucide-react';
import BlockchainStatus from './BlockchainStatus';
import { apiService } from '@/services/apiService';
import { websocketService } from '@/services/websocketService';
import { blockchainService } from '@/services/blockchainService';

interface DashboardStats {
  totalOrgans: number;
  activeMatches: number;
  pendingVerifications: number;
  successfulTransplants: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrgans: 0,
    activeMatches: 0,
    pendingVerifications: 0,
    successfulTransplants: 0
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
    setupWebSocketListeners();
    
    // Cleanup function
    return () => {
      // Clean up any subscriptions or listeners
    };
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Load data from API
      const [organs, matchingQueue, verifications] = await Promise.all([
        apiService.getOrgans(),
        apiService.getMatchingQueue(),
        apiService.getVerificationRequests()
      ]);

      setStats({
        totalOrgans: organs.length,
        activeMatches: matchingQueue.length,
        pendingVerifications: verifications.filter((v: any) => v.status === 'pending').length,
        successfulTransplants: Math.floor(Math.random() * 50) + 100 // Mock data
      });

      // Set recent activity
      const activity = [
        ...organs.slice(-3).map((organ: any) => ({
          type: 'organ_registered',
          message: `New ${organ.organType} registered`,
          timestamp: organ.timestamp,
          icon: Heart
        })),
        ...matchingQueue.slice(-2).map((match: any) => ({
          type: 'match_request',
          message: `Matching request for ${match.organType}`,
          timestamp: match.timestamp,
          icon: Users
        }))
      ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

      setRecentActivity(activity);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setupWebSocketListeners = () => {
    websocketService.on('organRegistered', (organ: any) => {
      setStats(prev => ({ ...prev, totalOrgans: prev.totalOrgans + 1 }));
      setRecentActivity(prev => [{
        type: 'organ_registered',
        message: `New ${organ.organType} registered`,
        timestamp: organ.timestamp,
        icon: Heart
      }, ...prev.slice(0, 4)]);
    });

    websocketService.on('matchingRequest', (request: any) => {
      setStats(prev => ({ ...prev, activeMatches: prev.activeMatches + 1 }));
      setRecentActivity(prev => [{
        type: 'match_request',
        message: `Matching request for ${request.organType}`,
        timestamp: request.timestamp,
        icon: Users
      }, ...prev.slice(0, 4)]);
    });

    websocketService.on('verificationRequest', () => {
      setStats(prev => ({ ...prev, pendingVerifications: prev.pendingVerifications + 1 }));
    });
  };

  const testBlockchainTransaction = async () => {
    try {
      const connected = await blockchainService.connectWallet();
      if (connected) {
        const txHash = await blockchainService.registerOrgan({
          donorId: 'test-donor-' + Date.now(),
          organType: 'kidney',
          bloodType: 'O+',
          medicalData: { healthy: true },
          location: 'Test Hospital'
        });
        console.log('Test transaction successful:', txHash);
      }
    } catch (error) {
      console.error('Test transaction failed:', error);
    }
  };

  const statCards = [
    {
      title: 'Total Organs',
      value: stats.totalOrgans,
      icon: Heart,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10'
    },
    {
      title: 'Active Matches',
      value: stats.activeMatches,
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Pending Verifications',
      value: stats.pendingVerifications,
      icon: Shield,
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Successful Transplants',
      value: stats.successfulTransplants,
      icon: Activity,
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-20 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">LifeChain Dashboard</h1>
            <p className="text-muted-foreground">Blockchain-powered organ donation network</p>
          </div>
          <Button onClick={testBlockchainTransaction} variant="medical">
            <Database className="mr-2 h-4 w-4" />
            Test Blockchain
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="shadow-card-medical hover:shadow-medical transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <IconComponent className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blockchain Status */}
          <div className="lg:col-span-1">
            <BlockchainStatus />
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="shadow-card-medical">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.length > 0 ? (
                    recentActivity.map((activity, index) => {
                      const IconComponent = activity.icon;
                      return (
                        <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                          <div className="p-2 rounded-full bg-primary/10">
                            <IconComponent className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{activity.message}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(activity.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {activity.type.replace('_', ' ')}
                          </Badge>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No recent activity</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;