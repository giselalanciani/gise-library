export interface IBook {
  id?: number;
  name: string;
  year: number;
  author: string;
  editorial: number;
  stock: number;
  price: number;
  categories: number[];
}


export interface IResponseMessage {
  message: string;
}

export interface IStoredMessage {
  message: string;
}
