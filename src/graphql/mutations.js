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
      gdcNumber
      address
      city
      street
      postIndex
      email
      lat
      lng
      registered
      isDisabled
      customerID
      paymentMethodID
      subscriptionID
      hasPaidPlan
      services {
        items {
          id
          dentistId
          name
          createdAt
          updatedAt
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
      gdcNumber
      address
      city
      street
      postIndex
      email
      lat
      lng
      registered
      isDisabled
      customerID
      paymentMethodID
      subscriptionID
      hasPaidPlan
      services {
        items {
          id
          dentistId
          name
          createdAt
          updatedAt
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
      gdcNumber
      address
      city
      street
      postIndex
      email
      lat
      lng
      registered
      isDisabled
      customerID
      paymentMethodID
      subscriptionID
      hasPaidPlan
      services {
        items {
          id
          dentistId
          name
          createdAt
          updatedAt
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
    }
  }
`;
export const createPremiumFeatures = /* GraphQL */ `
  mutation CreatePremiumFeatures(
    $input: CreatePremiumFeaturesInput!
    $condition: ModelPremiumFeaturesConditionInput
  ) {
    createPremiumFeatures(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const updatePremiumFeatures = /* GraphQL */ `
  mutation UpdatePremiumFeatures(
    $input: UpdatePremiumFeaturesInput!
    $condition: ModelPremiumFeaturesConditionInput
  ) {
    updatePremiumFeatures(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const deletePremiumFeatures = /* GraphQL */ `
  mutation DeletePremiumFeatures(
    $input: DeletePremiumFeaturesInput!
    $condition: ModelPremiumFeaturesConditionInput
  ) {
    deletePremiumFeatures(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const createWatermark = /* GraphQL */ `
  mutation CreateWatermark(
    $input: CreateWatermarkInput!
    $condition: ModelWatermarkConditionInput
  ) {
    createWatermark(input: $input, condition: $condition) {
      id
      dentistId
      lastModifiedDate
      name
      size
      type
      createdAt
      updatedAt
    }
  }
`;
export const updateWatermark = /* GraphQL */ `
  mutation UpdateWatermark(
    $input: UpdateWatermarkInput!
    $condition: ModelWatermarkConditionInput
  ) {
    updateWatermark(input: $input, condition: $condition) {
      id
      dentistId
      lastModifiedDate
      name
      size
      type
      createdAt
      updatedAt
    }
  }
`;
export const deleteWatermark = /* GraphQL */ `
  mutation DeleteWatermark(
    $input: DeleteWatermarkInput!
    $condition: ModelWatermarkConditionInput
  ) {
    deleteWatermark(input: $input, condition: $condition) {
      id
      dentistId
      lastModifiedDate
      name
      size
      type
      createdAt
      updatedAt
    }
  }
`;
export const createPremiumInformation = /* GraphQL */ `
  mutation CreatePremiumInformation(
    $input: CreatePremiumInformationInput!
    $condition: ModelPremiumInformationConditionInput
  ) {
    createPremiumInformation(input: $input, condition: $condition) {
      id
      price
      termsAndConditions
      createdAt
      updatedAt
    }
  }
`;
export const updatePremiumInformation = /* GraphQL */ `
  mutation UpdatePremiumInformation(
    $input: UpdatePremiumInformationInput!
    $condition: ModelPremiumInformationConditionInput
  ) {
    updatePremiumInformation(input: $input, condition: $condition) {
      id
      price
      termsAndConditions
      createdAt
      updatedAt
    }
  }
`;
export const deletePremiumInformation = /* GraphQL */ `
  mutation DeletePremiumInformation(
    $input: DeletePremiumInformationInput!
    $condition: ModelPremiumInformationConditionInput
  ) {
    deletePremiumInformation(input: $input, condition: $condition) {
      id
      price
      termsAndConditions
      createdAt
      updatedAt
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
      dentistId
      closedAccount
      createdAt
      updatedAt
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
      dentistId
      closedAccount
      createdAt
      updatedAt
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
      dentistId
      closedAccount
      createdAt
      updatedAt
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
      dentistId
      closedSubscription
      createdAt
      updatedAt
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
      dentistId
      closedSubscription
      createdAt
      updatedAt
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
      dentistId
      closedSubscription
      createdAt
      updatedAt
    }
  }
`;
