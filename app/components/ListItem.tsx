"use client";

import { useState, useRef, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { ListItem as ListItemType } from "../types";

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
    if (!confirm("Are you sure you want to delete this item?")) return;

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
      className={`p-4 mb-3 rounded-lg border ${
        isCompleted ? "bg-gray-50" : "bg-white"
      }`}
    >
      <div className="flex items-start">
        <div className="mr-3 mt-1">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={handleToggleComplete}
            disabled={isUpdating}
            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </div>

        <div className="flex-grow">
          {isEditing ? (
            <div className="flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex-grow p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isUpdating}
                onBlur={handleUpdateContent}
                onKeyDown={(e) => e.key === "Enter" && handleUpdateContent()}
              />
            </div>
          ) : (
            <div
              className={`text-lg ${
                isCompleted ? "line-through text-gray-500" : ""
              }`}
              onClick={() => setIsEditing(true)}
            >
              {content}
            </div>
          )}

          {isCompleted && item.completed_at && (
            <div className="text-sm text-gray-500 mt-1">
              Completed on {formatDate(item.completed_at)}
            </div>
          )}

          <div className="text-xs text-gray-400 mt-1">
            Added on {formatDate(item.created_at)}
          </div>
        </div>

        <div className="ml-2 flex space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            disabled={isUpdating || isDeleting}
            className="text-blue-500 hover:text-blue-700"
            title="Edit"
          >
            ✏️
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-500 hover:text-red-700"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
