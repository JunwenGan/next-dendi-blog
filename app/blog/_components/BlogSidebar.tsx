"use client";

import SearchInput from "./SearchInput";
import TagsList from "./TagsList";

interface BlogSidebarProps {
  postCount: number;
  tags: string[];
  searchQuery: string;
  selectedTag: string | null;
  onSearchChange: (value: string) => void;
  onTagClick: (tag: string | null) => void;
}

export default function BlogSidebar({
  postCount,
  tags,
  searchQuery,
  selectedTag,
  onSearchChange,
  onTagClick,
}: BlogSidebarProps) {
  return (
    <aside className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
          EXPLORE
        </p>
        <h2
          className="text-3xl text-foreground"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 400,
          }}
        >
          Library
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Showing <span className="text-foreground font-medium">{postCount}</span> posts
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-border/50" />

      {/* Search */}
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
          SEARCH
        </p>
        <SearchInput value={searchQuery} onChange={onSearchChange} />
      </div>

      {/* Topics */}
      {tags.length > 0 && (
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
            TOPICS
          </p>
          <TagsList
            tags={tags}
            selectedTag={selectedTag}
            onTagClick={onTagClick}
          />
        </div>
      )}
    </aside>
  );
}
