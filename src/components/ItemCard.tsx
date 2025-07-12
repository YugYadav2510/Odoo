import React from 'react';
import { Link } from 'react-router-dom';
import { ClothingItem } from '../types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Coins } from 'lucide-react';

interface ItemCardProps {
  item: ClothingItem;
  showSwapButton?: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, showSwapButton = true }) => {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="aspect-square overflow-hidden">
        <img
          src={item.images[0]}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{item.title}</h3>
          <Button variant="ghost" size="sm" className="p-1 h-auto">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{item.description}</p>
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary">{item.size}</Badge>
          <Badge variant="outline">{item.condition}</Badge>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-emerald-600">
            <Coins className="h-4 w-4" />
            <span className="font-medium">{item.pointValue} pts</span>
          </div>
          <p className="text-sm text-gray-500">by {item.userName}</p>
        </div>
      </CardContent>
      {showSwapButton && (
        <CardFooter className="p-4 pt-0">
          <Link to={`/item/${item.id}`} className="w-full">
            <Button className="w-full">View Details</Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  );
};

export default ItemCard;