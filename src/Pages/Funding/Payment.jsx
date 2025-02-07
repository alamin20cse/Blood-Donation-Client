import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";


// To Do
const stripePromise=loadStripe(import.meta.env.VITE_Payment_Gateway_PK)

const Payment = () => {
 
    return (
        <div>
               <Helmet>
      <title>Blood Donation Application | Payment</title>
  </Helmet>
            <h1>Payment page</h1>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>

                </Elements>
            </div>
            
        </div>
    );
};

export default Payment;