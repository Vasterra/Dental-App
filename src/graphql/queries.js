/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDentist = /* GraphQL */ `
  query GetDentist($id: ID!) {
    getDentist(id: $id) {
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
export const listDentists = /* GraphQL */ `
  query ListDentists(
    $filter: ModelDentistFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDentists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          nextToken
        }
        locations {
          nextToken
        }
        images {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getService = /* GraphQL */ `
  query GetService($id: ID!) {
    getService(id: $id) {
      id
      dentistId
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listServices = /* GraphQL */ `
  query ListServices(
    $filter: ModelServiceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listServices(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getLocation = /* GraphQL */ `
  query GetLocation($id: ID!) {
    getLocation(id: $id) {
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
export const listLocations = /* GraphQL */ `
  query ListLocations(
    $filter: ModelLocationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLocations(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getServiceForDental = /* GraphQL */ `
  query GetServiceForDental($id: ID!) {
    getServiceForDental(id: $id) {
      id
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listServiceForDentals = /* GraphQL */ `
  query ListServiceForDentals(
    $filter: ModelServiceForDentalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listServiceForDentals(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getImage = /* GraphQL */ `
  query GetImage($id: ID!) {
    getImage(id: $id) {
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
export const listImages = /* GraphQL */ `
  query ListImages(
    $filter: ModelImageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listImages(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getAdminSettingsSubscriber = /* GraphQL */ `
  query GetAdminSettingsSubscriber($id: ID!) {
    getAdminSettingsSubscriber(id: $id) {
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
export const listAdminSettingsSubscribers = /* GraphQL */ `
  query ListAdminSettingsSubscribers(
    $filter: ModelAdminSettingsSubscriberFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAdminSettingsSubscribers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getAdminAnalytics = /* GraphQL */ `
  query GetAdminAnalytics($id: ID!) {
    getAdminAnalytics(id: $id) {
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
export const listAdminAnalyticss = /* GraphQL */ `
  query ListAdminAnalyticss(
    $filter: ModelAdminAnalyticsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAdminAnalyticss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getClosedAccount = /* GraphQL */ `
  query GetClosedAccount($id: ID!) {
    getClosedAccount(id: $id) {
      id
      closedAccount
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listClosedAccounts = /* GraphQL */ `
  query ListClosedAccounts(
    $filter: ModelclosedAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClosedAccounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        closedAccount
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getClosedSubscription = /* GraphQL */ `
  query GetClosedSubscription($id: ID!) {
    getClosedSubscription(id: $id) {
      id
      closedSubscription
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listClosedSubscriptions = /* GraphQL */ `
  query ListClosedSubscriptions(
    $filter: ModelclosedSubscriptionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClosedSubscriptions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        closedSubscription
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
