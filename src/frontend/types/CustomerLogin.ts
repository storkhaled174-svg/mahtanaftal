export type UserRole = "ADMIN" | "CUSTOMER";

export interface LoginInput {
  username: string;
  password: string;
}

export interface LoginResult {
  token: string;
  userId: string; // data-from: AccountUser-id
  username: string; // data-from: AccountUser-username
  fullName: string; // data-from: AccountUser-fullName
  role: UserRole; // data-from: AccountUser-role
}

export interface SecurityFeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: "ShieldCheck" | "Truck" | "Award" | "LockKeyhole";
}

export interface BrandPartnershipInfo {
  name: string;
  arabicName: string;
  badgeText: string;
  description: string;
}