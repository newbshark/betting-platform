export interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  role: 'user' | 'admin';
  password_hash: string | null;
  created_at: Date;
  updated_at: Date;
}