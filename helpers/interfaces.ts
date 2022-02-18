export interface IUser {
  idUser: number;
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

export interface IOrganization {
  idOrganization: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  zipCode: string;
  city: string;
  idUser: number;
  siret: string;
}

export interface IOrder {
  idOrder: number;
  price: number;
  date: Date;
  address: string;
  zipCode: string;
  city: string;
  idUser: number;
}

export interface IDraws {
  idDraw: number;
  name: string;
  urlDraw: string;
  idUser: number;
  idOrganization?: number;
  idTheme: number;
}

export interface ISizes {
  idSize: number;
  name: string;
}

export interface IThemes {
  idTheme: number;
  name: string;
}
