import { API, Auth, Hub, Storage } from 'aws-amplify';
import Router from 'next/router';
import {
  createClosedAccount,
  createClosedSubscription, createWatermark,
  deleteDentist,
  deleteService,
  updateDentist
} from '../graphql/mutations';
import {
  getAdminSettingsSubscriber,
  getDentist,
  getPremiumInformation,
  listDentists,
  listImages, listPremiumFeatures,
  listServiceForDentals
} from '../graphql/queries';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql';

class ApiManager {

  public static async currentAuthenticatedUser() {
    return await Auth.currentAuthenticatedUser();
  }

  public static async authListener() {
    Hub.listen('auth', (data: { payload: { event: any; }; }) => {
      switch (data.payload.event) {
        case 'signIn':
          return true;
        case 'signOut':
          return false;
      }
    });
  }

  public static async SIGN_OUT() {
    try {
      await Auth.signOut();
      console.log('logouted')
      await Router.push('/login');
    } catch (error: any) {
      console.log('error signing out: ', error);
    }
  }

  public static async signOut() {
    try {
      await Auth.signOut();
      await Router.push('/');
    } catch (error: any) {
      console.log('error signing out: ', error);
    }
  }

  public static CREATE_CLOSED_ACCOUNT = async (id: any) => {
    try {
      const { data }: any = await API.graphql({
        query: createClosedAccount,
        variables: {
          input: {
            dentistId: id,
            closedAccount: 'closed'
          }
        },
        // @ts-ignore
        authMode: 'AWS_IAM'
      });
      return data;
    } catch (e: any) {
      console.log(e);
    }
  };

  public static GET_ADMIN_SETTINGS_SUBSCRIBER = async () => {
    try {
      const {data}: any = await API.graphql({
        query: getAdminSettingsSubscriber,
        variables: {
          id: '1'
        },
        // @ts-ignore
        authMode: 'AWS_IAM'
      });
      return data.getAdminSettingsSubscriber
    } catch (e: any) {
      console.log(e);
    }
  }

  public static UPDATE_DENTIST = async (dataDentist: any) => {
    try {
      const { data }: any = await API.graphql({
        query: updateDentist,
        variables: {
          input: dataDentist
        },
        // @ts-ignore
        authMode: 'AWS_IAM'
      });
      return data;
    } catch (e: any) {
      console.log(e);
    }
  };

  public static CREATE_CLOSED_SUBSCRIPTION = async (id: any) => {
    try {
      const { data }: any = await API.graphql({
        query: createClosedSubscription,
        variables: {
          input: {
            dentistId: id,
            closedSubscription: 'closed'
          }
        },
        // @ts-ignore
        authMode: 'AWS_IAM'
      });
      console.log(data);
      return data;
    } catch (e: any) {
      console.log(e);
    }
  };

  public static GET_DENTIST = async (id: any) => {
    try {
      if (id === null) return;
      return await API.graphql({
        query: getDentist,
        variables: {
          id: id
        },
        authMode: <GRAPHQL_AUTH_MODE>'AWS_IAM'
      });
    } catch (e: any) {
      console.log(e);
    }
  };

  public static getDentist = async (id: any) => {
    try {
      if (id === null) return;
      const { data }: any = await API.graphql({
        query: getDentist,
        variables: {
          id: id
        },
        // @ts-ignore
        authMode: 'AWS_IAM'
      });
      return data.getDentist;
    } catch (e) {
      console.log(e);
    }
  };

  public static getListDentists = async () => {
    const { data }: any = await API.graphql({
      query: listDentists,
      // @ts-ignore
      authMode: 'AWS_IAM'
    });
    return data.listDentists.items;
  };

  public static async changePassword(oldPassword: any, newPassword: any) {
    await Auth.currentAuthenticatedUser()
    .then((user: any) => {
      return Auth.changePassword(user, oldPassword, newPassword);
    })
    .catch((err: any) => err);
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
    } catch (error: any) {
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
    } catch (error: any) {
      console.log('Error download Avatar file: ', error);
    }
  }

  public static async downloadCover(currentDentist: any) {
    if (currentDentist === null) return;
    try {
      const files = await Storage.list(`cover/${currentDentist.id}`);
      let signedFiles = files.map((f: { key: string; }) => Storage.get(f.key));
      signedFiles = await Promise.all(signedFiles);
      return signedFiles;
    } catch (error: any) {
      console.log('Error download Avatar file: ', error);
    }
  }

  public static async downloadWatermark(currentDentist: any) {
    if (currentDentist === null) return;
    try {
      const files = await Storage.list(`watermark/${currentDentist.id}`);
      let signedFiles = files.map((f: { key: string; }) => Storage.get(f.key));
      signedFiles = await Promise.all(signedFiles);
      return signedFiles;
    } catch (error: any) {
      console.log('Error download Avatar file: ', error);
    }
  }

  public static async deleteDentist(currentDentist: any) {
    try {
      if (currentDentist === null) return;
      await API.graphql({
        query: deleteDentist,
        variables: {
          input: {
            id: currentDentist.id
          }
        },
        // @ts-ignore
        authMode: 'AWS_IAM'
      });
    } catch (e) {
      console.log(e);
    }
  }

  public static async CREATE_WATERMARK(watermark: any, dentist: any) {
    try {
      if (watermark === null) return;
      await API.graphql({
        query: createWatermark,
        variables: {
          input: {
            dentistId: dentist.id,
            lastModifiedDate: watermark.lastModifiedDate,
            name: watermark.name,
            size: watermark.size,
            type: watermark.type
          }
        },
        // @ts-ignore
        authMode: 'AWS_IAM'
      });
    } catch (e) {
      console.log(e);
    }
  }

  public static async deleteServiceDentist(currentDentist: any, deleteService: any) {
    try {
      if (currentDentist === null) return;
      await API.graphql({
        query: deleteService,
        variables: {
          input: {
            dentistId: currentDentist.id,
            name: deleteService
          }
        },
        // @ts-ignore
        authMode: 'AWS_IAM'
      });
    } catch (e) {
      console.log(e);
    }
  }

  public static GET_LIST_FOR_DENTAL = async () => {
    try {
      return await API.graphql({
        query: listServiceForDentals,
        // @ts-ignore
        authMode: 'AWS_IAM'
      });
    } catch (e) {
      console.log(e);
    }
  };

  public static getListServiceForDentals = async () => {
    try {
      const { data }: any = await API.graphql({
        query: listServiceForDentals,
        // @ts-ignore
        authMode: 'AWS_IAM'
      });
      return data.listServiceForDentals.items;
    } catch (e) {
      console.log(e);
    }
  };

  public static getListImages = async () => {
    try {
      const { data }: any = await API.graphql({
        query: listImages,
        // @ts-ignore
        authMode: 'AWS_IAM'
      });
      return data.listImages.items;
    } catch (e) {
      console.log(e);
    }
  };

  // PREMIUM_FEATURES

  public static GET_LIST_PREMIUM_FEATURES = async () => {
    try {
      const { data }: any = await API.graphql({
        query: listPremiumFeatures,
        authMode: <GRAPHQL_AUTH_MODE>'AWS_IAM'
      });
      console.log(data);
      return data.listPremiumFeatures.items;
    } catch (e: any) {
      console.log(e);
    }
  };

  // PREMIUM_INFORMATION

  public static GET_PREMIUM_INFORMATION = async () => {
    try {
      const {data}: any = await API.graphql({
        query: getPremiumInformation,
        variables: {
          id: '1'
        },
        authMode: <GRAPHQL_AUTH_MODE>'AWS_IAM'
      });
      return data.getPremiumInformation;
    } catch (e: any) {
      console.log(e);
    }
  };

}

export default ApiManager;

