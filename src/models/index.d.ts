import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Dentist {
  readonly id: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly phone?: string;
  readonly qualifications?: string;
  readonly bio?: string;
  readonly website?: string;
  readonly gdcNumber?: string;
  readonly address?: string;
  readonly city?: string;
  readonly street?: string;
  readonly postIndex?: string;
  readonly email?: string;
  readonly lat?: string;
  readonly lng?: string;
  readonly registered?: boolean;
  readonly isDisabled?: boolean;
  readonly customerID?: string;
  readonly paymentMethodID?: string;
  readonly subscriptionID?: string;
  readonly hasPaidPlan?: boolean;
  readonly services?: (Service | null)[];
  readonly locations?: (Location | null)[];
  readonly images?: (Image | null)[];
  constructor(init: ModelInit<Dentist>);
  static copyOf(source: Dentist, mutator: (draft: MutableModel<Dentist>) => MutableModel<Dentist> | void): Dentist;
}

export declare class Service {
  readonly id: string;
  readonly dentistId: string;
  readonly name: string;
  constructor(init: ModelInit<Service>);
  static copyOf(source: Service, mutator: (draft: MutableModel<Service>) => MutableModel<Service> | void): Service;
}

export declare class Location {
  readonly id: string;
  readonly dentistId: string;
  readonly city: string;
  readonly address: string;
  readonly postCode: string;
  constructor(init: ModelInit<Location>);
  static copyOf(source: Location, mutator: (draft: MutableModel<Location>) => MutableModel<Location> | void): Location;
}

export declare class Image {
  readonly id: string;
  readonly dentistId: string;
  readonly titleBefore: string;
  readonly tagsBefore: string;
  readonly titleAfter: string;
  readonly tagsAfter: string;
  readonly service: string;
  readonly nameBefore: string;
  readonly nameAfter: string;
  constructor(init: ModelInit<Image>);
  static copyOf(source: Image, mutator: (draft: MutableModel<Image>) => MutableModel<Image> | void): Image;
}

export declare class ServiceForDental {
  readonly id: string;
  readonly name: string;
  constructor(init: ModelInit<ServiceForDental>);
  static copyOf(source: ServiceForDental, mutator: (draft: MutableModel<ServiceForDental>) => MutableModel<ServiceForDental> | void): ServiceForDental;
}

export declare class PremiumFeature {
  readonly id: string;
  readonly name: string;
  constructor(init: ModelInit<PremiumFeature>);
  static copyOf(source: PremiumFeature, mutator: (draft: MutableModel<PremiumFeature>) => MutableModel<PremiumFeature> | void): PremiumFeature;
}

export declare class Watermark {
  readonly id: string;
  readonly dentistId: string;
  readonly lastModifiedDate: string;
  readonly name: string;
  readonly size?: number;
  readonly type: string;
  constructor(init: ModelInit<Watermark>);
  static copyOf(source: Watermark, mutator: (draft: MutableModel<Watermark>) => MutableModel<Watermark> | void): Watermark;
}

export declare class PremiumInformation {
  readonly id: string;
  readonly price: string;
  readonly termsAndConditions: string;
  constructor(init: ModelInit<PremiumInformation>);
  static copyOf(source: PremiumInformation, mutator: (draft: MutableModel<PremiumInformation>) => MutableModel<PremiumInformation> | void): PremiumInformation;
}

export declare class AdminSettingsSubscriber {
  readonly id: string;
  readonly paidMaxLocations: string;
  readonly paidMaxServices: string;
  readonly paidWebsiteAddress: boolean;
  readonly paidPhoneNumber: boolean;
  readonly paidAppearVerified: boolean;
  readonly freeMaxLocations: string;
  readonly freeMaxServices: string;
  readonly freeWebsiteAddress: boolean;
  readonly freePhoneNumber: boolean;
  readonly freeAppearVerified: boolean;
  constructor(init: ModelInit<AdminSettingsSubscriber>);
  static copyOf(source: AdminSettingsSubscriber, mutator: (draft: MutableModel<AdminSettingsSubscriber>) => MutableModel<AdminSettingsSubscriber> | void): AdminSettingsSubscriber;
}

export declare class closedAccount {
  readonly id: string;
  readonly dentistId: string;
  readonly closedAccount: string;
  constructor(init: ModelInit<closedAccount>);
  static copyOf(source: closedAccount, mutator: (draft: MutableModel<closedAccount>) => MutableModel<closedAccount> | void): closedAccount;
}

export declare class closedSubscription {
  readonly id: string;
  readonly dentistId: string;
  readonly closedSubscription: string;
  constructor(init: ModelInit<closedSubscription>);
  static copyOf(source: closedSubscription, mutator: (draft: MutableModel<closedSubscription>) => MutableModel<closedSubscription> | void): closedSubscription;
}