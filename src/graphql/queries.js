/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncDentists = /* GraphQL */ `
  query SyncDentists(
    $filter: ModelDentistFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncDentists(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
          nextToken
          startedAt
        }
        locations {
          nextToken
          startedAt
        }
        images {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
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
          nextToken
          startedAt
        }
        locations {
          nextToken
          startedAt
        }
        images {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncServices = /* GraphQL */ `
  query SyncServices(
    $filter: ModelServiceFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncServices(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
  }
`;
export const getService = /* GraphQL */ `
  query GetService($id: ID!) {
    getService(id: $id) {
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncLocations = /* GraphQL */ `
  query SyncLocations(
    $filter: ModelLocationFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncLocations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncServiceForDentals = /* GraphQL */ `
  query SyncServiceForDentals(
    $filter: ModelServiceForDentalFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncServiceForDentals(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
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
  }
`;
export const getServiceForDental = /* GraphQL */ `
  query GetServiceForDental($id: ID!) {
    getServiceForDental(id: $id) {
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncPremiumFeatures = /* GraphQL */ `
  query SyncPremiumFeatures(
    $filter: ModelPremiumFeatureFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPremiumFeatures(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
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
  }
`;
export const getPremiumFeature = /* GraphQL */ `
  query GetPremiumFeature($id: ID!) {
    getPremiumFeature(id: $id) {
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
export const listPremiumFeatures = /* GraphQL */ `
  query ListPremiumFeatures(
    $filter: ModelPremiumFeatureFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPremiumFeatures(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
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
  }
`;
export const syncWatermarks = /* GraphQL */ `
  query SyncWatermarks(
    $filter: ModelWatermarkFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncWatermarks(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getWatermark = /* GraphQL */ `
  query GetWatermark($id: ID!) {
    getWatermark(id: $id) {
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
export const listWatermarks = /* GraphQL */ `
  query ListWatermarks(
    $filter: ModelWatermarkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWatermarks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncPremiumInformations = /* GraphQL */ `
  query SyncPremiumInformations(
    $filter: ModelPremiumInformationFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPremiumInformations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        price
        termsAndConditions
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getPremiumInformation = /* GraphQL */ `
  query GetPremiumInformation($id: ID!) {
    getPremiumInformation(id: $id) {
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
export const listPremiumInformations = /* GraphQL */ `
  query ListPremiumInformations(
    $filter: ModelPremiumInformationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPremiumInformations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        price
        termsAndConditions
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncImages = /* GraphQL */ `
  query SyncImages(
    $filter: ModelImageFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncImages(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncAdminSettingsSubscribers = /* GraphQL */ `
  query SyncAdminSettingsSubscribers(
    $filter: ModelAdminSettingsSubscriberFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAdminSettingsSubscribers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncClosedAccounts = /* GraphQL */ `
  query SyncClosedAccounts(
    $filter: ModelclosedAccountFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncClosedAccounts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        dentistId
        closedAccount
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getClosedAccount = /* GraphQL */ `
  query GetClosedAccount($id: ID!) {
    getClosedAccount(id: $id) {
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
export const listClosedAccounts = /* GraphQL */ `
  query ListClosedAccounts(
    $filter: ModelclosedAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClosedAccounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        dentistId
        closedAccount
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncClosedSubscriptions = /* GraphQL */ `
  query SyncClosedSubscriptions(
    $filter: ModelclosedSubscriptionFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncClosedSubscriptions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        dentistId
        closedSubscription
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getClosedSubscription = /* GraphQL */ `
  query GetClosedSubscription($id: ID!) {
    getClosedSubscription(id: $id) {
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
        dentistId
        closedSubscription
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
