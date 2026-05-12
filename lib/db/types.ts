export type GalleryImageRow = {
  id: string;
  image_url: string;
  caption: string | null;
  created_at: string;
};

export type ServiceRow = {
  id: string;
  title: string;
  description: string | null;
  price: string | null;
  created_at: string;
};

export type ProductRow = {
  id: string;
  name: string;
  description: string | null;
  price: string | null;
  image_url: string | null;
  created_at: string;
};

export type ReviewRow = {
  id: string;
  customer_name: string;
  review_text: string;
  rating: number;
  created_at: string;
};

export type BookingRow = {
  id: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  vehicle: string | null;
  service: string | null;
  date: string | null;
  notes: string | null;
  created_at: string;
};
