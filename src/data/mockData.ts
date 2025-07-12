import { ClothingItem, SwapRequest } from '../types';

export const mockItems: ClothingItem[] = [
  {
    id: '1',
    title: 'Vintage Denim Jacket',
    description: 'Classic blue denim jacket in excellent condition. Perfect for layering.',
    category: 'Outerwear',
    type: 'Jacket',
    size: 'M',
    condition: 'Like New',
    tags: ['vintage', 'denim', 'casual'],
    images: ['https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg'],
    userId: '2',
    userName: 'Sarah Johnson',
    pointValue: 75,
    isAvailable: true,
    createdAt: '2024-01-15',
    approvalStatus: 'approved'
  },
  {
    id: '2',
    title: 'Floral Summer Dress',
    description: 'Beautiful flowing dress perfect for summer occasions.',
    category: 'Dresses',
    type: 'Summer Dress',
    size: 'S',
    condition: 'Good',
    tags: ['floral', 'summer', 'casual'],
    images: ['https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg'],
    userId: '3',
    userName: 'Emma Wilson',
    pointValue: 60,
    isAvailable: true,
    createdAt: '2024-01-12',
    approvalStatus: 'approved'
  },
  {
    id: '3',
    title: 'Business Blazer',
    description: 'Professional black blazer, perfect for office wear.',
    category: 'Outerwear',
    type: 'Blazer',
    size: 'L',
    condition: 'New',
    tags: ['business', 'formal', 'professional'],
    images: ['https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg'],
    userId: '4',
    userName: 'Michael Chen',
    pointValue: 90,
    isAvailable: true,
    createdAt: '2024-01-10',
    approvalStatus: 'approved'
  },
  {
    id: '4',
    title: 'Cozy Knit Sweater',
    description: 'Warm and comfortable wool sweater for cold days.',
    category: 'Tops',
    type: 'Sweater',
    size: 'M',
    condition: 'Like New',
    tags: ['knit', 'wool', 'winter'],
    images: ['https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg'],
    userId: '5',
    userName: 'Lisa Anderson',
    pointValue: 65,
    isAvailable: true,
    createdAt: '2024-01-08',
    approvalStatus: 'approved'
  }
];

export const mockSwapRequests: SwapRequest[] = [
  {
    id: '1',
    requesterId: '2',
    requesterName: 'Sarah Johnson',
    itemId: '1',
    itemTitle: 'Vintage Denim Jacket',
    offeredItemId: '2',
    offeredItemTitle: 'Floral Summer Dress',
    status: 'pending',
    createdAt: '2024-01-16'
  }
];