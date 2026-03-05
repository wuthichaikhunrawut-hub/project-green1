export interface User {
  id: string; // UUID from backend
  username: string;
  email?: string;
  role: 'ADMIN' | 'USER' | 'EXECUTIVE' | 'ASSESSOR';
  organizationName?: string;
  avatarUrl?: string;
  assessor_verified?: boolean;
}