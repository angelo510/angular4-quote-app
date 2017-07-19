export interface IQuote {
  message: String;
  data: IQuoteData;
}

export interface IQuoteData {
  account: IAccountInfo;
  contact: IContactInfo;
  quote_items: IQuoteItems;
}

export interface IAccountInfo {
  address1: String;
  state: String;
  country: String;
  account_name: String;
  city: String;
}

export interface IContactInfo {
  phone: String;
  name: String;
  email: String;
}

export interface IQuoteItem {
  name: string;
  tax_rate: Number;
  description: String;
  unit_price: Number;
  quantity: Number;
}

export interface IQuoteItems {
  one_time_items: IQuoteItem[];
  monthly_items: IQuoteItem[];
}
