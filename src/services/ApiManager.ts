import { API, Auth, Hub, Storage } from 'aws-amplify';
import Router from 'next/router';
import { createClosedAccount, deleteDentist, updateAdminSettingsSubscriber, updateDentist } from '../graphql/mutations';
import {
  getAdminSettingsSubscriber,
  getDentist,
  listClosedAccounts,
  listClosedSubscriptions,
  listDentists,
  listImages,
  listServiceForDentals
} from '../graphql/queries';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql/lib-esm/types';

class ApiManager {

  public static async currentAuthenticatedUser() {
    return await Auth.currentAuthenticatedUser();
  }

  public static async authListener() {
    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signIn':
          return true;
        case 'signOut':
          return false;
      }
    });
  }

  public static async signOut() {
    try {
      await Auth.signOut();
      await Router.replace('/');
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  public static GET_LIST_IMAGES = async () => {
    try {
      const { data }: any = await API.graphql({
        query: listImages,
        authMode: <GRAPHQL_AUTH_MODE>'AWS_IAM'
      });
      return data.listImages.items;
    } catch (e) {
      console.log(e);
    }
  };

  public static GET_DENTIST = async (id: any) => {
    const { data }: any = await API.graphql({
      query: getDentist,
      variables: {
        id: id
      },
      authMode: <GRAPHQL_AUTH_MODE>'AWS_IAM'
    });
    return data.getDentist;
  };

  public static GET_LIST_DENTIST = async () => {
    const { data }: any = await API.graphql({
      query: listDentists,
      authMode: <GRAPHQL_AUTH_MODE>'AWS_IAM'
    });
    return data.listDentists.items;
  };

  public static GET_UPDATE_DENTISTS = async (dentist: { Username: any; }, gdcNumber: any) => {
    try {
      return await API.graphql({
        query: updateDentist,
        variables: {
          input: {
            id: dentist.Username,
            gdcNumber
          }
        },
        authMode: <GRAPHQL_AUTH_MODE>'AWS_IAM'
      });
    } catch (error) {
      console.log(error);
    }
  };

  public static GET_LIST_CLOSED_ACCOUNTS = async () => {
    const { data }: any = await API.graphql({
      query: listClosedAccounts,
      authMode: <GRAPHQL_AUTH_MODE>'AWS_IAM'
    });
    return data.listClosedAccounts.items;
  };

  public static GET_LIST_CLOSED_SUBSCRIPTIONS = async () => {
    const { data }: any = await API.graphql({
      query: listClosedSubscriptions,
      authMode: <GRAPHQL_AUTH_MODE>'AWS_IAM'
    });
    return data.listClosedSubscriptions.items;
  };

  // public static GET_ADMIN_ANALYTIC = async () => {
  //   const { data }: any = await API.graphql({
  //     query: getAdminAnalytics,
  //     variables: {
  //       id: '1'
  //     },
  //     authMode: <GRAPHQL_AUTH_MODE>'AWS_IAM'
  //   });
  //   return data.getAdminAnalytics;
  // };

  public static GET_ADMIN_SETTINGS_SUBSCRIBER = async () => {
    const { data }: any = await API.graphql({
      query: getAdminSettingsSubscriber,
      variables: {
        id: '1'
      },
      authMode: <GRAPHQL_AUTH_MODE>'AWS_IAM'
    });
    return data.getAdminSettingsSubscriber;
  };

  public static updateAdminSettingsSubscribers = async (data: any) => {
    const result = await API.graphql({
      query: updateAdminSettingsSubscriber,
      variables: {
        input: {
          id: '1',
          freeAppearVerified: data.freeAppearVerified,
          freeMaxLocations: data.freeMaxLocations,
          freeMaxServices: data.freeMaxServices,
          freePhoneNumber: data.freePhoneNumber,
          freeWebsiteAddress: data.freeWebsiteAddress,
          paidAppearVerified: data.paidAppearVerified,
          paidMaxLocations: data.paidMaxLocations,
          paidMaxServices: data.paidMaxServices,
          paidPhoneNumber: data.paidPhoneNumber,
          paidWebsiteAddress: data.paidWebsiteAddress
        }
      },
      authMode: <GRAPHQL_AUTH_MODE>'AWS_IAM'
    });
    return result;
  };

  public static async changePassword(oldPassword: any, newPassword: any) {
    await Auth.currentAuthenticatedUser()
    .then(user => {
      return Auth.changePassword(user, oldPassword, newPassword);
    })
    .then(data => console.log(data))
    .catch(err => console.log(err));
  }

  public static async downloadImages(currentDentist: any) {
    try {
      if (currentDentist === null) return;
      const files = await Storage.list('images/' + currentDentist.id + '/');
      let signedFiles = files.map((f: { key: string; }) => Storage.get(f.key));
      signedFiles = await Promise.all(signedFiles);
      let filesList = signedFiles.map((f: any) => {
        return {
          thumbnail: f,
          src: f,
          name: f,
          thumbnailWidth: 320,
          thumbnailHeight: 212,
          isSelected: false
        };
      });
      return filesList;
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }

  public static async downloadAvatar(currentDentist: any) {
    if (currentDentist === null) return;
    try {
      const files = await Storage.list('avatars/' + currentDentist.id + '/');
      let signedFiles = files.map((f: { key: string; }) => Storage.get(f.key));
      signedFiles = await Promise.all(signedFiles);
      return signedFiles[signedFiles.length - 1];
    } catch (error) {
      console.log('Error download Avatar file: ', error);
    }
  }

  public static CREATE_CLOSED_ACCOUNT = async (id: any) => {
    try {
      await API.graphql({
        query: createClosedAccount,
        variables: {
          input: {
            dentistId: id,
            closedAccount: 'closed'
          }
        },
        authMode: <GRAPHQL_AUTH_MODE>'AWS_IAM'
      });
    } catch (e) {
      console.log(e);
    }
  };

  public static DELETE_DENTIST = async (currentDentist: any) => {
    try {
      await API.graphql({
        query: deleteDentist,
        variables: {
          input: {
            id: currentDentist.id
          }
        },
        authMode: <GRAPHQL_AUTH_MODE>'AWS_IAM'
      });
    } catch (e) {
      console.log(e);
    }
  };

  public static getListServiceForDentals = async () => {
    const { data }: any = await API.graphql({
      query: listServiceForDentals,
      authMode: <GRAPHQL_AUTH_MODE>'AWS_IAM'
    });
    return data.listServiceForDentals.items;
  };

}

export default ApiManager;

