"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  status: "active" | "inactive";
  createdAt: string;
}

export function RecentUsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from the API
    const fetchUsers = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data
        const mockUsers: User[] = [
          {
            id: "U001",
            name: "John Doe",
            email: "john.doe@example.com",
            role: "user",
            status: "active",
            createdAt: "2023-11-01T10:00:00Z",
          },
          {
            id: "U002",
            name: "Sarah Johnson",
            email: "sarah.j@example.com",
            role: "user",
            status: "active",
            createdAt: "2023-11-03T14:30:00Z",
          },
          {
            id: "U003",
            name: "Michael Brown",
            email: "michael.b@example.com",
            role: "user",
            status: "inactive",
            createdAt: "2023-11-05T09:15:00Z",
          },
          {
            id: "U004",
            name: "Emily Wilson",
            email: "emily.w@example.com",
            role: "admin",
            status: "active",
            createdAt: "2023-11-07T11:45:00Z",
          },
          {
            id: "U005",
            name: "David Lee",
            email: "david.l@example.com",
            role: "user",
            status: "active",
            createdAt: "2023-11-08T16:20:00Z",
          },
        ];

        setUsers(mockUsers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 border rounded-md shimmer"
          >
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-muted-foreground/20"></div>
              <div className="space-y-1">
                <div className="h-4 bg-muted-foreground/20 rounded w-24"></div>
                <div className="h-3 bg-muted-foreground/20 rounded w-32"></div>
              </div>
            </div>
            <div className="h-4 bg-muted-foreground/20 rounded w-16"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-4 border rounded-md"
          >
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-muted-foreground">
                  {user.email}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                variant={user.status === "active" ? "default" : "secondary"}
                className={
                  user.status === "active" ? "bg-green-500" : "bg-gray-500"
                }
              >
                {user.status}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Edit User</DropdownMenuItem>
                  <DropdownMenuItem>Change Role</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    Deactivate User
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Button variant="outline" size="sm">
          View All Users
        </Button>
      </div>
    </div>
  );
}
