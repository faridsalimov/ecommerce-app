"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { cn } from "@/lib/utils";

interface LoadingButtonProps extends ButtonProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
  spinnerClassName?: string;
}

export function LoadingButton({
  loading = false,
  children,
  className,
  spinnerClassName,
  disabled,
  ...props
}: LoadingButtonProps) {
  return (
    <Button className={cn("relative", className)} disabled={disabled || loading} {...props}>
      {loading && <LoadingSpinner size={16} className={cn("mr-2", spinnerClassName)} />}
      {children}
    </Button>
  );
}
