export interface Address {
  Line1?: string;
  Line2?: string;
  Line3?: string;
  Gender: string;
  CompanyName: string;
  FirstName: string;
  LastName: string;
  StreetName: string;
  HouseNr: string;
  HouseNrAddition: string;
  ZipCode: string;
  City: string;
  Region: string;
  CountryIso: string;
  Original?: string;
}

export interface Line {
  Gtin: string;
  Description: string;
  Quantity: number;
  UnitPriceInclVat: string;
}

export interface Order {
  Id: number;
  ChannelName: string;
  ChannelOrderNo?: string;
  OrderDate: string;
  Status: string;
  BillingAddress: Address;
  ShippingAddress: Address;
  CurrencyCode: string;
  TotalInclVat?: number;
  SubTotalInclVat: string;
  ShippingCostsInclVat: string;
  Lines: Line[];
  PaymentMethod: string;
}

export interface OrderResult {
  Content: Order[];
  Count: number;
  TotalCount: number;
  ItemsPerPage: number;
}
