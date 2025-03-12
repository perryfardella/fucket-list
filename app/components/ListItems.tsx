"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import type { ListItem as ListItemType } from "../types";
import ListItem from "./ListItem";
import AddListItem from "./AddListItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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

  const handleTabChange = (value: string) => {
    setFilter(value as "all" | "active" | "completed");
  };

  return (
    <div>
      <AddListItem onItemAdded={fetchItems} />

      <Tabs
        defaultValue="all"
        value={filter}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="all">All ({items.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({activeCount})</TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedCount})
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          {renderItems()}
        </TabsContent>
        <TabsContent value="active" className="mt-0">
          {renderItems()}
        </TabsContent>
        <TabsContent value="completed" className="mt-0">
          {renderItems()}
        </TabsContent>
      </Tabs>
    </div>
  );

  function renderItems() {
    if (isLoading) {
      return (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 border rounded-lg">
              <div className="flex items-start gap-3">
                <Skeleton className="h-5 w-5 rounded-sm" />
                <div className="flex-grow">
                  <Skeleton className="h-5 w-full max-w-[80%] mb-2" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      );
    }

    if (filteredItems.length === 0) {
      return (
        <div className="text-center py-12 text-muted-foreground">
          {items.length === 0 ? (
            <div className="space-y-2">
              <p>You haven&apos;t added any items to your Fucket List yet.</p>
              <p className="text-sm">
                What&apos;s something challenging you want to accomplish?
              </p>
            </div>
          ) : filter === "active" ? (
            "You don&apos;t have any active items."
          ) : (
            "You don&apos;t have any completed items."
          )}
        </div>
      );
    }

    return (
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
    );
  }
}
