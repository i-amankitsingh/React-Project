import React, {useState, useEffect} from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ shippingInfo, cartItems }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errMsg, setErrMsg] = useState('')

  let pr;
  useEffect(() => {
    if (stripe) {
        pr = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Total',
          amount: 1000, // amount in cents, $10.00
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr);
        }
      });
    }
  }, [stripe]);

  const handleGooglePay = () => {
    const googlePayMethod = {
      type: 'payment',
      paymentRequest: pr,
    };

    stripe.confirmPayment({
      payment_method: googlePayMethod,
      confirmParams: {
        return_url: window.location.href,
      },
    }).then((result) => {
      if (result.error) {
        console.error('[error]', result.error);
        setErrMsg(result.error)
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
      setErrMsg(error)
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      handlePayment(paymentMethod);
      alert("Your order is placed!")
    }
  };

  const calculateTotal = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement className="p-2 border border-green-400 rounded-md" />
        <button type="submit" disabled={!stripe} className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600 mt-4 px-3">
          Pay with Card
        </button>
      </form>
      
      {pr && (
        <button onClick={handleGooglePay} className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 mt-4">
          Pay with Google Pay
        </button>
      )}
        <span className='my-3 text-lg text-red-500 block'>{errMsg.type} :- {errMsg.message}</span>
    </div>
  );
};


export default CheckoutForm;
