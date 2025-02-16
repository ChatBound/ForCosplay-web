import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { payment } from "../../api/stripe";
import useEcomStore from "../../store/ecom-store";
import CheckoutForm from "../../component/CheckoutForm";

const stripePromise = loadStripe("pk_test_51QsiBiBUKUyJ5uyoaXM1E32wgZS2JKEdUq5UMwmgDzo92RYCYWSmH9fJoBXjUFbcPNQy4jLjpSvGF4IRaD30pv5400HuoX5GYL");

const Payment = () => {
    const token = useEcomStore((state) => state.token);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        payment(token)
          .then((res) => {
            console.log(res);
            setClientSecret(res.data.clientSecret);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

      const appearance = {
        theme: "stripe",
      };
      // Enable the skeleton loader UI for optimal loading.
      const loader = "auto";

  return (
    <div> 
         {clientSecret && (
        <Elements
          options={{ clientSecret, appearance, loader }}
          stripe={stripePromise}
        >
         <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}

export default Payment
