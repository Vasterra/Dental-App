/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const processOrder = /* GraphQL */ `
  mutation ProcessOrder($input: ProcessOrderInput!) {
    processOrder(input: $input)
  }
`;
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
      dentistId
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
      dentistId
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
      dentistId
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
      dentistId
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
      dentistId
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createPlan = /* GraphQL */ `
  mutation CreatePlan(
    $input: CreatePlanInput!
    $condition: ModelPlanConditionInput
  ) {
    createPlan(input: $input, condition: $condition) {
      id
      title
      description
      image
      author
      featured
      price
      orders {
        items {
          id
          plan_id
          order_id
          createdAt
          updatedAt
          customer
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updatePlan = /* GraphQL */ `
  mutation UpdatePlan(
    $input: UpdatePlanInput!
    $condition: ModelPlanConditionInput
  ) {
    updatePlan(input: $input, condition: $condition) {
      id
      title
      description
      image
      author
      featured
      price
      orders {
        items {
          id
          plan_id
          order_id
          createdAt
          updatedAt
          customer
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deletePlan = /* GraphQL */ `
  mutation DeletePlan(
    $input: DeletePlanInput!
    $condition: ModelPlanConditionInput
  ) {
    deletePlan(input: $input, condition: $condition) {
      id
      title
      description
      image
      author
      featured
      price
      orders {
        items {
          id
          plan_id
          order_id
          createdAt
          updatedAt
          customer
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createPlanOrder = /* GraphQL */ `
  mutation CreatePlanOrder(
    $input: CreatePlanOrderInput!
    $condition: ModelPlanOrderConditionInput
  ) {
    createPlanOrder(input: $input, condition: $condition) {
      id
      plan_id
      order_id
      order {
        id
        dentist
        date
        total
        plans {
          nextToken
        }
        createdAt
        updatedAt
        customer
      }
      createdAt
      updatedAt
      plan {
        id
        title
        description
        image
        author
        featured
        price
        orders {
          nextToken
        }
        createdAt
        updatedAt
      }
      customer
    }
  }
`;
export const updatePlanOrder = /* GraphQL */ `
  mutation UpdatePlanOrder(
    $input: UpdatePlanOrderInput!
    $condition: ModelPlanOrderConditionInput
  ) {
    updatePlanOrder(input: $input, condition: $condition) {
      id
      plan_id
      order_id
      order {
        id
        dentist
        date
        total
        plans {
          nextToken
        }
        createdAt
        updatedAt
        customer
      }
      createdAt
      updatedAt
      plan {
        id
        title
        description
        image
        author
        featured
        price
        orders {
          nextToken
        }
        createdAt
        updatedAt
      }
      customer
    }
  }
`;
export const deletePlanOrder = /* GraphQL */ `
  mutation DeletePlanOrder(
    $input: DeletePlanOrderInput!
    $condition: ModelPlanOrderConditionInput
  ) {
    deletePlanOrder(input: $input, condition: $condition) {
      id
      plan_id
      order_id
      order {
        id
        dentist
        date
        total
        plans {
          nextToken
        }
        createdAt
        updatedAt
        customer
      }
      createdAt
      updatedAt
      plan {
        id
        title
        description
        image
        author
        featured
        price
        orders {
          nextToken
        }
        createdAt
        updatedAt
      }
      customer
    }
  }
`;
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
      id
      dentist
      date
      total
      plans {
        items {
          id
          plan_id
          order_id
          createdAt
          updatedAt
          customer
        }
        nextToken
      }
      createdAt
      updatedAt
      customer
    }
  }
`;
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
      id
      dentist
      date
      total
      plans {
        items {
          id
          plan_id
          order_id
          createdAt
          updatedAt
          customer
        }
        nextToken
      }
      createdAt
      updatedAt
      customer
    }
  }
`;
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
      id
      dentist
      date
      total
      plans {
        items {
          id
          plan_id
          order_id
          createdAt
          updatedAt
          customer
        }
        nextToken
      }
      createdAt
      updatedAt
      customer
    }
  }
`;
