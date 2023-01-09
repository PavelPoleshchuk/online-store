export interface Idata {
  limit: number;
  products: object[];
  skip: number;
  total: number;
}

export interface Iproduct {
  [key: string]: string | number;
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string;
}

export interface HistoryState {
  category?: string[];
  brand?: string[];
  price: string[];
  stock: string[];
  sort: string[];
  search?: string;
  product?: string;
}

export interface IbasketRender {
  [key: string]: number;
}

export interface IstorageItem {
  id: number;
  price: number;
  counter: number;
}
