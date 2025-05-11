export interface EmergencyAlert {
  id: string;
  userId: string;
  message: string;
  location?: string;
  status: "pending" | "resolved";
  createdAt: string;
  updatedAt: string;
}
