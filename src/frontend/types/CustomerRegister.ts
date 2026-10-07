export type UserRole = "ADMIN" | "CUSTOMER";

export interface CustomerRegisterFormData {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  nationalIdNumber: string;
  acceptTerms: boolean;
}

export interface FormValidationErrors {
  fullName?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  phoneNumber?: string;
  nationalIdNumber?: string;
  acceptTerms?: string;
  general?: string;
}

export interface SovereignRuleItem {
  id: string;
  title: string;
  description: string;
  iconName: "ShieldCheck" | "Award" | "Layers" | "UserCheck";
  badgeText?: string;
}

export type PhoneCarrier = "mobilis" | "djezzy" | "ooredoo" | "unknown";

// ===== Server Action Types =====

export interface CustomerRegisterInput {
  fullName: string;
  username: string;
  password: string;
  phoneNumber: string;
  nationalIdNumber: string;
}

export interface CustomerRegisterOutput {
  id: string; // data-from: AccountUser-id
  fullName: string; // data-from: AccountUser-fullName
  username: string; // data-from: AccountUser-username
  role: UserRole; // data-from: AccountUser-role
  phoneNumber: string | null; // data-from: AccountUser-phoneNumber
  nationalIdNumber: string | null; // data-from: AccountUser-nationalIdNumber
  createdAt: Date; // data-from: AccountUser-createdAt
}

export interface CheckUsernameAvailabilityInput {
  username: string;
}

export interface CheckUsernameAvailabilityOutput {
  isAvailable: boolean;
  message?: string;
}