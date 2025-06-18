export type TFeedback = {
  id: string;
  message: string;
  rating: number;
  created_at: string;
  user: {
    id: string;
    username: string;
    image_url: string | null;
  };
};
