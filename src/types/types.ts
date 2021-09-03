export interface IServices {
  id: string,
  dentistId: string,
  name: string,
  createdAt: Date,
  updatedAt: Date,
  owner: string,
}

export interface Ilocations {
  id: string,
  dentistId: string,
  city: string,
  address: string,
  postCode: string,
  createdAt: Date,
  updatedAt: Date,
  owner: string,
}

export interface IImages {
  id: string,
  dentistId: string,
  titleBefore: string,
  tagsBefore: string,
  titleAfter: string,
  tagsAfter: string,
  service: IServices[],
  nameBefore: string,
  nameAfter: string,
  createdAt: Date,
  updatedAt: Date,
  owner: string,
}
export interface IAttributes {
  Name: string,
  Value: string,
}

export interface IDentists {
  Attributes: IAttributes[],
  Enabled: boolean,
  UserCreateDate: string,
  UserLastModifiedDate: string,
  UserStatus: string,
  Username: string,
  email: string,
  gdcNumber: string,
  hasPaidPlan: boolean,
  postCode: string,
  subscription: string,
  suspend: boolean,
}

export interface IAdminSettingsSubscribers {
  createdAt: string,
  updatedAt: string,
  freeAppearVerified: boolean,
  freeMaxLocations: string,
  freeMaxServices: string,
  freePhoneNumber: boolean,
  freeWebsiteAddress: boolean,
  id: string,
  owner: string,
  paidAppearVerified: boolean,
  paidMaxLocations: string,
  paidMaxServices: string,
  paidPhoneNumber: boolean,
  paidWebsiteAddress: boolean,
}

export interface IListClosedAccounts {
  closedAccount: string
  createdAt: string
  dentistId: string
  id: string
  owner: string
  updatedAt: string
}

export interface IAnalytics {
  monthAccountsClosed: number
  monthImagesUploaded: number
  monthNewFreeAccounts: number
  monthNewSubscriptions: number
  monthSubscriptionsClosed: number
  totalAccountsClosed: number
  totalFreeAccounts: number
  totalImagesUploaded: number
  totalSubscriptions: number
  totalSubscriptionsClosed: number
}

export interface IDentist {
  address: string
  bio: string
  city: string
  createdAt: string
  email: string
  firstName: string
  gdcNumber: string
  hasPaidPlan: boolean
  IsDisabled: boolean
  id: string
  images: IImages
  lastName: string
  lat: string
  lng: string
  locations: Ilocations
  phone: string
  postIndex: string
  qualifications: string
  registered: boolean
  services: {nextToken: null}
  street: string
  updatedAt: string
}

export interface IListClosedSubscriptions{
  closedSubscription: string
  createdAt: string
  dentistId: string
  id: string
  owner: string
  updatedAt: string

}