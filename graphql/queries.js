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
      practices {
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
        services {
          nextToken
        }
        practices {
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
export const getPractice = /* GraphQL */ `
  query GetPractice($id: ID!) {
    getPractice(id: $id) {
      id
      dentistId
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listPractices = /* GraphQL */ `
  query ListPractices(
    $filter: ModelPracticeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPractices(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
