export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
  status: string;
};

export type AdsT = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  position: string;
  type: string;
  status: string;
  startDate: string;
  endDate: string;
  priority: number;
  createdAt: string;
  clicks: number;
  impressions: number;
};

export type Blog = {
  id: number;
  title: string;
  author: string;
  category: string;
  status: string;
  publishedDate: string;
  tags: string[];
  content: string;
};

export type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  priority: string;
  createdAt: string;
  replied: boolean;
};

export type EventT = {
  id: number;
  name: string;
  date: string;
  time: string;
  category: string;
  location: string;
  description: string;
  imageUrl: string;
};

export type FaqT = {
  id: number;
  question: string;
  answer: string;
  category: string;
  status: string;
  order: number;
  createdAt: string;
};

export type Subscriber = {
  id: number;
  email: string;
  name: string;
  subscribedAt: string;
  status: string;
  source: string;
};

export type Offer = {
  id: number;
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  validUntil: string;
  status: string;
  category: string;
  createdAt: string;
};

export type Project = {
  id: number;
  title: string;
  category: string;
  status: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Review = {
  id: number;
  clientName: string;
  clientTitle: string;
  clientCompany: string;
  rating: number;
  review: string;
  projectType: string;
  status: string;
  featured: boolean;
  clientImage: string;
  createdAt: string;
};

export type TeamMember = {
  id: number;
  name: string;
  role: string;
  avatarUrl: string;
  status: string;
  email: string;
  linkedin: string;
  github: string;
  website: string;
  bio: string;
  certifications: {
    url: string;
    year: string;
    name: string;
    issuer: string;
  }[];
  achievements: string[];
  skills: string[];
  resumeUrl: string;
};
