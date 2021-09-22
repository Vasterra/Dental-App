/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateDentist = /* GraphQL */ `
  subscription OnCreateDentist {
    onCreateDentist {
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      locations {
        items {
          id
          dentistId
          city
          address
          postCode
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateDentist = /* GraphQL */ `
  subscription OnUpdateDentist {
    onUpdateDentist {
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      locations {
        items {
          id
          dentistId
          city
          address
          postCode
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteDentist = /* GraphQL */ `
  subscription OnDeleteDentist {
    onDeleteDentist {
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      locations {
        items {
          id
          dentistId
          city
          address
          postCode
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onCreateService = /* GraphQL */ `
  subscription OnCreateService {
    onCreateService {
      id
      dentistId
      name
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateService = /* GraphQL */ `
  subscription OnUpdateService {
    onUpdateService {
      id
      dentistId
      name
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteService = /* GraphQL */ `
  subscription OnDeleteService {
    onDeleteService {
      id
      dentistId
      name
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onCreateLocation = /* GraphQL */ `
  subscription OnCreateLocation {
    onCreateLocation {
      id
      dentistId
      city
      address
      postCode
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateLocation = /* GraphQL */ `
  subscription OnUpdateLocation {
    onUpdateLocation {
      id
      dentistId
      city
      address
      postCode
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteLocation = /* GraphQL */ `
  subscription OnDeleteLocation {
    onDeleteLocation {
      id
      dentistId
      city
      address
      postCode
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onCreateServiceForDental = /* GraphQL */ `
  subscription OnCreateServiceForDental {
    onCreateServiceForDental {
      id
      name
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateServiceForDental = /* GraphQL */ `
  subscription OnUpdateServiceForDental {
    onUpdateServiceForDental {
      id
      name
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteServiceForDental = /* GraphQL */ `
  subscription OnDeleteServiceForDental {
    onDeleteServiceForDental {
      id
      name
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePremiumFeature = /* GraphQL */ `
  subscription OnCreatePremiumFeature {
    onCreatePremiumFeature {
      id
      name
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePremiumFeature = /* GraphQL */ `
  subscription OnUpdatePremiumFeature {
    onUpdatePremiumFeature {
      id
      name
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePremiumFeature = /* GraphQL */ `
  subscription OnDeletePremiumFeature {
    onDeletePremiumFeature {
      id
      name
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onCreateWatermark = /* GraphQL */ `
  subscription OnCreateWatermark {
    onCreateWatermark {
      id
      dentistId
      lastModifiedDate
      name
      size
      type
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateWatermark = /* GraphQL */ `
  subscription OnUpdateWatermark {
    onUpdateWatermark {
      id
      dentistId
      lastModifiedDate
      name
      size
      type
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteWatermark = /* GraphQL */ `
  subscription OnDeleteWatermark {
    onDeleteWatermark {
      id
      dentistId
      lastModifiedDate
      name
      size
      type
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePremiumInformation = /* GraphQL */ `
  subscription OnCreatePremiumInformation {
    onCreatePremiumInformation {
      id
      price
      termsAndConditions
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePremiumInformation = /* GraphQL */ `
  subscription OnUpdatePremiumInformation {
    onUpdatePremiumInformation {
      id
      price
      termsAndConditions
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePremiumInformation = /* GraphQL */ `
  subscription OnDeletePremiumInformation {
    onDeletePremiumInformation {
      id
      price
      termsAndConditions
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onCreateImage = /* GraphQL */ `
  subscription OnCreateImage {
    onCreateImage {
      id
      dentistId
      titleBefore
      tagsBefore
      titleAfter
      tagsAfter
      service
      nameBefore
      nameAfter
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateImage = /* GraphQL */ `
  subscription OnUpdateImage {
    onUpdateImage {
      id
      dentistId
      titleBefore
      tagsBefore
      titleAfter
      tagsAfter
      service
      nameBefore
      nameAfter
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteImage = /* GraphQL */ `
  subscription OnDeleteImage {
    onDeleteImage {
      id
      dentistId
      titleBefore
      tagsBefore
      titleAfter
      tagsAfter
      service
      nameBefore
      nameAfter
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onCreateAdminSettingsSubscriber = /* GraphQL */ `
  subscription OnCreateAdminSettingsSubscriber {
    onCreateAdminSettingsSubscriber {
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateAdminSettingsSubscriber = /* GraphQL */ `
  subscription OnUpdateAdminSettingsSubscriber {
    onUpdateAdminSettingsSubscriber {
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteAdminSettingsSubscriber = /* GraphQL */ `
  subscription OnDeleteAdminSettingsSubscriber {
    onDeleteAdminSettingsSubscriber {
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onCreateClosedAccount = /* GraphQL */ `
  subscription OnCreateClosedAccount {
    onCreateClosedAccount {
      id
      dentistId
      closedAccount
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateClosedAccount = /* GraphQL */ `
  subscription OnUpdateClosedAccount {
    onUpdateClosedAccount {
      id
      dentistId
      closedAccount
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteClosedAccount = /* GraphQL */ `
  subscription OnDeleteClosedAccount {
    onDeleteClosedAccount {
      id
      dentistId
      closedAccount
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onCreateClosedSubscription = /* GraphQL */ `
  subscription OnCreateClosedSubscription {
    onCreateClosedSubscription {
      id
      dentistId
      closedSubscription
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateClosedSubscription = /* GraphQL */ `
  subscription OnUpdateClosedSubscription {
    onUpdateClosedSubscription {
      id
      dentistId
      closedSubscription
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteClosedSubscription = /* GraphQL */ `
  subscription OnDeleteClosedSubscription {
    onDeleteClosedSubscription {
      id
      dentistId
      closedSubscription
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
