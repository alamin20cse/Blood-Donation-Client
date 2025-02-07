import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
    const { user } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [transctionId, setTransctionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const fetchClientSecret = async (price) => {
        if (!price || isNaN(price) || price <= 0 || price > 999999.99) {
            setError("Please enter a valid amount between 1 and 999999.99.");
            return;
        }
        try {
            const res = await axios.post("https://blood-donation-server-pied.vercel.app/create-payment-intent", { price });
            // console.log("Client Secret received:", res.data.clientSecret);
            setClientSecret(res.data.clientSecret);
            setError("");
        } catch (err) {
            console.error("Error fetching client secret:", err);
            setError("Failed to connect to payment server.");
        }
    };

    const handlePriceChange = (event) => {
        const price = parseFloat(event.target.value);
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
                // console.log("Payment confirmation error:", confirmError);
                setError(confirmError.message);
            } else {
                // console.log("Payment successful:", paymentIntent);
                setError("");
                if (paymentIntent.status === 'succeeded') {
                    // console.log('Transaction ID:', paymentIntent.id);
                    setTransctionId(paymentIntent.id);

                    // Save to database
                    const payment = {
                        email: user?.email,
                        name: user?.displayName,
                        photo: user?.photoURL,
                        price: totalPrice,
                        transctionId: paymentIntent.id,
                        date: new Date(),
                        status: 'pending'
                    };
                    const res = await axios.post(`https://blood-donation-server-pied.vercel.app/payments`, payment);
                    // console.log(res.data.insertedId);
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Thank you for your donation!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/funding');
                    }
                }
            }
        } catch (err) {
            console.error("Error in payment:", err);
            setError("Payment failed. Please try again.");
        }

        setIsProcessing(false);
    };

    return (
        <div>
            <h1>Amount between 1 and 999999.99</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Taka</span>
                    </label>
                    <input
                        type="number"
                        name="taka"
                        placeholder="EX: 10 tk"
                        className="input input-bordered"
                        value={totalPrice}
                        onChange={handlePriceChange}
                        required
                        min="1"
                        max="999999.99"
                        step="0.01"
                    />
                </div>
                <div className="my-5">
                    {/* Optional additional styling or content */}
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
