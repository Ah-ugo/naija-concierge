export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  image: string;
  type: string;
  isPopular: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PackageSubscription {
  id: string;
  userId: string;
  packageId: string;
  package: Package;
  startDate: string;
  endDate: string;
  status: "active" | "expired" | "cancelled";
  createdAt: string;
  updatedAt: string;
}
