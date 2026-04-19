import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function GradientText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "bg-gradient-to-br from-white via-white to-accent-strong bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </span>
  );
}
