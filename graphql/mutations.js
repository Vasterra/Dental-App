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
export const createServices = /* GraphQL */ `
  mutation CreateServices(
    $input: CreateServicesInput!
    $condition: ModelServicesConditionInput
  ) {
    createServices(input: $input, condition: $condition) {
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
export const updateServices = /* GraphQL */ `
  mutation UpdateServices(
    $input: UpdateServicesInput!
    $condition: ModelServicesConditionInput
  ) {
    updateServices(input: $input, condition: $condition) {
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
export const deleteServices = /* GraphQL */ `
  mutation DeleteServices(
    $input: DeleteServicesInput!
    $condition: ModelServicesConditionInput
  ) {
    deleteServices(input: $input, condition: $condition) {
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
export const createPractices = /* GraphQL */ `
  mutation CreatePractices(
    $input: CreatePracticesInput!
    $condition: ModelPracticesConditionInput
  ) {
    createPractices(input: $input, condition: $condition) {
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
export const updatePractices = /* GraphQL */ `
  mutation UpdatePractices(
    $input: UpdatePracticesInput!
    $condition: ModelPracticesConditionInput
  ) {
    updatePractices(input: $input, condition: $condition) {
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
export const deletePractices = /* GraphQL */ `
  mutation DeletePractices(
    $input: DeletePracticesInput!
    $condition: ModelPracticesConditionInput
  ) {
    deletePractices(input: $input, condition: $condition) {
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
