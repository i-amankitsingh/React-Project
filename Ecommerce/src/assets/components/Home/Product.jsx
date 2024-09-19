import React, { useCallback, useEffect, useState } from "react";
import Loader from "../../../Loader";
import { Link } from "react-router-dom";
import viewProduct from "../../FeatureFunction/viewProduct";
import { useDispatch } from "react-redux";


const Product = ({handleParentLoader}) => {

    const [isLoading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [store, setStore] = useState([])
    const [filterArr, setFilterArr] = useState([])
    const [price, setPrice] = useState(1000)
    const [rating, setRating] = useState(5)

    const [check, setCheck] = useState([
        {checked : false},
        {checked : false},
        {checked : false},
        {checked : false},
        {checked : false},
        {checked : false},
        {checked : false},
        {checked : false},
        {checked : false},
        {checked : false},
        {checked : false},
        {checked : false},
        {checked : false},
    ])

    const dispatch = useDispatch();



    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('https://fakestoreapi.com/products');
                // const res = await fetch("https://api.escuelajs.co/api/v1/products");
                const result = await res.json();
                setData(result)
                console.log("Result of product ", result)
                setStore(result)
                handleParentLoader()
                if (!res.ok) {
                    throw result
                }

            }
            catch (err) {
                console.log("Fetching error:: ", err);
            }
        }
        fetchData()
    }, [])

    const filterLoader = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }

    const setFilterData = (category) => {
        setCheck(check.map(val => !val))
        setFilterArr(prevItem => prevItem.includes(category) ? prevItem.filter(cat => cat !== category) : [...prevItem, category])
        setData(store)
    }
   
    const setPriceFilter = (pr) => {
        setCheck(check.map(val => !val))
        setPrice(Math.round(pr));
        setData(store)
    }

    const setRatingData = (count) => {
        setCheck(check.map(val => !val))
        setRating(count);
        setData(store)
    }

    


    useEffect(() => {
        
        const filterData = () => {
            setData(data?.filter(row => filterArr.includes(row.category) && row.price <= price && Math.round(row.rating.rate) <= rating))
            // console.log("Data",data);
            if(filterArr.length === 0){
                setData(store);
            }
        }

        const filterPriceData = () => {
                // console.log("Price ", price);
                if(filterArr.length > 0){
                    setData(data?.filter(row => row.price <= price && filterArr.includes(row.category && Math.round(row.rating.rate) <= rating)))
                }
                else{
                    setData(data?.filter(row => row.price <= price && Math.round(row.rating.rate) <= rating ))
                }
                // console.log("Returned Data :: ", data?.filter(row => row.price <= price ))
                // console.log("Price Data ", data);
                
            }

            const filterRatingsData = () => {
                if(filterArr.length > 0){
                    setData(data?.filter(row => Math.round(row.rating.rate) <= rating && filterArr.includes(row.category) && row.price <= price))
                }
                else{
                    setData(data?.filter(row => Math.round(row.rating.rate) <= rating && row.price <= price))
                }
                // console.log("Rating Data", data)
            }
            filterLoader()
            filterData()
            filterPriceData()
            filterRatingsData()
        
    }, [filterArr, price, rating])

     const clearFilter = () => {
        filterLoader()
        setCheck(prevCheck => prevCheck?.map(val => ({...val, checked : false})))
        setFilterArr([])
        setPrice(1000)
        setRating(5)
        setData(store)
        // console.log("Filter Clear :: ", data, price, rating)
     }

    

    return (
        <>
            <section className="w-full md:px-10 px-2 my-10 md:flex gap-10">
                <div className="md:w-1/4 w-full shadow-md md:mb-0 mb-5">
                    <h2 className="px-5 py-3 bg-green-400 text-white text-lg">Filter</h2>
                    <div className="p-3">
                        <strong className="block mt-5 mb-2">Category:</strong>
                        <ul>
                            <li>
                                <input type="checkbox" id="c1" className="cursor-pointer accent-green-400 scale-125 mr-2" onChange={() => setFilterData(`men's clothing`)} checked={check[0].checked} />
                                <label htmlFor="c1" className="cursor-pointer">Men's Clothing</label>
                            </li>
                            <li>
                                <input type="checkbox" id="c2" className="cursor-pointer accent-green-400 scale-125 mr-2" onChange={() => setFilterData(`jewelery`)} checked={check[1].checked} />
                                <label htmlFor="c2" className="cursor-pointer">JEWELERY</label>
                            </li>
                            <li>
                                <input type="checkbox" id="c3" className="cursor-pointer accent-green-400 scale-125 mr-2" onChange={() => setFilterData(`electronics`)} checked={check[2].checked} />
                                <label htmlFor="c3" className="cursor-pointer">ELECTRONICS</label>
                            </li>
                            <li>
                                <input type="checkbox" id="c4" className="cursor-pointer accent-green-400 scale-125 mr-2" onChange={() => setFilterData(`women's clothing`)} checked={check[3].checked} />
                                <label htmlFor="c4" className="cursor-pointer">Women's Clothing</label>
                            </li>
                        </ul>

                        <strong className="mt-5 mb-2 block">Price:</strong>
                        <ul>
                            <li>
                                <input type="radio" name="r" id="d1" className="cursor-pointer accent-green-400 scale-125 mr-2" onChange={() => setPriceFilter(50)} checked={check[4].checked}  />
                                <label htmlFor="d1" className="cursor-pointer">Under $50</label>
                            </li>
                            <li>
                                <input type="radio" name="r" id="d2" className="cursor-pointer accent-green-400 scale-125 mr-2" onChange={() => setPriceFilter(100)} checked={check[5].checked} />
                                <label htmlFor="d2" className="cursor-pointer">Under $100</label>
                            </li>
                            <li>
                                <input type="radio" name="r" id="d3" className="cursor-pointer accent-green-400 scale-125 mr-2" onChange={() => setPriceFilter(500)} checked={check[6].checked} />
                                <label htmlFor="d3" className="cursor-pointer">Under $500</label>
                            </li>
                            <li>
                                <input type="radio" name="r" id="d4" className="cursor-pointer accent-green-400 scale-125 mr-2" onChange={() => setPriceFilter(1000)} checked={check[7].checked} />
                                <label htmlFor="d4" className="cursor-pointer">Under $1000</label>
                            </li>
                        </ul>
                        <strong className="mt-5 mb-2 block">Ratings:</strong>
                        <ul>
                            <li>
                                <input type="radio" name="rating" id="e1" className="cursor-pointer accent-green-400 scale-125 mr-2" onChange={() => setRatingData(5)} checked={check[8].checked}  />
                                <label htmlFor="e1" className="cursor-pointer">5 Star</label>
                            </li>
                            <li>
                                <input type="radio" name="rating" id="e2" className="cursor-pointer accent-green-400 scale-125 mr-2" onChange={() => setRatingData(4)} checked={check[9].checked} />
                                <label htmlFor="e2" className="cursor-pointer">4 Star</label>
                            </li>
                            <li>
                                <input type="radio" name="rating" id="e3" className="cursor-pointer accent-green-400 scale-125 mr-2" onChange={() => setRatingData(3)} checked={check[10].checked} />
                                <label htmlFor="e3" className="cursor-pointer">3 Star</label>
                            </li>
                            <li>
                                <input type="radio" name="rating" id="e4" className="cursor-pointer accent-green-400 scale-125 mr-2" onChange={() => setRatingData(2)} checked={check[11].checked} />
                                <label htmlFor="e4" className="cursor-pointer">2 Star</label>
                            </li>
                            <li>
                                <input type="radio" name="rating" id="e5" className="cursor-pointer accent-green-400 scale-125 mr-2" onChange={() => setRatingData(1)} checked={check[12].checked} />
                                <label htmlFor="e5" className="cursor-pointer">1 Star</label>
                            </li>
                        </ul>
                        <button className="w-full bg-green-400 hover:bg-green-600 py-3 text-white text-lg cursor-pointer my-5 rounded-sm" onClick={clearFilter}>Clear Filters</button>
                    </div>
                </div>
                <div className="md:w-3/4 w-full shadow-md relative">
                    <h2 className="px-5 py-3 bg-blue-400 text-white text-lg flex justify-between"><span>Product</span> {data?.length} Items</h2>

                    {isLoading && <Loader loadingText='Filtering' toggle={false} />}
                    <div className="flex sm:justify-start justify-center gap-10 p-2 flex-wrap items-start">
                        {data?.map((row) =>
                            <div className="flex-1 min-w-[250px] border border-1 border-blue-400 p-4 rounded-sm max-w-[350px]" key={row?.id}>
                                <img src={row.image} className="aspect-square" />
                                <div>
                                    <span className="text-gray-500 uppercase block my-3">{row?.category}</span>
                                    <h2 className="text-2xl my-3">{row?.title}</h2>
                                    <div className="flex justify-between">
                                        <div>
                                            <i className={`fa fa-star ${Math.round(row?.rating?.rate) >= 1 ? 'text-orange-500' : 'text-gray-400'}`}></i>
                                            <i className={`fa fa-star ${Math.round(row?.rating?.rate) >= 2 ? 'text-orange-500' : 'text-gray-400'}`}></i>
                                            <i className={`fa fa-star ${Math.round(row?.rating?.rate) >= 3 ? 'text-orange-500' : 'text-gray-400'}`}></i>
                                            <i className={`fa fa-star ${Math.round(row?.rating?.rate) >= 4 ? 'text-orange-500' : 'text-gray-400'}`}></i>
                                            <i className={`fa fa-star ${Math.round(row?.rating?.rate) >= 5 ? 'text-orange-500' : 'text-gray-400'}`}></i>
                                            <span className="mx-3">{row?.rating?.rate}</span>
                                        </div>
                                        {/* <i className="fa fa-heart text-lg text-red-500 cursor-pointer active:text-xl transition-all duration-2000"></i> */}
                                        <span>${row?.price}</span>
                                    </div>
                                    <Link to={`/product-details/${row.id}`}>
                                    <button className="block my-3 text-center bg-blue-400 hover:bg-blue-600 w-full text-white h-12 text-lg rounded-sm" onClick={() => viewProduct(dispatch, row)}>VIEW MORE</button>
                                    </Link>
                                </div>
                            </div>
                        )}
                        {data?.length === 0 && 'No Data Found'}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Product;