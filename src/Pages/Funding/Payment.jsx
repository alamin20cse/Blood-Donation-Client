import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";


// To Do
const stripePromise=loadStripe(import.meta.env.VITE_Payment_Gateway_PK)

const Payment = () => {
    return (
        <div>
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