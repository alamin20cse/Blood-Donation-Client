import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
    const { user } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [isProcessing, setIsProcessing] = useState(false); // Prevents multiple submissions
    const [transctionId,setTransctionId]=useState('')
    const stripe = useStripe();
    const elements = useElements();
    const navigate=useNavigate();

    const fetchClientSecret = async (price) => {
        if (!price || isNaN(price)) {
            setError("Invalid amount entered.");
            return;
        }
        try {
            const res = await axios.post("http://localhost:5000/create-payment-intent", { price });
            console.log("Client Secret received:", res.data.clientSecret);
            setClientSecret(res.data.clientSecret);
            setError("");
        } catch (err) {
            console.error("Error fetching client secret:", err);
            setError("Failed to connect to payment server.");
        }
    };

    const handlePriceChange = (event) => {
        const price = event.target.value;
        setTotalPrice(price);
        fetchClientSecret(price);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements || !clientSecret) {
            setError("Stripe not initialized or missing client secret.");
            return;
        }

        setIsProcessing(true);

        const card = elements.getElement(CardElement);
        if (!card) {
            setError("Card information is required.");
            setIsProcessing(false);
            return;
        }

        try {
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        email: user?.email || "anonymous",
                        name: user?.displayName || "anonymous",
                    },
                },
            });

            if (confirmError) {
                console.log("Payment confirmation error:", confirmError);
                setError(confirmError.message);
            } else {
                console.log("Payment successful:", paymentIntent);
                setError("");
                if(paymentIntent.status==='succeeded')
                {
                    console.log('transicotnonn id',paymentIntent.id)
                    setTransctionId(paymentIntent.id)


                    // save to database
                    const payment={
                        email:user?.email,
                        name:user?.displayName,
                        photo:user?.photoURL,
                        price: totalPrice,
                        transctionId: paymentIntent.id,
                        date: new Date(), //utc date convert
                        status:'pending'

                    }
                const res=await    axios.post(`http://localhost:5000/payments`,payment)
                console.log(res.data.insertedId)
                if(res.data.insertedId)
                {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thank you for the taka paisa",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/funding')
                }

                }
               
                
                // alert("Payment Successful!");
                
            }
        } catch (err) {
            console.error("Error in payment:", err);
            setError("Payment failed. Please try again.");

        }

        setIsProcessing(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Taka</span>
                    </label>
                    <input
                        type="text"
                        name="taka"
                        placeholder="EX: 10 tk"
                        className="input input-bordered"
                        value={totalPrice}
                        onChange={handlePriceChange}
                        required
                    />
                </div>
                <div className="my-5">

                </div>

                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#424770",
                                "::placeholder": { color: "#aab7c4" },
                            },
                            invalid: { color: "#9e2146" },
                        },
                    }}
                />

                <button
                    className="btn btn-primary my-5"
                    type="submit"
                    disabled={!stripe || !clientSecret || isProcessing}
                >
                    {isProcessing ? "Processing..." : "Pay"}
                </button>

                {error && <p className="text-red-600">{error}</p>}
            </form>
        </div>
    );
};

export default CheckoutForm;

//6 11