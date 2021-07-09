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
      city
      street
      postIndex
      email
      lat
      lng
      registered
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
        city
        street
        postIndex
        email
        lat
        lng
        registered
        customerID
        paymentMethodID
        subscriptionID
        hasPaidPlan
        services {
          nextToken
        }
        locations {
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
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
