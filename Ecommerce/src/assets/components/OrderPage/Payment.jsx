import React from 'react';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51PQwcdRtUrGJUuNbb8pcncgdLS75FSMaE6FMF7oRDFfpX5ZNRGYdQQLI8Ow7Nsm1lMXmNmb5aPFsKTFkqfFpy76400LeMrhQAk');

const Payment = () => {
  const location = useLocation();
  const { shippingInfo, cartItems } = location.state;

  return (
    <div className="p-4 border-t border-gray-300 mt-8">
      <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm shippingInfo={shippingInfo} cartItems={cartItems} />
      </Elements>
    </div>
  );
};

export default Payment;




