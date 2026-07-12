import { DataType } from "./types/enum";

declare global {

type ID = number; 

// ===== Entities =====

type Category = {
  id: ID;
  name: string;
  genres?: Genre[];
};

type Genre = {
  id: ID;
  name: string;
  category?: Category;
};

type Product = {
  id?: ID;
  code?: string;
  name?: string;
  imageUrl?: string;
  price?: number;
  quantity?: number;
  discount?: number;
  genre?: Genre;
  category?: Category;
};

type TitleRef = {
  syskey?: number;
  name?: string;
};

type PicRef = {
  syskey?: number;
  imageUrl?: string;
  title?: TitleRef;
  product?: Product;
};

type CartItem = {
  productId?: ID;
  productImage?: string;
  productName?: string;
  price?: number;
  quantity?: number;
};

// ===== Filter ===== 

type Filter = {
    itemid: number;
    caption?: string;
    fieldname?: string;
    datatype?: DataType;
    condition?: string;
}

type FilterOption = {
  optionid: string;
  datatype: DataType;
  fieldname: string;
  caption: string;

}

type FilterDataset = {
  filterList: Filter[]
}

type Game = {
  id: string;
  name: string;
  logo: string;
  imageUrl: string;
  downloadUrl: string;
  items: Item[];
};

type Item = {
  id: string;
  name: string;
  quantity: number;
  bonus: number;
  price: number;
  imageUrl: string;
  game: Game;
};

type Payment = {
  id: string;
  name: string;
  imageUrl: string;
};

type Server = {
  id: string;
  name: string;
};

type Topup = {
  uid: string;
  server: Server;
  item: Item;
  payment: Payment;
  email: string
};

// ===== Input Types =====

type CartItemInput = {
  productId?: ID;
  productImage?: string;
  productName?: string;
  price?: number;
};

type ProductUploadDTO = {
  code?: string;
  name?: string;
  imageUrl?: string;
  price?: number;
  quantity?: number;
  discount?: number;
  genre_id?: number;
};

// ===== Query Response Types =====
// client.query<T>() means resp.data will match type T (T = Query Response Type shown below)”

type AllCategoriesResponse = {
  allCategories?: Category[];
};

type CategoryByIdResponse = {
  categoryById?: Category;
};

type AllGenresResponse = {
  allGenres?: Genre[];
};

type GenresByCategoryIdResponse = {
  genresByCategoryId?: Genre[];
};

type GenreByIdResponse = {
  genreById?: Genre;
};

type CategoryAndGenresResponse = {
  categoryById?: Category;
  genresByCategoryId?: Genre[];
};

type AllProductsResponse = {
  allProducts?: Product[];
};

type ProductsByGenreIdResponse = {
  productsByGenreId?: Product[];
};

type ProductByIdResponse = {
  productById?: Product;
};

type CartSizeResponse = {
  cartSize?: number;
};

type CartPriceResponse = {
  cartPrice?: number;
};

type AllCartItemsResponse = {
  allCartItems?: CartItem[];
};

type EventSlidersResponse = {
  eventSliders?: PicRef[];
};

type TrendingsResponse = {
  trendings?: {syskey : number,
    product : Product}[];
};

type AllGamesResponse = {
  allGames?: Game[];
};

export type SearchGamesResponse = {
  searchGames?: Game[];
};

type GetGameByIdResponse = {
  getGameById?: Game;
};

type AllServersItemsPaymentsResponse = {
  allServers?: Server[];
  allItemsByGameId?: Item[];
  allPayments?: Payment[];
};

// ===== Mutation Response Types =====

type AddToCartResponse = {
  addToCart?: number;
};

type RemoveFromCartResponse = {
  removeFromCart?: number;
};

type RemoveCertainItemResponse = {
  removeCertainItem?: number;
};

type UploadProductResponse = {
  uploadProduct?: number;
};

type TopupResponse = {
  checkout?: Topup;
};

}

export {}

