import React, { useState, useEffect, useCallback } from 'react';
import { fetchProduct } from './Cart';
import Loader from '../../Loader';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import viewProduct from '../FeatureFunction/viewProduct';
import Fuse from "fuse.js";


const Shop = () => {

    const [products, setProducts] = useState([])
    const [results, setResults] = useState([])
    const [query, setQuery] = useState("")
    const [category, setCategory] = useState([])
    const [showSuggestion, setShowSuggestion] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchData = async () => {
            const data = await fetchProduct()
            setProducts(data)
            setResults(data)
            const cat = data?.map((product) => (product.category))
            const uniqueCat = [...new Set(cat)]
            setCategory(uniqueCat)
        }
        fetchData()
        // console.log(products)
    }, [])

    useEffect(() => {
        if(query === ""){
            setResults(products)
            setShowSuggestion(false)
        }
    }, [query])
    

    const fuse = new Fuse(products, {
        keys: ['title', 'category', 'price', 'description'],
        threshold: 0.3,
    })



    const searchProduct = () => {
        if(query === ""){
            setResults(products)
        }
        else{
            const fuseResults = fuse.search(query)
            const resultsProduct = fuseResults.map(result => result.item)
            setResults(resultsProduct)
        }
    }

    const getQuery = (query) => {
        setQuery(query)
    }

    const getQueryFromSuggestion = (query) => {
        query = query.toLowerCase()
        setQuery(query)
        setShowSuggestion(false)
    }




    return (
        <>
            {products.length === 0 ? <Loader loadingText='Please Wait...' toggle={false} cls='top-0' /> : ''}
            <div className="font-sans text-black">
                <div className="bg-green-400 text-white text-center py-20">
                    <h1 className="text-5xl font-bold mb-4">Shop</h1>
                    <p className="text-xl max-w-3xl mx-auto">
                        Explore our wide range of high-quality, eco-friendly products.
                    </p>
                </div>
                <div className='max-w-6xl mx-auto mt-10 px-8'>
                    <div className='flex'>
                        <input type='text' value={query}  onChange={(e) => getQuery(e.target.value)} onFocus={() => setShowSuggestion(true)}  className='flex-1 outline-none border border-1 border-green-400 rounded-l-sm h-14 px-2' placeholder='Search Here...' />
                        <button className='bg-green-400 w-28 text-lg text-white cursor-pointer active:bg-green-700 rounded-r-sm' onClick={searchProduct}>Search</button>
                    </div>
                </div>
                {showSuggestion && <div className='max-w-6xl mx-auto px-10 mt-3'>
                    <ul className='leading-relaxed'>
                        {category?.map((items) => (
                            <li key={items} className='capitalize cursor-pointer' onClick={(e) => getQueryFromSuggestion(e.target.innerText)}>{items}</li>
                        ))}
                    </ul>
                    
                </div>}
                <span className='text-lg block mt-10 text-center'>{results?.length === 0? "No Product Found!" : ""}</span>
                <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    {results?.map(product => (
                        <div key={product.id} className="border rounded-lg overflow-hidden border-blue-400">
                            <img src={product.image} alt={product.title} className="w-full aspect-square" />
                            <div className="p-4">
                                <h2 className="text-xl font-bold mb-2">{product.title}</h2>
                                <p className="text-lg text-green-400 mb-4">${product.price}</p>
                                <Link to={`/product-details/${product.id}`}>
                                    <button className="bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-500" onClick={() => viewProduct(dispatch, product)}>
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Shop;



