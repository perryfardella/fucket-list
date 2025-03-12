"use client";

import type React from "react";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";

type AddListItemProps = {
  onItemAdded: () => void;
};

export default function AddListItem({ onItemAdded }: AddListItemProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim() || !user) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("list_items").insert({
        user_id: user.id,
        content: content.trim(),
      });

      if (error) throw error;

      setContent("");
      onItemAdded();
    } catch (error) {
      console.error("Error adding item:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center gap-2">
        <Input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a new item to your Fucket List..."
          className="flex-grow transition-all focus-visible:ring-2 focus-visible:ring-primary"
          disabled={isSubmitting}
        />
        <Button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="gap-2 transition-all"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Add
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
