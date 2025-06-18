"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useGetData } from "@/hooks/use-get-data";
import { usePatchData } from "@/hooks/use-patch-data";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const schema = z.object({
  message: z.string().min(1, "Pesan tidak boleh kosong"),
  rating: z.enum(["1", "2", "3", "4", "5"], {
    required_error: "Rating wajib dipilih",
  }),
});

type FormData = z.infer<typeof schema>;

type Props = {
  feedbackId: string;
};

const UbahUmpanBalik = ({ feedbackId }: Props) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      message: "",
      rating: "5",
    },
  });

  const { data: feedbackData } = useGetData({
    queryKey: ["feedback", feedbackId],
    dataProtected: `feedbacks/${feedbackId}`,
  });

  console.log(feedbackData);

  useEffect(() => {
    if (feedbackData?.data) {
      form.reset({
        message: feedbackData.data.message,
        rating: feedbackData.data.rating.toString() as FormData["rating"],
      });
    }
  }, [feedbackData, form]);

  const { mutate: updateFeedback } = usePatchData({
    queryKey: "feedback",
    dataProtected: `feedbacks/${feedbackId}`,
    successMessage: "Umpan balik berhasil diperbarui",
    backUrl: "/dashboard/umpan-balik",
  });

  const onSubmit = (values: FormData) => {
    updateFeedback({
      ...values,
      rating: parseInt(values.rating),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Ubah Umpan Balik</CardTitle>
            <CardDescription>
              Edit pesan dan rating umpan balik.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          onClick={() => field.onChange(i.toString())}
                          onMouseEnter={() => setHoveredRating(i)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className={cn(
                            "cursor-pointer transition-colors size-6",
                            (hoveredRating || parseInt(field.value)) >= i
                              ? "fill-yellow-400 stroke-yellow-400"
                              : "stroke-muted-foreground"
                          )}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pesan</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Masukkan pesan..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="bg-blue-500"
            >
              {form.formState.isSubmitting
                ? "Menyimpan..."
                : "Simpan Perubahan"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default UbahUmpanBalik;
