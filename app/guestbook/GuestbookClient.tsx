"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import NotificationBox from "@/app/components/NotificationBox";
import dynamic from "next/dynamic";
import { EmojiClickData } from "emoji-picker-react";
import { motion } from "framer-motion";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
});

const guestbookEntrySchema = z.object({
  content: z.string().min(1, "Content is required").max(65535),
});

type GuestbookEntryFormData = z.infer<typeof guestbookEntrySchema>;

interface GuestbookEntry {
  id: string;
  content: string;
  createAt: Date;
  user: {
    id: string;
    name: string | null;
    image: string | null;
    email: string | null;
  };
}

interface GuestbookClientProps {
  initialEntries: GuestbookEntry[];
}

export default function GuestbookClient({ initialEntries }: GuestbookClientProps) {
  const { status, data: session } = useSession();
  const router = useRouter();
  const [entries, setEntries] = useState(initialEntries);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm<GuestbookEntryFormData>({
    resolver: zodResolver(guestbookEntrySchema),
    defaultValues: {
      content: "",
    },
  });

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setValue("content", getValues().content + emojiData.emoji);
  };

  const onSubmit = handleSubmit(async (data) => {
    if (status !== "authenticated") {
      setError("Please login first before leaving a message");
      setShowNotification(true);
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post("/api/guestbook", data);
      setEntries([response.data, ...entries]);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      reset();
      setEmojiOpen(false);
      router.refresh();
    } catch (error: any) {
      setIsSubmitting(false);
      setError(
        error.response?.data?.error || "Failed to post message. Please try again."
      );
      setShowNotification(true);
      setEmojiOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <div className="space-y-8">
      {showAlert && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed left-1/2 -translate-x-1/2 top-20 z-50"
        >
          <Card className="border-green-500 bg-green-50 dark:bg-green-950">
            <CardContent className="pt-6">
              <p className="text-green-700 dark:text-green-300">
                Your message has been posted!
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {showNotification && (
        <NotificationBox message={error} onClose={() => setShowNotification(false)} />
      )}

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Leave a Message</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <textarea
              {...register("content")}
              placeholder="Say something nice..."
              className="w-full min-h-[120px] p-4 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              disabled={isSubmitting}
            />
            {errors.content && (
              <p className="text-sm text-destructive">{errors.content.message}</p>
            )}

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  setEmojiOpen(!emojiOpen);
                }}
              >
                😊 Emoji
              </Button>
              {emojiOpen && (
                <div className="absolute z-10">
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Posting..." : "Post Message"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Entries */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Messages ({entries.length})</h2>
        {entries.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-center py-8">
                No messages yet. Be the first to leave one!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {entries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      {entry.user.image && (
                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                          <img
                            src={entry.user.image}
                            alt={entry.user.name || "User"}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-semibold">
                            {entry.user.name || "Anonymous"}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {format(new Date(entry.createAt), "MMM dd, yyyy")}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground whitespace-pre-wrap">
                          {entry.content}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


