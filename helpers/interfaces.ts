export interface CreateUser {
  id_user: number;
  lastname: string;
  firstname: string;
  birthday: Date;
  phone: string;
  email: string;
  hashedPassword: string;
  address: string;
  zipCode: string;
  city: string;
  role: string;
  bio?: string;
}

export interface IOrga {
  id_organization: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  zipCode: string;
  city: string;
  id_user: number;
}
