import {API, Auth, Hub, Storage} from "aws-amplify";
import Router from "next/router";
import { updateDentist } from "../graphql/mutations";
import { getDentist } from "../graphql/queries";
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

  public static async getDentist(id: any) {
    if (id === null) return
    const {data}: any = await API.graphql({
      query: getDentist,
      variables: {
        id: id
      },
      // @ts-ignore
      authMode: 'AWS_IAM'
    });
    return data
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

}

export default ApiManager;

