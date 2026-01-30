import { type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface SettingSectionProps {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  className?: string;
}

export function SettingSection({ icon: Icon, title, children, className = "" }: SettingSectionProps) {
  return (
    <div className={`space-y-2 p-3 rounded-xl bg-muted/30 border border-border/50 ${className}`}>
      <div className="flex items-center gap-2 text-sm font-medium">
        <Icon className="w-4 h-4 text-primary" />
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
}
