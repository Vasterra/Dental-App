import {API, Auth, Hub} from "aws-amplify";
import Router from "next/router";
import { updateDentist } from "../graphql/mutations";
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

}

export default ApiManager;

