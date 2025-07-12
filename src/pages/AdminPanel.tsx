import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { mockItems } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, 
  Package, 
  ArrowUpDown, 
  Check, 
  X, 
  Eye,
  AlertTriangle,
  Settings,
  TrendingUp
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminPanel: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [pendingItems] = useState(mockItems.filter(item => item.approvalStatus === 'pending'));

  if (!user?.isAdmin) {
    navigate('/');
    return null;
  }

  const handleApproveItem = (itemId: string) => {
    toast({
      title: "Item approved",
      description: "The item has been approved and is now visible to users.",
    });
  };

  const handleRejectItem = (itemId: string) => {
    toast({
      title: "Item rejected",
      description: "The item has been rejected and the user has been notified.",
      variant: "destructive",
    });
  };

  const mockUsers = [
    { id: '1', name: 'Sarah Johnson', email: 'sarah@example.com', status: 'active', joinDate: '2024-01-15' },
    { id: '2', name: 'Mike Chen', email: 'mike@example.com', status: 'active', joinDate: '2024-01-12' },
    { id: '3', name: 'Emma Wilson', email: 'emma@example.com', status: 'suspended', joinDate: '2024-01-10' },
    { id: '4', name: 'John Doe', email: 'john@example.com', status: 'active', joinDate: '2024-01-08' }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
        <p className="text-gray-600">
          Manage users, moderate items, and oversee platform activities
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-blue-600">1,234</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              <TrendingUp className="inline h-4 w-4 mr-1" />
              +12% this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Listings</p>
                <p className="text-3xl font-bold text-emerald-600">567</p>
              </div>
              <Package className="h-8 w-8 text-emerald-600" />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              <AlertTriangle className="inline h-4 w-4 mr-1" />
              {pendingItems.length} pending approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Swaps</p>
                <p className="text-3xl font-bold text-amber-600">890</p>
              </div>
              <ArrowUpDown className="h-8 w-8 text-amber-600" />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              <TrendingUp className="inline h-4 w-4 mr-1" />
              +8% this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Reports</p>
                <p className="text-3xl font-bold text-red-600">12</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              5 unresolved
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Admin Tabs */}
      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">Manage Users</TabsTrigger>
          <TabsTrigger value="items">Manage Items</TabsTrigger>
          <TabsTrigger value="swaps">Manage Swaps</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{user.name}</h4>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500">Joined {user.joinDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                        {user.status}
                      </Badge>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Items Tab */}
        <TabsContent value="items">
          <Card>
            <CardHeader>
              <CardTitle>Item Moderation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingItems.length > 0 ? (
                  pendingItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm text-gray-600">{item.description.slice(0, 100)}...</p>
                          <p className="text-xs text-gray-500">by {item.userName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{item.category}</Badge>
                        <Badge variant="secondary">{item.pointValue} pts</Badge>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleApproveItem(item.id)}
                          >
                            <Check className="h-4 w-4 text-green-600" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleRejectItem(item.id)}
                          >
                            <X className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-medium text-gray-900 mb-2">No pending items</h3>
                    <p className="text-gray-600">All items have been reviewed.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Swaps Tab */}
        <TabsContent value="swaps">
          <Card>
            <CardHeader>
              <CardTitle>Swap Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <ArrowUpDown className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">Swap management coming soon</h3>
                <p className="text-gray-600">
                  This section will allow you to monitor and resolve swap disputes.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Platform Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">Settings panel coming soon</h3>
                <p className="text-gray-600">
                  Configure platform rules, point values, and other settings.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;