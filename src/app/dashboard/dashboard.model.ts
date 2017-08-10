export interface IQuote {
    message: String;
    data: IQuoteData;
}

export interface IQuoteData {
    account: IAccountInfo;
    contact: IContactInfo;
    quote_items: IQuoteItems;
    quote: IQuoteExpireDate;
}

export interface IQuoteExpireDate {
    expiration_date: String;
    comment: String;
    id: Number;
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
    first_name: String;
    last_name: String;
    email: String;
}

export interface IQuoteItem {
    items: IQuoteDetails[];
    sub_total: Number;
    total: Number;
}

export interface IQuoteDetails {
    name: string;
    tax_rate: Number;
    description: String;
    unit_price: Number;
    quantity: Number;
}

export interface IQuoteItems {
    one_time: IQuoteItem;
    monthly: IQuoteItem;
}

export interface INoteData {
    data: INoteItem[];
}

export interface INoteItem {
    last_modified_date: String;
    name: String;
    note: String;
}
