import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const navigate = useNavigate();
  const [cartItem, setCartItem] = useState([])
  const isLogin = useSelector(state => state.authSlice.isLoggedIn)

  if(!isLogin){
    navigate('/login')
  }

  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  useEffect(() => {
    setCartItem(JSON.parse(sessionStorage.getItem('orderData')))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assuming you're using React Router for navigation
    navigate('/payment', {
      state: {
        shippingInfo: shippingInfo,
        cartItems: cartItem,
      },
    });
  };

  const calculateTotal = () => {
    return cartItem.reduce((total, item) => total + item.price * item.qty, 0).toFixed(2);
  };

  if(!cartItem) return navigate('/')

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Proceed to Checkout</h1>
      <div className="checkout-container flex flex-col md:flex-row justify-between mt-8">
        <div className="shipping-form md:w-1/2 md:pr-8 mb-8 md:mb-0">
          <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label className="mb-4">
              Name:
              <input
                type="text"
                name="name"
                value={shippingInfo.name}
                onChange={handleChange}
                required
                className="mt-2 p-2 border border-green-400 rounded-md w-full focus:outline-none"
              />
            </label>
            <label className="mb-4">
              Address:
              <input
                type="text"
                name="address"
                value={shippingInfo.address}
                onChange={handleChange}
                required
                className="mt-2 p-2 border border-green-400 rounded-md w-full focus:outline-none"
              />
            </label>
            <label className="mb-4">
              City:
              <input
                type="text"
                name="city"
                value={shippingInfo.city}
                onChange={handleChange}
                required
                className="mt-2 p-2 border border-green-400 rounded-md w-full focus:outline-none"
              />
            </label>
            <label className="mb-4">
              State:
              <input
                type="text"
                name="state"
                value={shippingInfo.state}
                onChange={handleChange}
                required
                className="mt-2 p-2 border border-green-400 rounded-md w-full focus:outline-none"
              />
            </label>
            <label className="mb-4">
              Zip Code:
              <input
                type="text"
                name="zip"
                value={shippingInfo.zip}
                onChange={handleChange}
                required
                className="mt-2 p-2 border border-green-400 rounded-md w-full focus:outline-none"
              />
            </label>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
            >
              Proceed to Payment
            </button>
          </form>
        </div>
        <div className="cart-summary md:w-1/2 border border-blue-400 p-4 rounded-md">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div>

          </div>
          {cartItem?.map((item) => (
            <div key={item.id} className="cart-item md:flex justify-between gap-5 mb-4">
              <p className=''>{item?.title} <i className='fa fa-times text-lg mx-3'></i> {item?.qty}</p>
              <p className='font-semibold'>${item?.disPrice? item.disPrice : item.price}</p>
            </div>
          ))}
          <div>
            <p className='md:flex justify-between gap-5'>Tax <span className='font-semibold'>$20</span></p>
          </div>
          <div className="total font-bold border-t border-gray-300 pt-4 mt-4">
            <p>Total: ${cartItem[0]?.disPrice? Number(cartItem[0].disPrice) + 20  : (Number(calculateTotal()) + 20).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
