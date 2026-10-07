export type UserRole = "ADMIN" | "CUSTOMER";

export interface LoginAdminInput {
  usernameOrPhone: string;
  password: string;
}

export interface LoginAdminOutput {
  token: string;
  user: {
    id: string; // data-from: AccountUser-id
    fullName: string; // data-from: AccountUser-fullName
    username: string; // data-from: AccountUser-username
    role: UserRole; // data-from: AccountUser-role
    phoneNumber: string | null; // data-from: AccountUser-phoneNumber
  };
}

export interface AdminLoginFormState {
  usernameOrPhone: string;
  passwordHash: string;
}

export interface SecurityNotice {
  protocol: string;
  encryptionStandard: string;
  systemScope: string;
  wilayasCoverage: number;
}