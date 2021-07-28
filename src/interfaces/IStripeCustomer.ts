export interface IStripeCustomer {
  id: string;
  object: string;
  address?: any;
  balance: number;
  created: number;
  currency: string;
  default_source?: any;
  delinquent: boolean;
  description: string;
  discount?: any;
  email?: any;
  invoice_prefix: string;
  invoice_settings: IStripeInvoiceSettings;
  livemode: boolean;
  metadata: any;
  name?: any;
  next_invoice_sequence: number;
  phone?: any;
  preferred_locales: any[];
  shipping?: any;
  sources: IStripeSources;
  subscriptions: IStripeSubscriptions;
  tax_exempt: string;
  tax_ids: IStripeTaxIds;
}
export interface IStripeInvoiceSettings {
  custom_fields?: any;
  default_payment_method?: any;
  footer?: any;
}
export interface IStripeSources {
  object: string;
  data: any[];
  has_more: boolean;
  url: string;
}
export interface IStripeSubscriptions {
  object: string;
  data: any[];
  has_more: boolean;
  url: string;
}
export interface IStripeTaxIds {
  object: string;
  data: any[];
  has_more: boolean;
  url: string;
}