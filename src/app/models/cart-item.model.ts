export interface CartItem {

  productId: number;
  productName: string;
  quantity: number;
  price: number;
  totalPrice: number;
  productImageUrl: string;
  animate?: boolean;
  availableQuantity: number;

}