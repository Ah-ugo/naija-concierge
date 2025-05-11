"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { AlertTriangle, Phone, MapPin, Shield, Loader2 } from "lucide-react";
import { useAuth } from "@/providers/auth-provider";

export default function EmergencyPage() {
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleEmergencyAlert = async () => {
    if (!message) {
      toast({
        title: "Message required",
        description: "Please provide details about your emergency situation.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // In a real app, this would call the API
      // await api.post("/emergency/trigger", {
      //   message,
      //   location,
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Emergency alert sent",
        description: "Our team has been notified and will contact you shortly.",
      });

      setMessage("");
      setLocation("");
    } catch (error) {
      toast({
        title: "Failed to send alert",
        description:
          "There was an error sending your emergency alert. Please try calling the emergency number directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <DashboardHeader
        heading="Emergency Assistance"
        text="Get immediate help in case of emergency"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-red-200 dark:border-red-900">
          <CardHeader className="bg-red-50 dark:bg-red-950/50 rounded-t-lg">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
              <CardTitle className="text-red-600 dark:text-red-400">
                Emergency Alert
              </CardTitle>
            </div>
            <CardDescription>
              Use this feature only in case of genuine emergency. Our team will
              contact you immediately.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Describe your emergency situation
              </label>
              <Textarea
                id="message"
                placeholder="Please provide details about your emergency..."
                value={message}
                onChange={(e: any) => setMessage(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">
                Your current location (optional)
              </label>
              <Textarea
                id="location"
                placeholder="Hotel name, address, or landmark near you..."
                value={location}
                onChange={(e: any) => setLocation(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              onClick={handleEmergencyAlert}
              disabled={loading || !message}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending Alert...
                </>
              ) : (
                <>
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Send Emergency Alert
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              By sending an alert, you confirm this is a genuine emergency
              situation.
            </p>
          </CardFooter>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-primary" />
                <CardTitle>Emergency Contacts</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Naija Concierge Emergency Line</h3>
                <p className="text-lg font-bold">+234 800 123 4567</p>
                <p className="text-sm text-muted-foreground">Available 24/7</p>
              </div>
              <div>
                <h3 className="font-medium">Lagos Emergency Services</h3>
                <p className="text-lg font-bold">112</p>
                <p className="text-sm text-muted-foreground">
                  Police, Fire, Ambulance
                </p>
              </div>
              <div>
                <h3 className="font-medium">Your Dedicated Concierge</h3>
                <p className="text-lg font-bold">+234 801 234 5678</p>
                <p className="text-sm text-muted-foreground">
                  Available 8AM - 10PM
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle>Safety Tips</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc pl-5">
                <li>Keep your passport and important documents secure</li>
                <li>Save emergency contacts on your phone</li>
                <li>Share your itinerary with family or friends</li>
                <li>Use reputable transportation services</li>
                <li>
                  Be cautious when using ATMs or carrying large sums of money
                </li>
                <li>Stay in well-lit and populated areas at night</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-primary" />
                <CardTitle>Important Locations</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h3 className="font-medium">Nearest Hospital</h3>
                <p className="text-sm">Lagoon Hospital, Victoria Island</p>
              </div>
              <div>
                <h3 className="font-medium">Police Station</h3>
                <p className="text-sm">Victoria Island Police Station</p>
              </div>
              <div>
                <h3 className="font-medium">Embassy/Consulate</h3>
                <p className="text-sm">
                  Contact us for your country's embassy details
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
