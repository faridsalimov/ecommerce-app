export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  success: boolean;
  error?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}
