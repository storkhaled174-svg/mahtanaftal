export type FaqCategory = "ORDERS" | "PAYMENT" | "DELIVERY" | "WARRANTY";

export interface PlatformFaq {
  id: string; // data-from: PlatformFaq-id
  question: string; // data-from: PlatformFaq-question
  answer: string; // data-from: PlatformFaq-answer
  category: FaqCategory; // data-from: PlatformFaq-category
  isActive: boolean; // data-from: PlatformFaq-isActive
  createdAt: Date; // data-from: PlatformFaq-createdAt
  updatedAt: Date; // data-from: PlatformFaq-updatedAt
}

export interface SupportChannel {
  id: string; // data-from: SupportChannel-id
  title: string; // data-from: SupportChannel-title
  value: string; // data-from: SupportChannel-value
  description: string | null; // data-from: SupportChannel-description
  isActive: boolean; // data-from: SupportChannel-isActive
  createdAt: Date; // data-from: SupportChannel-createdAt
  updatedAt: Date; // data-from: SupportChannel-updatedAt
}

export interface ContentSupportStats {
  totalFaqs: number;
  activeFaqs: number;
  ordersFaqsCount: number;
  paymentFaqsCount: number;
  deliveryFaqsCount: number;
  warrantyFaqsCount: number;
  totalChannels: number;
  activeChannels: number;
}

export interface AdminContentSupportDataOutput {
  faqs: PlatformFaq[];
  channels: SupportChannel[];
  stats: ContentSupportStats;
}

export interface CreatePlatformFaqInput {
  question: string;
  answer: string;
  category: FaqCategory;
  isActive?: boolean;
}

export interface UpdatePlatformFaqInput {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
  isActive: boolean;
}

export interface ToggleEntityStatusInput {
  id: string;
  isActive: boolean;
}

export interface CreateSupportChannelInput {
  title: string;
  value: string;
  description?: string | null;
  isActive?: boolean;
}

export interface UpdateSupportChannelInput {
  id: string;
  title: string;
  value: string;
  description?: string | null;
  isActive: boolean;
}

export interface FaqFilterState {
  search: string;
  category: FaqCategory | "ALL";
  status: "ALL" | "ACTIVE" | "INACTIVE";
}

export interface FaqFormData {
  question: string;
  answer: string;
  category: FaqCategory;
  isActive: boolean;
}

export interface SupportChannelFormData {
  title: string;
  value: string;
  description: string;
  isActive: boolean;
}