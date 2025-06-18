"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { usePostData } from "@/hooks/use-post-data";
import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const feedbackSchema = z.object({
  message: z.string().min(10, "Pesan minimal 10 karakter"),
  rating: z.enum(["1", "2", "3", "4", "5"], {
    required_error: "Rating wajib dipilih",
  }),
});

type FeedbackSchema = z.infer<typeof feedbackSchema>;

const TambahUmpanBalik = () => {
  const [open, setOpen] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  const form = useForm<FeedbackSchema>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      message: "",
      rating: undefined,
    },
  });

  const { mutate: submitFeedback } = usePostData({
    queryKey: "feedbacks",
    dataProtected: "feedbacks",
    backUrl: "/umpan-balik",
    successMessage: "Umpan balik berhasil dikirim!",
  });

  const onSubmit = (data: FeedbackSchema) => {
    submitFeedback(
      {
        ...data,
        rating: parseInt(data.rating),
      },
      {
        onSuccess: () => {
          form.reset();
          setOpen(false);
        },
        onError: () => {
          form.reset();
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-blue-500">Buat Umpan Balik</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Tambah Umpan Balik</DialogTitle>
        </DialogHeader>
        <div className="mt-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                              (hoveredRating || parseInt(field.value || "0")) >=
                                i
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
                      <Textarea
                        placeholder="Tuliskan umpan balik Anda..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="gap-2">
                <DialogClose asChild>
                  <Button variant="outline" type="button">
                    Batal
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="bg-blue-500"
                >
                  {form.formState.isSubmitting ? "Mengirim..." : "Kirim"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TambahUmpanBalik;
