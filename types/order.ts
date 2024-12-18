export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface OrderData {
  shippingAddress: ShippingAddress;
  paymentMethod: string;
}

export interface OrderItem {
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  total: number;
  shippingAddress: ShippingAddress;
  paymentStatus: "pending" | "completed" | "failed";
  orderStatus: "processing" | "shipped" | "delivered" | "cancelled";
  paymentMethod: string;
  createdAt: string;
}
