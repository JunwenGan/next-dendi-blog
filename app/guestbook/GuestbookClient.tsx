"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import GuestbookCard from "./_components/GuestbookCard";
import SignInCard from "./_components/SignInCard";
import SignInModal from "./_components/SignInModal";
import MessageForm from "./_components/MessageForm";
import SkeletonCard from "./_components/SkeletonCard";

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

const ITEMS_PER_BATCH = 6; // Load 6 cards at a time

export default function GuestbookClient({ initialEntries }: GuestbookClientProps) {
  const { status, data: session } = useSession();
  const [entries, setEntries] = useState(initialEntries);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showMessageForm, setShowMessageForm] = useState(false);

  // Lazy loading state
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_BATCH);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && visibleCount < initialEntries.length) {
          setIsLoadingMore(true);
          // Simulate network delay for smooth UX
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + ITEMS_PER_BATCH, initialEntries.length));
            setIsLoadingMore(false);
          }, 500);
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [visibleCount, initialEntries.length]);

  const handleWriteClick = useCallback(() => {
    if (status === "authenticated") {
      setShowMessageForm(true);
    } else {
      setShowSignInModal(true);
    }
  }, [status]);

  const handleNewEntry = useCallback((entry: GuestbookEntry) => {
    setEntries((prev) => [entry, ...prev]);
    setVisibleCount((prev) => prev + 1);
  }, []);

  // Get visible entries
  const visibleEntries = entries.slice(0, visibleCount);
  const hasMore = visibleCount < entries.length;
  const remainingSkeletons = Math.min(ITEMS_PER_BATCH, entries.length - visibleCount);

  return (
    <>
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 auto-rows-fr">
        {/* Sign In / Write Card - Always first */}
        <SignInCard onWriteClick={handleWriteClick} />

        {/* Visible Guestbook Entries */}
        {visibleEntries.map((entry, index) => (
          <GuestbookCard key={entry.id} entry={entry} index={index} />
        ))}

        {/* Loading Skeletons when loading more */}
        {isLoadingMore && hasMore && (
          <>
            {[...Array(remainingSkeletons)].map((_, index) => (
              <SkeletonCard key={`skeleton-${index}`} index={index} />
            ))}
          </>
        )}

        {/* Empty state */}
        {entries.length === 0 && (
          <motion.div
            className="p-8 border-2 border-dashed border-border/30 rounded-2xl text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-muted-foreground">
              No messages yet. Be the first to leave one!
            </p>
          </motion.div>
        )}
      </div>

      {/* Load more trigger */}
      {hasMore && (
        <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
          {isLoadingMore && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          )}
        </div>
      )}

      {/* Sign In Modal */}
      <SignInModal
        isOpen={showSignInModal}
        onClose={() => setShowSignInModal(false)}
      />

      {/* Message Form Modal */}
      <MessageForm
        isOpen={showMessageForm}
        onClose={() => setShowMessageForm(false)}
        onSuccess={handleNewEntry}
        userName={session?.user?.name}
        userImage={session?.user?.image}
      />
    </>
  );
}

