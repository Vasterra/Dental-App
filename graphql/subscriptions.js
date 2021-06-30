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
export const onCreatePractice = /* GraphQL */ `
  subscription OnCreatePractice {
    onCreatePractice {
      id
      dentistId
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdatePractice = /* GraphQL */ `
  subscription OnUpdatePractice {
    onUpdatePractice {
      id
      dentistId
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeletePractice = /* GraphQL */ `
  subscription OnDeletePractice {
    onDeletePractice {
      id
      dentistId
      name
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
