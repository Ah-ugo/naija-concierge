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
import { AdminHeader } from "@/components/admin/admin-header";
import { BarChart, LineChart } from "@/components/admin/admin-charts";
import { RecentBookingsTable } from "@/components/admin/recent-bookings-table";
import { RecentUsersTable } from "@/components/admin/recent-users-table";
import {
  Users,
  Calendar,
  Package,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/providers/auth-provider";

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    activePackages: 0,
    userGrowth: 0,
    bookingGrowth: 0,
    revenueGrowth: 0,
    packageGrowth: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real app, these would be API calls
        // const statsResponse = await api.get("/admin/stats");

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data
        setStats({
          totalUsers: 256,
          totalBookings: 128,
          totalRevenue: 4250000,
          activePackages: 42,
          userGrowth: 12.5,
          bookingGrowth: 8.3,
          revenueGrowth: 15.7,
          packageGrowth: -2.4,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <AdminHeader
        heading="Dashboard"
        text={`Welcome back, ${user?.firstName || "Admin"}!`}
      />

      <motion.div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-2xl font-bold">
                  {loading ? "..." : stats.totalUsers}
                </div>
                <div
                  className={`ml-2 flex items-center text-xs ${
                    stats.userGrowth >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stats.userGrowth >= 0 ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(stats.userGrowth)}%
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Bookings
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-2xl font-bold">
                  {loading ? "..." : stats.totalBookings}
                </div>
                <div
                  className={`ml-2 flex items-center text-xs ${
                    stats.bookingGrowth >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stats.bookingGrowth >= 0 ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(stats.bookingGrowth)}%
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-2xl font-bold">
                  {loading ? "..." : formatCurrency(stats.totalRevenue)}
                </div>
                <div
                  className={`ml-2 flex items-center text-xs ${
                    stats.revenueGrowth >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stats.revenueGrowth >= 0 ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(stats.revenueGrowth)}%
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Packages
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-2xl font-bold">
                  {loading ? "..." : stats.activePackages}
                </div>
                <div
                  className={`ml-2 flex items-center text-xs ${
                    stats.packageGrowth >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stats.packageGrowth >= 0 ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(stats.packageGrowth)}%
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 hover-lift">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>
                  Monthly revenue for the current year
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <LineChart />
              </CardContent>
            </Card>
            <Card className="col-span-3 hover-lift">
              <CardHeader>
                <CardTitle>Bookings by Service</CardTitle>
                <CardDescription>
                  Distribution of bookings by service type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 hover-lift">
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>
                  Latest service bookings across all users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentBookingsTable />
              </CardContent>
            </Card>
            <Card className="col-span-3 hover-lift">
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>Latest user registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentUsersTable />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Analytics</CardTitle>
              <CardDescription>
                Detailed performance metrics and trends
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Analytics Dashboard
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Detailed analytics and reporting features are available in the
                  full version.
                </p>
                <Button className="mt-4">View Full Analytics</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>
                Generate and download custom reports
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Report Generator</h3>
                <p className="text-muted-foreground max-w-md">
                  Generate custom reports based on date ranges, services, and
                  other parameters.
                </p>
                <Button className="mt-4">Generate Report</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
