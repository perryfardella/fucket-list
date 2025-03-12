export type ListItem = {
  id: string;
  user_id: string;
  content: string;
  is_completed: boolean;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
};

export type NewListItem = {
  content: string;
};
