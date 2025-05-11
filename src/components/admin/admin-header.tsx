import type React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface AdminHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
}

export function AdminHeader({ heading, text, children }: AdminHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="grid gap-1">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden" />
          <h1 className="font-bold text-3xl">{heading}</h1>
        </div>
        {text && <p className="text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  );
}
