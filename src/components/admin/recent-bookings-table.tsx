"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Eye, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Booking {
  id: string;
  customerName: string;
  serviceName: string;
  date: string;
  amount: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

export function RecentBookingsTable() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from the API
    const fetchBookings = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data
        const mockBookings: Booking[] = [
          {
            id: "B001",
            customerName: "John Doe",
            serviceName: "VIP Airport Pickup",
            date: "2023-11-10T14:30:00Z",
            amount: 35000,
            status: "confirmed",
          },
          {
            id: "B002",
            customerName: "Sarah Johnson",
            serviceName: "Lagos City Tour",
            date: "2023-11-12T09:00:00Z",
            amount: 45000,
            status: "pending",
          },
          {
            id: "B003",
            customerName: "Michael Brown",
            serviceName: "Fine Dining Reservation",
            date: "2023-11-08T19:00:00Z",
            amount: 10000,
            status: "completed",
          },
          {
            id: "B004",
            customerName: "Emily Wilson",
            serviceName: "Business Meeting Setup",
            date: "2023-11-15T10:00:00Z",
            amount: 75000,
            status: "pending",
          },
          {
            id: "B005",
            customerName: "David Lee",
            serviceName: "Daily Transportation",
            date: "2023-11-07T08:00:00Z",
            amount: 50000,
            status: "cancelled",
          },
        ];

        setBookings(mockBookings);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100";
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 border rounded-md shimmer"
          >
            <div className="h-4 bg-muted-foreground/20 rounded w-1/4"></div>
            <div className="h-4 bg-muted-foreground/20 rounded w-1/4"></div>
            <div className="h-4 bg-muted-foreground/20 rounded w-1/6"></div>
            <div className="h-4 bg-muted-foreground/20 rounded w-1/6"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="grid grid-cols-5 p-4 text-sm font-medium">
          <div>ID</div>
          <div>Customer</div>
          <div>Service</div>
          <div>Amount</div>
          <div>Status</div>
        </div>
        <div className="divide-y">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="grid grid-cols-5 p-4 text-sm items-center"
            >
              <div className="font-medium">{booking.id}</div>
              <div>{booking.customerName}</div>
              <div>{booking.serviceName}</div>
              <div>{formatCurrency(booking.amount)}</div>
              <div className="flex items-center justify-between">
                <Badge className={`${getStatusColor(booking.status)}`}>
                  {booking.status.charAt(0).toUpperCase() +
                    booking.status.slice(1)}
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
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Edit Booking</DropdownMenuItem>
                    <DropdownMenuItem>Update Status</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Cancel Booking
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <Button variant="outline" size="sm">
          View All Bookings
        </Button>
      </div>
    </div>
  );
}
