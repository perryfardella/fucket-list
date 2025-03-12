"use client";

import { useState, useRef, useEffect } from "react";
import { supabase } from "../lib/supabase";
import type { ListItem as ListItemType } from "../types";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit2, Trash2, Check, X, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type ListItemProps = {
  item: ListItemType;
  onItemUpdated: () => void;
  onItemDeleted: () => void;
};

export default function ListItem({
  item,
  onItemUpdated,
  onItemDeleted,
}: ListItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(item.content);
  const [isCompleted, setIsCompleted] = useState(item.is_completed);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleToggleComplete = async () => {
    setIsUpdating(true);

    const newCompletedStatus = !isCompleted;
    const completedAt = newCompletedStatus ? new Date().toISOString() : null;

    try {
      const { error } = await supabase
        .from("list_items")
        .update({
          is_completed: newCompletedStatus,
          completed_at: completedAt,
          updated_at: new Date().toISOString(),
        })
        .eq("id", item.id);

      if (error) throw error;

      setIsCompleted(newCompletedStatus);
      onItemUpdated();
    } catch (error) {
      console.error("Error updating item:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdateContent = async () => {
    if (!content.trim() || content === item.content) {
      setIsEditing(false);
      setContent(item.content);
      return;
    }

    setIsUpdating(true);

    try {
      const { error } = await supabase
        .from("list_items")
        .update({
          content: content.trim(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", item.id);

      if (error) throw error;

      setIsEditing(false);
      onItemUpdated();
    } catch (error) {
      console.error("Error updating item:", error);
      setContent(item.content);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const { error } = await supabase
        .from("list_items")
        .delete()
        .eq("id", item.id);

      if (error) throw error;

      onItemDeleted();
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setContent(item.content);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      className={`p-4 mb-3 rounded-lg border transition-all ${
        isCompleted ? "bg-muted/50" : "bg-card"
      } ${isEditing ? "ring-2 ring-primary/20" : ""}`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1">
          {isUpdating && !isEditing ? (
            <div className="h-5 w-5 flex items-center justify-center">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Checkbox
              checked={isCompleted}
              onCheckedChange={() => handleToggleComplete()}
              disabled={isUpdating}
              className="h-5 w-5 rounded-sm"
            />
          )}
        </div>

        <div className="flex-grow">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <Input
                ref={inputRef}
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex-grow"
                disabled={isUpdating}
                onKeyDown={(e) => e.key === "Enter" && handleUpdateContent()}
              />
              <div className="flex items-center gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleUpdateContent}
                  disabled={isUpdating}
                  className="h-8 w-8"
                >
                  {isUpdating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={cancelEditing}
                  disabled={isUpdating}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div
              className={`text-base transition-all ${
                isCompleted ? "line-through text-muted-foreground" : ""
              }`}
              onClick={() => !isUpdating && setIsEditing(true)}
            >
              {content}
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:gap-3 text-xs text-muted-foreground mt-1">
            <div>Added on {formatDate(item.created_at)}</div>
            {isCompleted && item.completed_at && (
              <div className="font-medium text-primary">
                Completed on {formatDate(item.completed_at)}
              </div>
            )}
          </div>
        </div>

        {!isEditing && (
          <div className="flex gap-1 ml-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              disabled={isUpdating || isDeleting}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <Edit2 className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  disabled={isDeleting}
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                >
                  {isDeleting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                  <span className="sr-only">Delete</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this item?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this item from your list.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-destructive text-destructive-foreground"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>
    </div>
  );
}
