import React, {Component} from "react";
import {withRouter} from "next/router";
import {AmplifyAuthenticator} from "@aws-amplify/ui-react";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "../../../components/Stripe/CheckoutForm";
import {loadStripe} from "@stripe/stripe-js";
import {API} from "aws-amplify";
import {getDentist} from "../../../graphql/queries";

class Subscription extends Component {
  state: any = {
    dentist: null,
  }

  componentDidMount() {
    this.getDentist()
  }

  async getDentist() {
    const {router}: any = this.props

    const {data}: any = await API.graphql({
      query: getDentist,
      variables: {
        id: router.query.slug[0]
      },
      // @ts-ignore
      authMode: 'AWS_IAM'
    });
    this.setState({dentist: data.getDentist})
  }

  render() {
    const stripePromise = loadStripe('pk_test_51ISNerEE2uETn4H3tqYplaINZlDwEa8CM7ohtp7YbxF7KJnUysRK8rjssQxSbruzaL6uJz4951GhHoZcHM3qWcLN00drEQTQ5M');
    return (
      <section className="checkout-wrapper">
        <AmplifyAuthenticator>
          <Elements stripe={stripePromise}>
            <section>
              {this.state.dentist &&  <CheckoutForm />}
              {!this.state.dentist && <>Dentist not found</>}
            </section>
          </Elements>
        </AmplifyAuthenticator>
      </section>
    )
  }
}

// @ts-ignore
export default withRouter(Subscription);
