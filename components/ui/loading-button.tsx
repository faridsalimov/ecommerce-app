"use client";

import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ButtonProps } from "@radix-ui/react-button";
import { cn } from "@/lib/utils";

interface LoadingButtonProps extends ButtonProps {
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
    <Button
      className={cn("relative", className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <LoadingSpinner size={16} className={cn("mr-2", spinnerClassName)} />
      )}
      {children}
    </Button>
  );
}
