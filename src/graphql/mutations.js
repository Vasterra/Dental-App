/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createDentist = /* GraphQL */ `
  mutation CreateDentist(
    $input: CreateDentistInput!
    $condition: ModelDentistConditionInput
  ) {
    createDentist(input: $input, condition: $condition) {
      id
      firstName
      lastName
      phone
      qualifications
      bio
      website
      address
      city
      street
      postIndex
      email
      lat
      lng
      registered
      hasPaidPlan
      services {
        items {
          id
          dentistId
          name
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      locations {
        items {
          id
          dentistId
          city
          address
          postCode
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      images {
        items {
          id
          dentistId
          titleBefore
          tagsBefore
          titleAfter
          tagsAfter
          service
          nameBefore
          nameAfter
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateDentist = /* GraphQL */ `
  mutation UpdateDentist(
    $input: UpdateDentistInput!
    $condition: ModelDentistConditionInput
  ) {
    updateDentist(input: $input, condition: $condition) {
      id
      firstName
      lastName
      phone
      qualifications
      bio
      website
      address
      city
      street
      postIndex
      email
      lat
      lng
      registered
      hasPaidPlan
      services {
        items {
          id
          dentistId
          name
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      locations {
        items {
          id
          dentistId
          city
          address
          postCode
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      images {
        items {
          id
          dentistId
          titleBefore
          tagsBefore
          titleAfter
          tagsAfter
          service
          nameBefore
          nameAfter
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteDentist = /* GraphQL */ `
  mutation DeleteDentist(
    $input: DeleteDentistInput!
    $condition: ModelDentistConditionInput
  ) {
    deleteDentist(input: $input, condition: $condition) {
      id
      firstName
      lastName
      phone
      qualifications
      bio
      website
      address
      city
      street
      postIndex
      email
      lat
      lng
      registered
      hasPaidPlan
      services {
        items {
          id
          dentistId
          name
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      locations {
        items {
          id
          dentistId
          city
          address
          postCode
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      images {
        items {
          id
          dentistId
          titleBefore
          tagsBefore
          titleAfter
          tagsAfter
          service
          nameBefore
          nameAfter
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createService = /* GraphQL */ `
  mutation CreateService(
    $input: CreateServiceInput!
    $condition: ModelServiceConditionInput
  ) {
    createService(input: $input, condition: $condition) {
      id
      dentistId
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateService = /* GraphQL */ `
  mutation UpdateService(
    $input: UpdateServiceInput!
    $condition: ModelServiceConditionInput
  ) {
    updateService(input: $input, condition: $condition) {
      id
      dentistId
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteService = /* GraphQL */ `
  mutation DeleteService(
    $input: DeleteServiceInput!
    $condition: ModelServiceConditionInput
  ) {
    deleteService(input: $input, condition: $condition) {
      id
      dentistId
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createLocation = /* GraphQL */ `
  mutation CreateLocation(
    $input: CreateLocationInput!
    $condition: ModelLocationConditionInput
  ) {
    createLocation(input: $input, condition: $condition) {
      id
      dentistId
      city
      address
      postCode
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateLocation = /* GraphQL */ `
  mutation UpdateLocation(
    $input: UpdateLocationInput!
    $condition: ModelLocationConditionInput
  ) {
    updateLocation(input: $input, condition: $condition) {
      id
      dentistId
      city
      address
      postCode
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteLocation = /* GraphQL */ `
  mutation DeleteLocation(
    $input: DeleteLocationInput!
    $condition: ModelLocationConditionInput
  ) {
    deleteLocation(input: $input, condition: $condition) {
      id
      dentistId
      city
      address
      postCode
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createServiceForDental = /* GraphQL */ `
  mutation CreateServiceForDental(
    $input: CreateServiceForDentalInput!
    $condition: ModelServiceForDentalConditionInput
  ) {
    createServiceForDental(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateServiceForDental = /* GraphQL */ `
  mutation UpdateServiceForDental(
    $input: UpdateServiceForDentalInput!
    $condition: ModelServiceForDentalConditionInput
  ) {
    updateServiceForDental(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteServiceForDental = /* GraphQL */ `
  mutation DeleteServiceForDental(
    $input: DeleteServiceForDentalInput!
    $condition: ModelServiceForDentalConditionInput
  ) {
    deleteServiceForDental(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createImage = /* GraphQL */ `
  mutation CreateImage(
    $input: CreateImageInput!
    $condition: ModelImageConditionInput
  ) {
    createImage(input: $input, condition: $condition) {
      id
      dentistId
      titleBefore
      tagsBefore
      titleAfter
      tagsAfter
      service
      nameBefore
      nameAfter
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateImage = /* GraphQL */ `
  mutation UpdateImage(
    $input: UpdateImageInput!
    $condition: ModelImageConditionInput
  ) {
    updateImage(input: $input, condition: $condition) {
      id
      dentistId
      titleBefore
      tagsBefore
      titleAfter
      tagsAfter
      service
      nameBefore
      nameAfter
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteImage = /* GraphQL */ `
  mutation DeleteImage(
    $input: DeleteImageInput!
    $condition: ModelImageConditionInput
  ) {
    deleteImage(input: $input, condition: $condition) {
      id
      dentistId
      titleBefore
      tagsBefore
      titleAfter
      tagsAfter
      service
      nameBefore
      nameAfter
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createAdminSettingsSubscriber = /* GraphQL */ `
  mutation CreateAdminSettingsSubscriber(
    $input: CreateAdminSettingsSubscriberInput!
    $condition: ModelAdminSettingsSubscriberConditionInput
  ) {
    createAdminSettingsSubscriber(input: $input, condition: $condition) {
      id
      paidMaxLocations
      paidMaxServices
      paidWebsiteAddress
      paidPhoneNumber
      paidAppearVerified
      freeMaxLocations
      freeMaxServices
      freeWebsiteAddress
      freePhoneNumber
      freeAppearVerified
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateAdminSettingsSubscriber = /* GraphQL */ `
  mutation UpdateAdminSettingsSubscriber(
    $input: UpdateAdminSettingsSubscriberInput!
    $condition: ModelAdminSettingsSubscriberConditionInput
  ) {
    updateAdminSettingsSubscriber(input: $input, condition: $condition) {
      id
      paidMaxLocations
      paidMaxServices
      paidWebsiteAddress
      paidPhoneNumber
      paidAppearVerified
      freeMaxLocations
      freeMaxServices
      freeWebsiteAddress
      freePhoneNumber
      freeAppearVerified
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteAdminSettingsSubscriber = /* GraphQL */ `
  mutation DeleteAdminSettingsSubscriber(
    $input: DeleteAdminSettingsSubscriberInput!
    $condition: ModelAdminSettingsSubscriberConditionInput
  ) {
    deleteAdminSettingsSubscriber(input: $input, condition: $condition) {
      id
      paidMaxLocations
      paidMaxServices
      paidWebsiteAddress
      paidPhoneNumber
      paidAppearVerified
      freeMaxLocations
      freeMaxServices
      freeWebsiteAddress
      freePhoneNumber
      freeAppearVerified
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createAdminAnalytics = /* GraphQL */ `
  mutation CreateAdminAnalytics(
    $input: CreateAdminAnalyticsInput!
    $condition: ModelAdminAnalyticsConditionInput
  ) {
    createAdminAnalytics(input: $input, condition: $condition) {
      id
      totalSubscriptions
      totalFreeAccounts
      totalSubscriptionsClosed
      totalAccountsClosed
      totalImagesUploaded
      monthNewSubscriptions
      monthNewFreeAccounts
      monthSubscriptionsClosed
      monthAccountsClosed
      monthImagesUploaded
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateAdminAnalytics = /* GraphQL */ `
  mutation UpdateAdminAnalytics(
    $input: UpdateAdminAnalyticsInput!
    $condition: ModelAdminAnalyticsConditionInput
  ) {
    updateAdminAnalytics(input: $input, condition: $condition) {
      id
      totalSubscriptions
      totalFreeAccounts
      totalSubscriptionsClosed
      totalAccountsClosed
      totalImagesUploaded
      monthNewSubscriptions
      monthNewFreeAccounts
      monthSubscriptionsClosed
      monthAccountsClosed
      monthImagesUploaded
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteAdminAnalytics = /* GraphQL */ `
  mutation DeleteAdminAnalytics(
    $input: DeleteAdminAnalyticsInput!
    $condition: ModelAdminAnalyticsConditionInput
  ) {
    deleteAdminAnalytics(input: $input, condition: $condition) {
      id
      totalSubscriptions
      totalFreeAccounts
      totalSubscriptionsClosed
      totalAccountsClosed
      totalImagesUploaded
      monthNewSubscriptions
      monthNewFreeAccounts
      monthSubscriptionsClosed
      monthAccountsClosed
      monthImagesUploaded
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createClosedAccount = /* GraphQL */ `
  mutation CreateClosedAccount(
    $input: CreateClosedAccountInput!
    $condition: ModelclosedAccountConditionInput
  ) {
    createClosedAccount(input: $input, condition: $condition) {
      id
      closedAccount
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateClosedAccount = /* GraphQL */ `
  mutation UpdateClosedAccount(
    $input: UpdateClosedAccountInput!
    $condition: ModelclosedAccountConditionInput
  ) {
    updateClosedAccount(input: $input, condition: $condition) {
      id
      closedAccount
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteClosedAccount = /* GraphQL */ `
  mutation DeleteClosedAccount(
    $input: DeleteClosedAccountInput!
    $condition: ModelclosedAccountConditionInput
  ) {
    deleteClosedAccount(input: $input, condition: $condition) {
      id
      closedAccount
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createClosedSubscription = /* GraphQL */ `
  mutation CreateClosedSubscription(
    $input: CreateClosedSubscriptionInput!
    $condition: ModelclosedSubscriptionConditionInput
  ) {
    createClosedSubscription(input: $input, condition: $condition) {
      id
      closedSubscription
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateClosedSubscription = /* GraphQL */ `
  mutation UpdateClosedSubscription(
    $input: UpdateClosedSubscriptionInput!
    $condition: ModelclosedSubscriptionConditionInput
  ) {
    updateClosedSubscription(input: $input, condition: $condition) {
      id
      closedSubscription
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteClosedSubscription = /* GraphQL */ `
  mutation DeleteClosedSubscription(
    $input: DeleteClosedSubscriptionInput!
    $condition: ModelclosedSubscriptionConditionInput
  ) {
    deleteClosedSubscription(input: $input, condition: $condition) {
      id
      closedSubscription
      createdAt
      updatedAt
      owner
    }
  }
`;
