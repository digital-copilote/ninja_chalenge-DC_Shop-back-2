export interface IUser {
  id_user: number;
  lastname: string;
  firstname: string;
  birthday: Date;
  phone: string;
  email: string;
  password: string;
  address: string;
  zipCode: string;
  city: string;
  role: string;
  bio?: string;
}
