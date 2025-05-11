export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  duration: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceBooking {
  id: string;
  userId: string;
  serviceId: string;
  service: Service;
  bookingDate: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
}
