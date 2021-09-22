// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Dentist, Service, Location, Image, ServiceForDental, PremiumFeature, Watermark, PremiumInformation, AdminSettingsSubscriber, closedAccount, closedSubscription } = initSchema(schema);

export {
  Dentist,
  Service,
  Location,
  Image,
  ServiceForDental,
  PremiumFeature,
  Watermark,
  PremiumInformation,
  AdminSettingsSubscriber,
  closedAccount,
  closedSubscription
};