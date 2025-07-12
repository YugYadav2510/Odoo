import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockItems } from '../data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  ArrowLeft, 
  Coins, 
  ArrowUpDown, 
  Heart, 
  Share2, 
  User,
  Calendar,
  Package,
  Shield
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isSwapDialogOpen, setIsSwapDialogOpen] = useState(false);

  const item = mockItems.find(item => item.id === id);

  if (!item) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Item not found</h1>
        <Button onClick={() => navigate('/browse')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Browse
        </Button>
      </div>
    );
  }

  const handleSwapRequest = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setIsSwapDialogOpen(true);
  };

  const handleRedeemWithPoints = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (user.points < item.pointValue) {
      toast({
        title: "Insufficient points",
        description: `You need ${item.pointValue - user.points} more points to redeem this item.`,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Redemption successful!",
      description: `You've redeemed ${item.title} for ${item.pointValue} points.`,
    });
  };

  const handleAddToWishlist = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    toast({
      title: "Added to wishlist",
      description: "Item has been added to your wishlist.",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={() => navigate('/browse')}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Browse
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={item.images[selectedImage] || item.images[0]}
              alt={item.title}
              className="h-full w-full object-cover"
            />
          </div>
          {item.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {item.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-md border-2 ${
                    selectedImage === index ? 'border-emerald-600' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${item.title} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Item Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary">{item.category}</Badge>
                  <Badge variant="outline">{item.type}</Badge>
                  <Badge variant="outline">{item.size}</Badge>
                  <Badge 
                    variant={item.condition === 'New' ? 'default' : 'secondary'}
                  >
                    {item.condition}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Listed {new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Package className="h-4 w-4" />
                    <span>{item.isAvailable ? 'Available' : 'Not Available'}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleAddToWishlist}>
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-3 text-2xl font-bold text-emerald-600 mb-4">
              <Coins className="h-6 w-6" />
              <span>{item.pointValue} points</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">{item.description}</p>
          </div>

          {/* Tags */}
          {item.tags.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Owner Info */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    {item.userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-medium">{item.userName}</h4>
                  <p className="text-sm text-gray-600">Member since 2024</p>
                </div>
                <div className="flex items-center gap-1 text-emerald-600">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm font-medium">Verified</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          {item.isAvailable && (
            <div className="space-y-3">
              <Dialog open={isSwapDialogOpen} onOpenChange={setIsSwapDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full" size="lg" onClick={handleSwapRequest}>
                    <ArrowUpDown className="mr-2 h-5 w-5" />
                    Request Swap
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Request a Swap</DialogTitle>
                    <DialogDescription>
                      Choose an item from your collection to offer in exchange for "{item.title}".
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-center text-gray-600 py-8">
                      This feature would show your available items for swapping.
                    </p>
                    <div className="flex gap-2">
                      <Button className="flex-1" onClick={() => setIsSwapDialogOpen(false)}>
                        Send Swap Request
                      </Button>
                      <Button variant="outline" onClick={() => setIsSwapDialogOpen(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button 
                variant="outline" 
                className="w-full" 
                size="lg" 
                onClick={handleRedeemWithPoints}
                disabled={user ? user.points < item.pointValue : false}
              >
                <Coins className="mr-2 h-5 w-5" />
                Redeem with Points
                {user && user.points < item.pointValue && (
                  <span className="ml-2 text-red-600">
                    (Need {item.pointValue - user.points} more)
                  </span>
                )}
              </Button>

              {!user && (
                <p className="text-center text-sm text-gray-600">
                  <button 
                    onClick={() => navigate('/login')} 
                    className="text-emerald-600 hover:underline"
                  >
                    Sign in
                  </button>
                  {' '}to swap or redeem this item
                </p>
              )}
            </div>
          )}

          {!item.isAvailable && (
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-gray-600 font-medium">This item is no longer available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;