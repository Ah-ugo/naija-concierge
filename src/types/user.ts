export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "user" | "admin";
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}
