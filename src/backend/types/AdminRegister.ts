export type UserRole = "ADMIN" | "CUSTOMER";

export interface RegisterAdminInput {
  fullName: string;
  username: string;
  phoneNumber: string;
  password: string;
}

export interface RegisterAdminOutput {
  id: string; // data-from: AccountUser-id
  username: string; // data-from: AccountUser-username
  fullName: string; // data-from: AccountUser-fullName
  role: UserRole; // data-from: AccountUser-role
  phoneNumber: string | null; // data-from: AccountUser-phoneNumber
  token: string;
}

export interface AdminRegisterFormData {
  fullName: string;
  username: string;
  phoneNumber: string;
  passwordHash: string;
  confirmPassword: string;
  role: "ADMIN";
  agreeToSecurityCharter: boolean;
}

export interface PasswordStrength {
  score: number; // 0 to 4
  label: string;
  feedback: string[];
  colorClass: string;
}

export interface FormValidationErrors {
  fullName?: string;
  username?: string;
  phoneNumber?: string;
  passwordHash?: string;
  confirmPassword?: string;
  agreeToSecurityCharter?: string;
  general?: string;
}