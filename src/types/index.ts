export interface ClothingItem {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  size: string;
  condition: 'New' | 'Like New' | 'Good' | 'Fair';
  tags: string[];
  images: string[];
  userId: string;
  userName: string;
  pointValue: number;
  isAvailable: boolean;
  createdAt: string;
  approvalStatus: 'pending' | 'approved' | 'rejected';
}

export interface SwapRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  itemId: string;
  itemTitle: string;
  offeredItemId: string;
  offeredItemTitle: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  createdAt: string;
}