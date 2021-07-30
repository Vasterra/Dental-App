import {API, Auth, Hub, Storage} from "aws-amplify";
import Router from "next/router";
import {createAdminSettingsSubscriber, deleteDentist, updateAdminSettingsSubscriber, updateDentist} from "../graphql/mutations";
import {getAdminAnalytics, getAdminSettingsSubscriber, getDentist,
  listAdminAnalyticss, listAdminSettingsSubscribers, listDentists, listServiceForDentals} from "../graphql/queries";
import {IStripeCustomer} from "../interfaces/IStripeCustomer";
import {IStripeSubscription} from "../interfaces/IStripeSubscription";

class ApiManager {

  public static async currentAuthenticatedUser() {
    return await Auth.currentAuthenticatedUser();
  }

  public static async authListener() {
    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signIn':
          return true
        case 'signOut':
          return false
      }
    })
  }

  public static async signOut() {
    try {
      await Auth.signOut();
      await Router.replace('/')
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  public static getDentist = async (id: any) => {
    if (id === null) return
    const {data}: any = await API.graphql({
      query: getDentist,
      variables: {
        id: id
      },
      // @ts-ignore
      authMode: 'AWS_IAM'
    });
    return data.getDentist
  }

  public static getListDentists = async () => {
    const {data}: any = await API.graphql({
      query: listDentists,
      // @ts-ignore
      authMode: 'AWS_IAM'
    });
    return data.listDentists.items
  }

  public static GET_ADMIN_ANALYTIC = async () => {
    const {data}: any = await API.graphql({
      query: getAdminAnalytics,
      variables: {
        id: '1'
      },
      // @ts-ignore
      authMode: 'AWS_IAM'
    });
    console.log(data)
    return data.getAdminAnalytics
  }

  public static GET_ADMIN_SETTINGS_SUBSCRIBER = async () => {
    const {data}: any = await API.graphql({
      query: getAdminSettingsSubscriber,
      variables: {
        id: '1'
      },
      // @ts-ignore
      authMode: 'AWS_IAM'
    });
    console.log(data)
    return data.getAdminSettingsSubscriber
  }

  public static createAdminSettingsSubscribers = async (data: any) => {
    const result = await API.graphql({
      query: createAdminSettingsSubscriber,
      variables: {
        input: {
          data
        }
      },
      // @ts-ignore
      authMode: 'AWS_IAM'
    })
    return result;
  }

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
      // @ts-ignore
      authMode: 'AWS_IAM'
    })
    return result;
  }

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
      if (currentDentist === null) return
      const files = await Storage.list('images/' + currentDentist.id + '/')
      let signedFiles = files.map((f: { key: string; }) => Storage.get(f.key))
      signedFiles = await Promise.all(signedFiles)
      let filesList = signedFiles.map((f: any) => {
        return {
          thumbnail: f,
          src: f,
          name: f,
          thumbnailWidth: 320,
          thumbnailHeight: 212,
          isSelected: false
        }
      })
      return filesList
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }

  public static async downloadAvatar(currentDentist: any) {
    if (currentDentist === null) return
    try {
      const files = await Storage.list('avatars/' + currentDentist.id + '/');
      let signedFiles = files.map((f: { key: string; }) => Storage.get(f.key));
      signedFiles = await Promise.all(signedFiles);
      return signedFiles[signedFiles.length - 1];
    } catch (error) {
      console.log('Error download Avatar file: ', error);
    }
  }

  public static async deleteDentist(currentDentist: any) {
    if (currentDentist === null) return
    await API.graphql({
      query: deleteDentist,
      variables: {
        input: {
          id: currentDentist.id,
        }
      },
      // @ts-ignore
      authMode: 'AWS_IAM'
    })
  }


  public static getListServiceForDentals = async () => {
    const {data}: any = await API.graphql({
      query: listServiceForDentals,
      // @ts-ignore
      authMode: 'AWS_IAM'
    })
    return data.listServiceForDentals.items
  }

}

export default ApiManager;

