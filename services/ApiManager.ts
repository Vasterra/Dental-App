import {API, Auth, Hub} from "aws-amplify";
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

}

export default ApiManager;

