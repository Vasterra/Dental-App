import { API, Auth, Hub, Storage } from 'aws-amplify';
import Router from 'next/router';
import {
  createClosedAccount,
  createClosedSubscription,
  deleteDentist,
  deleteService,
  updateDentist
} from '../graphql/mutations';
import {
  getAdminSettingsSubscriber,
  getDentist,
  listDentists,
  listImages,
  listServiceForDentals
} from '../graphql/queries';

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

  public static async signOut() {
    try {
      await Auth.signOut();
      await Router.push('/');
    } catch (error) {
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
    } catch (e) {
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
    } catch (e) {
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
    } catch (e) {
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
    } catch (e) {
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
    .then((data: any) => console.log(data))
    .catch((err: any) => console.log(err));
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

  public static async downloadCover(currentDentist: any) {
    if (currentDentist === null) return;
    try {
      const files = await Storage.list(`cover/${currentDentist.id}`);
      let signedFiles = files.map((f: { key: string; }) => Storage.get(f.key));
      signedFiles = await Promise.all(signedFiles);
      return signedFiles;
    } catch (error) {
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
}

export default ApiManager;

