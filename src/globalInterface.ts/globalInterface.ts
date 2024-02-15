export type TFlower = {
  _id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  bloomDate: string;
  color: string;
  type: string;
  size: number;
  fragrance: string;
  season: string;
  popularity: string
};

export type TSell = {
  name: string;
  quantity: number;
  price: number;
  sellDate: string;
};
