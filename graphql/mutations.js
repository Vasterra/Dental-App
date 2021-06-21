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
      sub
      createAt
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
      city
      street
      postIndex
      email
      lat
      lng
      registered
      sub
      createAt
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
      city
      street
      postIndex
      email
      lat
      lng
      registered
      sub
      createAt
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
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createPractice = /* GraphQL */ `
  mutation CreatePractice(
    $input: CreatePracticeInput!
    $condition: ModelPracticeConditionInput
  ) {
    createPractice(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updatePractice = /* GraphQL */ `
  mutation UpdatePractice(
    $input: UpdatePracticeInput!
    $condition: ModelPracticeConditionInput
  ) {
    updatePractice(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deletePractice = /* GraphQL */ `
  mutation DeletePractice(
    $input: DeletePracticeInput!
    $condition: ModelPracticeConditionInput
  ) {
    deletePractice(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
