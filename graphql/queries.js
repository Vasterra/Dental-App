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
      createAt
      updatedAt
      services {
        items {
          id
          name
          updatedAt
          createdAt
          owner
        }
        nextToken
      }
      practices {
        items {
          id
          name
          updatedAt
          createdAt
          owner
        }
        nextToken
      }
      createdAt
      owner
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
        createAt
        updatedAt
        services {
          nextToken
        }
        practices {
          nextToken
        }
        createdAt
        owner
      }
      nextToken
    }
  }
`;
export const getServices = /* GraphQL */ `
  query GetServices($id: ID!) {
    getServices(id: $id) {
      id
      name
      updatedAt
      dentists {
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
        createAt
        updatedAt
        services {
          nextToken
        }
        practices {
          nextToken
        }
        createdAt
        owner
      }
      createdAt
      owner
    }
  }
`;
export const listServicess = /* GraphQL */ `
  query ListServicess(
    $filter: ModelServicesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listServicess(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        updatedAt
        dentists {
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
          createAt
          updatedAt
          createdAt
          owner
        }
        createdAt
        owner
      }
      nextToken
    }
  }
`;
export const getPractices = /* GraphQL */ `
  query GetPractices($id: ID!) {
    getPractices(id: $id) {
      id
      name
      updatedAt
      dentists {
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
        createAt
        updatedAt
        services {
          nextToken
        }
        practices {
          nextToken
        }
        createdAt
        owner
      }
      createdAt
      owner
    }
  }
`;
export const listPracticess = /* GraphQL */ `
  query ListPracticess(
    $filter: ModelPracticesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPracticess(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        updatedAt
        dentists {
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
          createAt
          updatedAt
          createdAt
          owner
        }
        createdAt
        owner
      }
      nextToken
    }
  }
`;
