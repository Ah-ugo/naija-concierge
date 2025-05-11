"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import type { ServiceBooking } from "@/types/service";
import type { PackageSubscription } from "@/types/package";
import { formatDate, formatCurrency } from "@/lib/utils";
import {
  Calendar,
  Package,
  Bookmark,
  Clock,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/providers/auth-provider";

export default function DashboardPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<ServiceBooking[]>([]);
  const [subscriptions, setSubscriptions] = useState<PackageSubscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real app, these would be API calls
        // const bookingsResponse = await api.get("/services/bookings");
        // const subscriptionsResponse = await api.get("/packages/subscriptions");

        // Mock data
        const mockBookings: ServiceBooking[] = [
          {
            id: "1",
            userId: user?.id || "",
            serviceId: "1",
            service: {
              id: "1",
              name: "Airport Pickup",
              description: "VIP airport pickup service",
              category: "Airport Pickup",
              price: 25000,
              image: "/placeholder.svg?height=200&width=300",
              duration: "3 hours",
              isAvailable: true,
              createdAt: "2023-01-01T00:00:00Z",
              updatedAt: "2023-01-01T00:00:00Z",
            },
            bookingDate: "2023-05-20T14:30:00Z",
            status: "confirmed",
            specialRequests: "Please meet at international arrivals",
            createdAt: "2023-05-15T10:00:00Z",
            updatedAt: "2023-05-15T10:00:00Z",
          },
          {
            id: "2",
            userId: user?.id || "",
            serviceId: "2",
            service: {
              id: "2",
              name: "Restaurant Booking",
              description: "Premium restaurant reservation",
              category: "Restaurant Booking",
              price: 5000,
              image: "/placeholder.svg?height=200&width=300",
              duration: "2 hours",
              isAvailable: true,
              createdAt: "2023-01-01T00:00:00Z",
              updatedAt: "2023-01-01T00:00:00Z",
            },
            bookingDate: "2023-05-22T19:00:00Z",
            status: "pending",
            specialRequests: "Table for 4, preferably by the window",
            createdAt: "2023-05-16T11:30:00Z",
            updatedAt: "2023-05-16T11:30:00Z",
          },
        ];

        const mockSubscriptions: PackageSubscription[] = [
          {
            id: "1",
            userId: user?.id || "",
            packageId: "2",
            package: {
              id: "2",
              name: "Standard",
              description: "Enhanced services for a memorable Lagos experience",
              price: 120000,
              duration: "5 days",
              features: [
                "Airport pickup and drop-off",
                "Premium hotel booking",
                "24/7 dedicated concierge",
                "Local SIM card with data",
                "Guided city tour (half-day)",
                "Restaurant reservations",
                "Transportation for 3 days",
              ],
              image: "/placeholder.svg?height=400&width=600",
              type: "Standard",
              isPopular: true,
              createdAt: "2023-01-01T00:00:00Z",
              updatedAt: "2023-01-01T00:00:00Z",
            },
            startDate: "2023-05-20T00:00:00Z",
            endDate: "2023-05-25T00:00:00Z",
            status: "active",
            createdAt: "2023-05-10T09:00:00Z",
            updatedAt: "2023-05-10T09:00:00Z",
          },
        ];

        setBookings(mockBookings);
        setSubscriptions(mockSubscriptions);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const activePackage = subscriptions.find((sub) => sub.status === "active");
  const upcomingBookings = bookings.filter(
    (booking) =>
      new Date(booking.bookingDate) > new Date() &&
      booking.status !== "cancelled"
  );

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <DashboardHeader
        heading="Dashboard"
        text={`Welcome back, ${user?.firstName || "User"}!`}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Package
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activePackage ? activePackage.package.name : "None"}
            </div>
            {activePackage && (
              <p className="text-xs text-muted-foreground mt-1">
                Expires: {formatDate(activePackage.endDate)}
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Bookings
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingBookings.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {upcomingBookings.length > 0
                ? `Next: ${formatDate(upcomingBookings[0].bookingDate)}`
                : "No upcoming bookings"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Document Status
            </CardTitle>
            <Bookmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Incomplete</div>
            <p className="text-xs text-muted-foreground mt-1">
              Upload your passport and visa
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Emergency Assistance
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Available</div>
            <p className="text-xs text-muted-foreground mt-1">
              24/7 emergency support
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="bookings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="bookings">Upcoming Bookings</TabsTrigger>
          <TabsTrigger value="package">Active Package</TabsTrigger>
        </TabsList>
        <TabsContent value="bookings" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {loading ? (
              Array(2)
                .fill(0)
                .map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-5 bg-muted rounded w-1/3 mb-2"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 bg-muted rounded mb-2"></div>
                      <div className="h-4 bg-muted rounded w-2/3"></div>
                    </CardContent>
                  </Card>
                ))
            ) : upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardHeader>
                    <CardTitle>{booking.service.name}</CardTitle>
                    <CardDescription>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                        }`}
                      >
                        {booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(booking.bookingDate)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4" />
                      <span>
                        {new Date(booking.bookingDate).toLocaleTimeString()}
                      </span>
                    </div>
                    {booking.specialRequests && (
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Special requests:</span>{" "}
                        {booking.specialRequests}
                      </p>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      asChild
                    >
                      <Link href={`/dashboard/bookings/${booking.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>No Upcoming Bookings</CardTitle>
                  <CardDescription>
                    You don't have any upcoming bookings at the moment.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <Link href="/services">Browse Services</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
          {upcomingBookings.length > 0 && (
            <Button variant="outline" asChild>
              <Link href="/dashboard/bookings">View All Bookings</Link>
            </Button>
          )}
        </TabsContent>
        <TabsContent value="package" className="space-y-4">
          {loading ? (
            <Card className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-muted rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </CardContent>
            </Card>
          ) : activePackage ? (
            <Card>
              <CardHeader>
                <CardTitle>{activePackage.package.name} Package</CardTitle>
                <CardDescription>
                  {activePackage.package.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium">Start Date</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(activePackage.startDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">End Date</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(activePackage.endDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Price</p>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(activePackage.package.price)}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Included Services:</p>
                  <ul className="space-y-1">
                    {activePackage.package.features.map((feature, index) => (
                      <li key={index} className="text-sm flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/packages">Manage Package</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/contact">Request Support</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Active Package</CardTitle>
                <CardDescription>
                  You don't have any active package subscription at the moment.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href="/packages">Browse Packages</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
