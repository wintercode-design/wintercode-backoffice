export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
  status: Status;
};

export type Status =
  | "ACTIVE"
  | "INACTIVE"
  | "DRAFT"
  | "PUBLISHED"
  | "ARCHIVED"
  | "PENDING"
  | "RESOLVED"
  | "REJECTED";

export type AdsT = {
  id: number;
  status: Status;
  createdAt: string;
  description: string;
  imageUrl: string;
  title: string;
  linkUrl: string;
  position: string;
  type: string;
  startDate: string;
  endDate: string;
  priority: number;
  clicks: number;
  impressions: number;
};

export type Blog = {
  id: number;
  status: Status;
  imageUrl?: string;
  title: string;
  category: string;
  author: string;
  publishedDate: string;
  tags: string;
  content: string;
};

export type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type Contact = {
  id: number;
  email: string;
  name: string;
  status: Status;
  createdAt: string;
  priority: Priority;
  phone: string;
  subject: string;
  message: string;
  replied: boolean;
};

export type EventT = {
  id: number;
  name: string;
  description: string;
  date: string;
  imageUrl?: string;
  category: string;
  time: string;
  location: string;
};

export type FaqT = {
  id: number;
  status: Status;
  createdAt: string;
  category: string;
  question: string;
  answer: string;
  order: number;
};

export type Subscriber = {
  id: number;
  email: string;
  name: string;
  status: Status;
  subscribedAt: string;
  source: string;
};

export type Offer = {
  id: number;
  status: Status;
  createdAt: string;
  description: string;
  imageUrl?: string;
  title: string;
  category: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  validUntil: string;
};

export type Project = {
  id: number;
  status: Status;
  description: string;
  imageUrl?: string;
  title: string;
  startDate: string;
  endDate: string;
  category: string;
};

export type Review = {
  id: number;
  status: Status;
  createdAt: string;
  review: string;
  clientName: string;
  clientTitle: string;
  clientCompany: string;
  rating: number;
  projectType: string;
  featured: boolean;
  clientImage: string;
};

export type TeamMember = {
  id: number;
  email: string;
  avatarUrl: string;
  name: string;
  status: Status;
  role: string;
  linkedin: string;
  github: string;
  website: string;
  bio: string;
  resumeUrl: string;
  achievements: string;
  skills: string;
};
