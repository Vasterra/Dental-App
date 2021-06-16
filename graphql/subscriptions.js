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
export const onCreateServices = /* GraphQL */ `
  subscription OnCreateServices {
    onCreateServices {
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
export const onUpdateServices = /* GraphQL */ `
  subscription OnUpdateServices {
    onUpdateServices {
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
export const onDeleteServices = /* GraphQL */ `
  subscription OnDeleteServices {
    onDeleteServices {
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
export const onCreatePractices = /* GraphQL */ `
  subscription OnCreatePractices {
    onCreatePractices {
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
export const onUpdatePractices = /* GraphQL */ `
  subscription OnUpdatePractices {
    onUpdatePractices {
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
export const onDeletePractices = /* GraphQL */ `
  subscription OnDeletePractices {
    onDeletePractices {
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
