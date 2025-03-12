"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { ListItem as ListItemType } from "../types";
import ListItem from "./ListItem";
import AddListItem from "./AddListItem";

export default function ListItems() {
  const [items, setItems] = useState<ListItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const { user } = useAuth();

  const fetchItems = async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      const query = supabase
        .from("list_items")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      const { data, error } = await query;

      if (error) throw error;

      setItems(data || []);
    } catch (error) {
      console.error("Error fetching items:", error);
      setError("Failed to load your list items. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [user]);

  const filteredItems = items.filter((item) => {
    if (filter === "all") return true;
    if (filter === "active") return !item.is_completed;
    if (filter === "completed") return item.is_completed;
    return true;
  });

  const activeCount = items.filter((item) => !item.is_completed).length;
  const completedCount = items.filter((item) => item.is_completed).length;

  return (
    <div>
      <AddListItem onItemAdded={fetchItems} />

      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {activeCount} active, {completedCount} completed
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 text-sm rounded ${
              filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-3 py-1 text-sm rounded ${
              filter === "active" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-3 py-1 text-sm rounded ${
              filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center p-8">Loading your list items...</div>
      ) : error ? (
        <div className="text-center p-8 text-red-500">{error}</div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center p-8 text-gray-500">
          {items.length === 0
            ? "You haven't added any items to your Fucket List yet."
            : filter === "active"
            ? "You don't have any active items."
            : "You don't have any completed items."}
        </div>
      ) : (
        <div>
          {filteredItems.map((item) => (
            <ListItem
              key={item.id}
              item={item}
              onItemUpdated={fetchItems}
              onItemDeleted={fetchItems}
            />
          ))}
        </div>
      )}
    </div>
  );
}
