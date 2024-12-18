"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loading-button";
import { useState } from "react";
import { toast } from "sonner";

const addressSchema = z.object({
  title: z.string().min(1, "Başlıq tələb olunur"),
  address: z.string().min(1, "Ünvan tələb olunur"),
  city: z.string().min(1, "Şəhər tələb olunur"),
  zipCode: z.string().min(1, "Poçt kodu tələb olunur"),
});

type AddressFormData = z.infer<typeof addressSchema>;

interface AddressFormProps {
  onSubmit: () => void;
  initialData?: AddressFormData;
}

export default function AddressForm({
  onSubmit,
  initialData,
}: AddressFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: initialData || {
      title: "",
      address: "",
      city: "",
      zipCode: "",
    },
  });

  const handleSubmit = async (data: AddressFormData) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Ünvan uğurla əlavə edildi");
      onSubmit();
    } catch (error) {
      toast.error("Xəta baş verdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Başlıq</FormLabel>
              <FormControl>
                <Input placeholder="Məs: Ev, İş və s." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ünvan</FormLabel>
              <FormControl>
                <Input placeholder="Küçə ünvanı" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Şəhər</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Poçt Kodu</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onSubmit}>
            Ləğv Et
          </Button>
          <LoadingButton type="submit" loading={loading}>
            Yadda Saxla
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
