import React, { useState, useEffect } from 'react';
import { fetchProduct } from './Cart';
import Loader from "../../Loader"
import { useNavigate } from 'react-router-dom';

const Sales = () => {

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigator = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
    const fetchData = async () => {
      const data = await fetchProduct()
      const newData = data.map((product) => ({ ...product, saleDis: Math.random() < 0.5 ? 10 : 20 }))
      setProducts(newData)
      setIsLoading(false)
    }
    fetchData()

  }, [])

  const handleOrder = (product) => {
    product.qty = 1;
    product.disPrice = (product.price - (product.saleDis / 100 * product.price)).toFixed(2)
    sessionStorage.setItem('orderData', JSON.stringify([product]))
    navigator('/order')
  }


  return (
    <>
      {
        isLoading && <Loader loadingText='Data is fetching...' toggle={false} cls='top-0' />
      }
      <div className="font-sans text-black">
        <div className="bg-green-400 text-white text-center py-20">
          <h1 className="text-5xl font-bold mb-4">Sale</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover our amazing products on sale. Don't miss out on these great deals!
          </p>
        </div>
        <div className="max-w-7xl mx-auto md:px-10 px-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 place-items-start">
          {products.map((product) => (
            <div key={product.id} className="bg-white border border-green-400 rounded-lg overflow-hidden">
              <img src={product.image} alt={product.title} className="md:w-full w-[300px] aspect-square block mx-auto mt-2" />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <span className='font-semibold text-xl text-red-600 block mt-3'>{product.saleDis}% <span className='text-sm text-black'>OFF</span></span>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-red-600 font-bold text-xl mr-2">${(product.price - (product.saleDis / 100 * product.price )).toFixed(2)}</span>
                    <span className="line-through text-gray-500">${product.price}</span>
                  </div>
                  <button className="bg-green-400 text-white py-2 px-4 rounded hover:bg-green-500" onClick={() => handleOrder(product)}>
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sales;
