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

export type OptionalUser = Partial<User>;

export interface Contact {
  fullName: string;
  email: string;
  phone: string;
}

export interface ContactResponse extends Contact {
  id: number;
  createdAt: string;
}

export type OptionalContact = Partial<Contact>;

export interface UserAndContactsResponse extends UserResponse {
  contacts: ContactResponse[];
}