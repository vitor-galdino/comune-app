export interface User {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}

export interface UserResponse extends Omit<User, 'password'> {
  id: number;
  createdAt: string;
}

export interface Contact {
  fullName: string;
  email: string;
  phone: string;
}

export interface ContactResponse extends Contact {
  id: number;
  createdAt: string;
}

export interface UserAndContactsResponse extends UserResponse {
  contacts: ContactResponse[];
}