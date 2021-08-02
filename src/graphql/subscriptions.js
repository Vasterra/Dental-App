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
export const onCreateService = /* GraphQL */ `
  subscription OnCreateService {
    onCreateService {
      id
      dentistId
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateService = /* GraphQL */ `
  subscription OnUpdateService {
    onUpdateService {
      id
      dentistId
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteService = /* GraphQL */ `
  subscription OnDeleteService {
    onDeleteService {
      id
      dentistId
      name
      createdAt
      updatedAt
      owner
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
      createdAt
      updatedAt
      owner
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
      createdAt
      updatedAt
      owner
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
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateServiceForDental = /* GraphQL */ `
  subscription OnCreateServiceForDental {
    onCreateServiceForDental {
      id
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateServiceForDental = /* GraphQL */ `
  subscription OnUpdateServiceForDental {
    onUpdateServiceForDental {
      id
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteServiceForDental = /* GraphQL */ `
  subscription OnDeleteServiceForDental {
    onDeleteServiceForDental {
      id
      name
      createdAt
      updatedAt
      owner
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
      createdAt
      updatedAt
      owner
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
      createdAt
      updatedAt
      owner
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
      createdAt
      updatedAt
      owner
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
      createdAt
      updatedAt
      owner
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
      createdAt
      updatedAt
      owner
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
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateAdminAnalytics = /* GraphQL */ `
  subscription OnCreateAdminAnalytics {
    onCreateAdminAnalytics {
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
export const onUpdateAdminAnalytics = /* GraphQL */ `
  subscription OnUpdateAdminAnalytics {
    onUpdateAdminAnalytics {
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
export const onDeleteAdminAnalytics = /* GraphQL */ `
  subscription OnDeleteAdminAnalytics {
    onDeleteAdminAnalytics {
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
export const onCreateClosedAccount = /* GraphQL */ `
  subscription OnCreateClosedAccount {
    onCreateClosedAccount {
      id
      dentistId
      closedAccount
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateClosedAccount = /* GraphQL */ `
  subscription OnUpdateClosedAccount {
    onUpdateClosedAccount {
      id
      dentistId
      closedAccount
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteClosedAccount = /* GraphQL */ `
  subscription OnDeleteClosedAccount {
    onDeleteClosedAccount {
      id
      dentistId
      closedAccount
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateClosedSubscription = /* GraphQL */ `
  subscription OnCreateClosedSubscription {
    onCreateClosedSubscription {
      id
      dentistId
      closedSubscription
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateClosedSubscription = /* GraphQL */ `
  subscription OnUpdateClosedSubscription {
    onUpdateClosedSubscription {
      id
      dentistId
      closedSubscription
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteClosedSubscription = /* GraphQL */ `
  subscription OnDeleteClosedSubscription {
    onDeleteClosedSubscription {
      id
      dentistId
      closedSubscription
      createdAt
      updatedAt
      owner
    }
  }
`;
