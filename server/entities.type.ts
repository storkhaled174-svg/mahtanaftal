export type UserRole = 'ADMIN' | 'CUSTOMER';

export type TireBrand = 'CONTINENTAL' | 'IRIS';

export type TireCategory = 'TOURISM' | 'UTILITY' | 'SUV';

export type FaqCategory = 'ORDERS' | 'PAYMENT' | 'DELIVERY' | 'WARRANTY';

export type OrderStatus = 'NEW' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';

export type AccountUser_uniqueKey = {
  id: string; // Unique Key
};

export type AccountUser_without_PKs = {
  fullName: string;
  username: string;
  passwordHash: string;
  role: UserRole;
  phoneNumber?: string | null;
  nationalIdNumber?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type AccountUser = AccountUser_uniqueKey & AccountUser_without_PKs;



export type AlgerianWilaya_uniqueKey = {
  id: string; // Unique Key
};

export type AlgerianWilaya_without_PKs = {
  code: string;
  nameAr: string;
  communes: any; /// ![Array<string>]
  createdAt: Date;
  updatedAt: Date;
};

export type AlgerianWilaya = AlgerianWilaya_uniqueKey & AlgerianWilaya_without_PKs;



export type TireStock_uniqueKey = {
  id: string; // Unique Key
};

export type TireStock_without_PKs = {
  brand: TireBrand;
  size: string;
  category: TireCategory;
  priceDzd: number;
  availableStock: number;
  reservedStock: number;
  minThreshold: number;
  speedIndex?: string | null;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TireStock = TireStock_uniqueKey & TireStock_without_PKs;



export type PlatformFaq_uniqueKey = {
  id: string; // Unique Key
};

export type PlatformFaq_without_PKs = {
  question: string;
  answer: string;
  category: FaqCategory;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type PlatformFaq = PlatformFaq_uniqueKey & PlatformFaq_without_PKs;



export type SupportChannel_uniqueKey = {
  id: string; // Unique Key
};

export type SupportChannel_without_PKs = {
  title: string;
  value: string;
  description?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type SupportChannel = SupportChannel_uniqueKey & SupportChannel_without_PKs;



export type TireOrder_uniqueKey = {
  id: string; // Unique Key
};

export type TireOrder_without_PKs = {
  orderNumber: string;
  customerName: string;
  phoneNumber: string;
  secondaryPhone: string;
  wilaya: string;
  commune: string;
  brand: TireBrand;
  tireSize: string;
  quantity: number;
  unitPriceDzd: number;
  totalPriceDzd: number;
  nationalIdNumber: string;
  dahabiaCardNumber: string;
  dahabiaExpiry: string;
  status: OrderStatus;
  notes?: string | null;
  customerId?: string | null; //FK → AccountUser.id
  createdAt: Date;
  updatedAt: Date;
};

export type TireOrder = TireOrder_uniqueKey & TireOrder_without_PKs;




export type StringFilter = {
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  equals?: string;
  in?: string[];
  notIn?: string[];
  not?: string | StringFilter;
};

export type NumberFilter = {
  equals?: number;
  in?: number[];
  notIn?: number[];
  not?: number | NumberFilter;
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
};

export type DateFilter = {
  equals?: Date;
  in?: Date[];
  notIn?: Date[];
  not?: Date | DateFilter;
  lt?: Date;
  lte?: Date;
  gt?: Date;
  gte?: Date;
};

export type UserRoleFilter = {
  equals?: UserRole;
  in?: UserRole[];
  notIn?: UserRole[];
  not?: UserRole | UserRoleFilter;
};

export type TireBrandFilter = {
  equals?: TireBrand;
  in?: TireBrand[];
  notIn?: TireBrand[];
  not?: TireBrand | TireBrandFilter;
};

export type TireCategoryFilter = {
  equals?: TireCategory;
  in?: TireCategory[];
  notIn?: TireCategory[];
  not?: TireCategory | TireCategoryFilter;
};

export type FaqCategoryFilter = {
  equals?: FaqCategory;
  in?: FaqCategory[];
  notIn?: FaqCategory[];
  not?: FaqCategory | FaqCategoryFilter;
};

export type OrderStatusFilter = {
  equals?: OrderStatus;
  in?: OrderStatus[];
  notIn?: OrderStatus[];
  not?: OrderStatus | OrderStatusFilter;
};

export type filtered_AccountUser = {
  id?: string | StringFilter | null;
  fullName?: string | StringFilter | null;
  username?: string | StringFilter | null;
  passwordHash?: string | StringFilter | null;
  role?: UserRole | UserRoleFilter | null;
  phoneNumber?: string | StringFilter | null;
  nationalIdNumber?: string | StringFilter | null;
  createdAt?: Date | DateFilter | null;
  updatedAt?: Date | DateFilter | null;
};

export type filtered_AlgerianWilaya = {
  id?: string | StringFilter | null;
  code?: string | StringFilter | null;
  nameAr?: string | StringFilter | null;
  communes?: any | null; /// ![Array<string>]
  createdAt?: Date | DateFilter | null;
  updatedAt?: Date | DateFilter | null;
};

export type filtered_TireStock = {
  id?: string | StringFilter | null;
  brand?: TireBrand | TireBrandFilter | null;
  size?: string | StringFilter | null;
  category?: TireCategory | TireCategoryFilter | null;
  priceDzd?: number | NumberFilter | null;
  availableStock?: number | NumberFilter | null;
  reservedStock?: number | NumberFilter | null;
  minThreshold?: number | NumberFilter | null;
  speedIndex?: string | StringFilter | null;
  isAvailable?: boolean | null;
  createdAt?: Date | DateFilter | null;
  updatedAt?: Date | DateFilter | null;
};

export type filtered_PlatformFaq = {
  id?: string | StringFilter | null;
  question?: string | StringFilter | null;
  answer?: string | StringFilter | null;
  category?: FaqCategory | FaqCategoryFilter | null;
  isActive?: boolean | null;
  createdAt?: Date | DateFilter | null;
  updatedAt?: Date | DateFilter | null;
};

export type filtered_SupportChannel = {
  id?: string | StringFilter | null;
  title?: string | StringFilter | null;
  value?: string | StringFilter | null;
  description?: string | StringFilter | null;
  isActive?: boolean | null;
  createdAt?: Date | DateFilter | null;
  updatedAt?: Date | DateFilter | null;
};

export type filtered_TireOrder = {
  id?: string | StringFilter | null;
  orderNumber?: string | StringFilter | null;
  customerName?: string | StringFilter | null;
  phoneNumber?: string | StringFilter | null;
  secondaryPhone?: string | StringFilter | null;
  wilaya?: string | StringFilter | null;
  commune?: string | StringFilter | null;
  brand?: TireBrand | TireBrandFilter | null;
  tireSize?: string | StringFilter | null;
  quantity?: number | NumberFilter | null;
  unitPriceDzd?: number | NumberFilter | null;
  totalPriceDzd?: number | NumberFilter | null;
  nationalIdNumber?: string | StringFilter | null;
  dahabiaCardNumber?: string | StringFilter | null;
  dahabiaExpiry?: string | StringFilter | null;
  status?: OrderStatus | OrderStatusFilter | null;
  notes?: string | StringFilter | null;
  customerId?: string | StringFilter | null; //FK → AccountUser.id
  createdAt?: Date | DateFilter | null;
  updatedAt?: Date | DateFilter | null;
};

export type Entities = {
  accountuser: {
    Create(data: AccountUser): Promise<AccountUser | null>;
    Get(args: AccountUser_uniqueKey): Promise<AccountUser | null>;
    GetAll(args?: filtered_AccountUser): Promise<AccountUser[]>;
    GetPage(pageNumber?: number, pageSize?: number, args?: filtered_AccountUser): Promise<AccountUser[]>;
    Count(args?: filtered_AccountUser): Promise<number>;
    Update(args: { where: AccountUser_uniqueKey; data: AccountUser_without_PKs }): Promise<AccountUser | null>;
    Delete(args: AccountUser_uniqueKey): Promise<AccountUser | null>;
  };
  algerianwilaya: {
    Create(data: AlgerianWilaya): Promise<AlgerianWilaya | null>;
    Get(args: AlgerianWilaya_uniqueKey): Promise<AlgerianWilaya | null>;
    GetAll(args?: filtered_AlgerianWilaya): Promise<AlgerianWilaya[]>;
    GetPage(pageNumber?: number, pageSize?: number, args?: filtered_AlgerianWilaya): Promise<AlgerianWilaya[]>;
    Count(args?: filtered_AlgerianWilaya): Promise<number>;
    Update(args: { where: AlgerianWilaya_uniqueKey; data: AlgerianWilaya_without_PKs }): Promise<AlgerianWilaya | null>;
    Delete(args: AlgerianWilaya_uniqueKey): Promise<AlgerianWilaya | null>;
  };
  tirestock: {
    Create(data: TireStock): Promise<TireStock | null>;
    Get(args: TireStock_uniqueKey): Promise<TireStock | null>;
    GetAll(args?: filtered_TireStock): Promise<TireStock[]>;
    GetPage(pageNumber?: number, pageSize?: number, args?: filtered_TireStock): Promise<TireStock[]>;
    Count(args?: filtered_TireStock): Promise<number>;
    Update(args: { where: TireStock_uniqueKey; data: TireStock_without_PKs }): Promise<TireStock | null>;
    Delete(args: TireStock_uniqueKey): Promise<TireStock | null>;
  };
  platformfaq: {
    Create(data: PlatformFaq): Promise<PlatformFaq | null>;
    Get(args: PlatformFaq_uniqueKey): Promise<PlatformFaq | null>;
    GetAll(args?: filtered_PlatformFaq): Promise<PlatformFaq[]>;
    GetPage(pageNumber?: number, pageSize?: number, args?: filtered_PlatformFaq): Promise<PlatformFaq[]>;
    Count(args?: filtered_PlatformFaq): Promise<number>;
    Update(args: { where: PlatformFaq_uniqueKey; data: PlatformFaq_without_PKs }): Promise<PlatformFaq | null>;
    Delete(args: PlatformFaq_uniqueKey): Promise<PlatformFaq | null>;
  };
  supportchannel: {
    Create(data: SupportChannel): Promise<SupportChannel | null>;
    Get(args: SupportChannel_uniqueKey): Promise<SupportChannel | null>;
    GetAll(args?: filtered_SupportChannel): Promise<SupportChannel[]>;
    GetPage(pageNumber?: number, pageSize?: number, args?: filtered_SupportChannel): Promise<SupportChannel[]>;
    Count(args?: filtered_SupportChannel): Promise<number>;
    Update(args: { where: SupportChannel_uniqueKey; data: SupportChannel_without_PKs }): Promise<SupportChannel | null>;
    Delete(args: SupportChannel_uniqueKey): Promise<SupportChannel | null>;
  };
  tireorder: {
    Create(data: TireOrder): Promise<TireOrder | null>;
    Get(args: TireOrder_uniqueKey): Promise<TireOrder | null>;
    GetAll(args?: filtered_TireOrder): Promise<TireOrder[]>;
    GetPage(pageNumber?: number, pageSize?: number, args?: filtered_TireOrder): Promise<TireOrder[]>;
    Count(args?: filtered_TireOrder): Promise<number>;
    Update(args: { where: TireOrder_uniqueKey; data: TireOrder_without_PKs }): Promise<TireOrder | null>;
    Delete(args: TireOrder_uniqueKey): Promise<TireOrder | null>;
  };
};

