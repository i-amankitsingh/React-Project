import React from 'react';
import { CardElement, useStripe, useElements, usePaymentRequest } from '@stripe/react-stripe-js';

const CheckoutForm = ({ shippingInfo, cartItems }) => {
  const stripe = useStripe();
  const elements = useElements();

  // Initialize Google Pay
  const paymentRequest = usePaymentRequest({
    country: 'US',
    currency: 'usd',
    total: {
      label: 'Total Amount',
      amount: {
        currency: 'usd',
        value: calculateTotal(cartItems), // Replace with actual amount in cents
      },
    },
    requestPayerName: true,
    requestPayerEmail: true,
  });

  const handleGooglePay = () => {
    const googlePayMethod = {
      type: 'payment',
      paymentRequest: paymentRequest,
    };

    stripe.confirmPaymentIntent({
      payment_method: googlePayMethod,
      confirmParams: {
        return_url: window.location.href,
      },
    }).then((result) => {
      if (result.error) {
        console.error('[error]', result.error);
      } else {
        console.log('[PaymentMethod]', result.paymentMethod);
        handlePayment(result.paymentMethod);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      handlePayment(paymentMethod);
    }
  };

  const calculateTotal = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement className="p-2 border border-green-400 rounded-md" />
        <button type="submit" disabled={!stripe} className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600 mt-4">
          Pay with Card
        </button>
      </form>
      
      {paymentRequest && (
        <button onClick={handleGooglePay} className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 mt-4">
          Pay with Google Pay
        </button>
      )}
    </div>
  );
};

export default CheckoutForm;
