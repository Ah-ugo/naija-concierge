"use client";

import type React from "react";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { FileUp, Trash2, Eye, Loader2 } from "lucide-react";
import Image from "next/image";

interface DocumentFile {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadDate: string;
}

export default function DocumentsPage() {
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [visaFile, setVisaFile] = useState<File | null>(null);
  const [passportPreview, setPassportPreview] = useState<string | null>(null);
  const [visaPreview, setVisaPreview] = useState<string | null>(null);
  const [uploadingPassport, setUploadingPassport] = useState(false);
  const [uploadingVisa, setUploadingVisa] = useState(false);
  const [documents, setDocuments] = useState<DocumentFile[]>([]);
  const { toast } = useToast();

  const handlePassportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPassportFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setPassportPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVisaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setVisaFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setVisaPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadPassport = async () => {
    if (!passportFile) return;

    setUploadingPassport(true);

    try {
      // In a real app, this would upload to Cloudinary via API
      // const formData = new FormData();
      // formData.append("file", passportFile);
      // formData.append("documentType", "passport");
      // await api.post("/users/documents", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newDocument: DocumentFile = {
        id: Date.now().toString(),
        name: passportFile.name,
        type: "passport",
        url: passportPreview || "",
        uploadDate: new Date().toISOString(),
      };

      setDocuments((prev) => [...prev, newDocument]);

      toast({
        title: "Passport uploaded",
        description: "Your passport has been successfully uploaded.",
      });

      // Clear form
      setPassportFile(null);
      setPassportPreview(null);
    } catch (error) {
      toast({
        title: "Upload failed",
        description:
          "There was an error uploading your passport. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploadingPassport(false);
    }
  };

  const uploadVisa = async () => {
    if (!visaFile) return;

    setUploadingVisa(true);

    try {
      // In a real app, this would upload to Cloudinary via API
      // const formData = new FormData();
      // formData.append("file", visaFile);
      // formData.append("documentType", "visa");
      // await api.post("/users/documents", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newDocument: DocumentFile = {
        id: Date.now().toString(),
        name: visaFile.name,
        type: "visa",
        url: visaPreview || "",
        uploadDate: new Date().toISOString(),
      };

      setDocuments((prev) => [...prev, newDocument]);

      toast({
        title: "Visa uploaded",
        description: "Your visa has been successfully uploaded.",
      });

      // Clear form
      setVisaFile(null);
      setVisaPreview(null);
    } catch (error) {
      toast({
        title: "Upload failed",
        description:
          "There was an error uploading your visa. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploadingVisa(false);
    }
  };

  const deleteDocument = (id: string) => {
    // In a real app, this would call the API to delete the document
    // await api.delete(`/users/documents/${id}`);

    setDocuments((prev) => prev.filter((doc) => doc.id !== id));

    toast({
      title: "Document deleted",
      description: "The document has been successfully deleted.",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <DashboardHeader
        heading="Travel Documents"
        text="Upload and manage your passport and visa documents"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Passport</CardTitle>
            <CardDescription>
              Upload a clear copy of your passport bio page
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="passport">Upload Passport</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="passport"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handlePassportChange}
                    className="flex-1"
                  />
                  <Button
                    onClick={uploadPassport}
                    disabled={!passportFile || uploadingPassport}
                    size="sm"
                  >
                    {uploadingPassport ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <FileUp className="mr-2 h-4 w-4" />
                        Upload
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {passportPreview && (
                <div className="relative aspect-[4/3] w-full max-w-sm overflow-hidden rounded-md border">
                  <Image
                    src={passportPreview || "/placeholder.svg"}
                    alt="Passport preview"
                    fill
                    className="object-contain"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={() => {
                      setPassportFile(null);
                      setPassportPreview(null);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Visa</CardTitle>
            <CardDescription>
              Upload a clear copy of your Nigerian visa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="visa">Upload Visa</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="visa"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleVisaChange}
                    className="flex-1"
                  />
                  <Button
                    onClick={uploadVisa}
                    disabled={!visaFile || uploadingVisa}
                    size="sm"
                  >
                    {uploadingVisa ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <FileUp className="mr-2 h-4 w-4" />
                        Upload
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {visaPreview && (
                <div className="relative aspect-[4/3] w-full max-w-sm overflow-hidden rounded-md border">
                  <Image
                    src={visaPreview || "/placeholder.svg"}
                    alt="Visa preview"
                    fill
                    className="object-contain"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={() => {
                      setVisaFile(null);
                      setVisaPreview(null);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Uploaded Documents</CardTitle>
          <CardDescription>
            View and manage your uploaded travel documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          {documents.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No documents uploaded yet</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 border rounded-md"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-muted rounded-md p-2">
                      <FileUp className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {doc.type.charAt(0).toUpperCase() + doc.type.slice(1)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Uploaded on {formatDate(doc.uploadDate)}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" asChild>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteDocument(doc.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Your documents are securely stored and only accessible by authorized
            personnel.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
