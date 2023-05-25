export interface Person {
  fullName: string;
  email: string;
  phone: string;
}

export interface PersonResponse extends Person {
  id: number;
  createdAt: string;
}