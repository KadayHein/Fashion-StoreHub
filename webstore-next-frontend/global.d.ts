import { DataType } from "./types/enum";

declare global {

type ID = number; 

// ===== Entities =====

type Category = {
  id: ID;
  name: string;
  bannerImageUrl?: string;
  genres?: Genre[];
};

type Genre = {
  id: ID;
  name: string;
  category?: Category;
  products?: Product[]
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
    value?: string | number
    value2?: string | number
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

type ButtonProps = {
  label: string;
  startIcon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  endIcon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  onClickFunc?: React.MouseEventHandler<HTMLButtonElement>
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

type DeliveryMethod = "STANDARD" | "EXPRESS" | "SAME_DAY";

type DeliveryStatus = "PENDING" | "CONFIRMED" | "PACKING" | "SHIPPED" | "OUT_FOR_DELIVERY" | "DELIVERED" | "CANCELLED";

type DeliveryInfo = {

  id?: number;

  // Customer Information
  fullName: string;
  email: string;
  phoneNumber: string;

  // Shipping Address
  country: string;
  stateOrProvince: string;
  city: string;
  township: string;
  postalCode: string;
  addressLine1: string;
  addressLine2?: string;

  // Delivery
  deliveryMethod: DeliveryMethod;
  shippingCompany?: string;
  trackingNumber?: string;
  deliveryStatus: DeliveryStatus;
  deliveryInstructions?: string;

  // Timestamps
  orderedAt?: string;
  shippedAt?: string;
  deliveredAt?: string;

};

type Role = "USER" | "ADMIN";

type Account = {
    email: string;
    fullName: string;
    phoneNumber: string;
    role: Role;
    createdAt?: string;
}

// Inventory / Stock Manager / Stock Reports

type ReportPeriod =
    | "DAILY"
    | "WEEKLY"
    | "MONTHLY"
    | "YEARLY";


type ReportType =
    | "BALANCE"
    | "TRANSFER"
    | "ADJUSTMENT"
    | "VALUATION";


interface ReportItem {
    id: string;
    type: ReportType;
    title: string;
    submittedBy: string;
    submittedAt: string;
    period: ReportPeriod;
}

// Inventory / NewArrival.tsx

type ArrivalStatus =
  | "UPCOMING"
  | "AVAILABLE"
  | "LIMITED";

type PromotionType =
  | "FIRST_SALES"
  | "BULK"
  | "BOTH"
  | "NONE";

interface NewArrival {
  id: number;
  name: string;
  sku: string;
  image: string;
  availableOn: string;
  status: ArrivalStatus;
  colors: string[];
  sizes: string[];
  price: number;
  discount?: number;
  promotionType: PromotionType;
  firstSalesLimit?: number;
  bulkMinimum?: number;
  bulkDiscount?: number;
  description: string;
}

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

type SignInForm = {
    username?: string;
    email: string;
    password: string;
    phoneNumber?: string;
}

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

type ProductsByTextResponse = {
  productsByText?: Product[];
}

type ProductsFilterResponse = {
  filterProducts?: Product[];
}

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

type JwtSignInResponse = {
    signIn : {
      token: string;
      token_type: string;
    }
}

type JwtSignUpResponse = {
    signUp : {
      token: string;
      token_type: string;
    }
}

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

interface SignInResponse {
    signIn: JwtRespDTO;
}

}

export {}

