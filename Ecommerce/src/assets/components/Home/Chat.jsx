import React, { useEffect, useState, useCallback } from "react";

const Chat = () => {
    const [data, setData] = useState([]);
    const [store, setStore] = useState([]);
    const [filterArr, setFilterArr] = useState([]);
    const [price, setPrice] = useState(1000);
    const [rating, setRating] = useState(5);
    const [check, setCheck] = useState(new Array(13).fill(false));
    const [isClear, setIsClear] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('https://fakestoreapi.com/products');
                const result = await res.json();
                setData(result);
                setStore(result);
                if (!res.ok) {
                    throw result;
                }
            } catch (err) {
                console.log("Fetching error:: ", err);
            }
        };
        fetchData();
    }, [isClear]);

    const setFilterData = useCallback((category, index) => {
        setCheck(prevCheck => prevCheck.map((val, idx) => (idx === index ? !val : val)));
        setFilterArr(prevItem => prevItem.includes(category) ? prevItem.filter(cat => cat !== category) : [...prevItem, category]);
    }, []);

    const setPriceFilter = useCallback((pr, index) => {
        setCheck(prevCheck => prevCheck.map((val, idx) => (idx === index ? !val : val)));
        setPrice(pr);
    }, []);

    const setRatingData = useCallback((count, index) => {
        setCheck(prevCheck => prevCheck.map((val, idx) => (idx === index ? !val : val)));
        setRating(count);
    }, []);

    useEffect(() => {
        const filteredData = store.filter(row => {
            const matchesCategory = filterArr.length === 0 || filterArr.includes(row.category);
            const matchesPrice = row.price <= price;
            const matchesRating = Math.round(row.rating.rate) <= rating;
            return matchesCategory && matchesPrice && matchesRating;
        });
        setData(filteredData);
    }, [filterArr, price, rating, store]);

    const clearFilter = () => {
        setCheck(new Array(13).fill(false));
        setData(store);
        setPrice(1000);
        setRating(5);
        setFilterArr([]);
    };

    return (
        <>
            <section className="w-full px-10 my-10 md:flex gap-10">
                <div className="md:w-1/4 w-full shadow-md md:mb-0 mb-5">
                    <h2 className="px-5 py-3 bg-green-400 text-white text-lg">Filter</h2>
                    <div className="p-3">
                        <strong className="block mt-5 mb-2">Category:</strong>
                        <ul>
                            <li>
                                <input type="checkbox" id="c1" className="cursor-pointer accent-green-400 scale-125 mr-2" onChange={() => setFilterData("men's clothing", 0)} checked={check[0]} />
                                <label htmlFor="c1" className="cursor-pointer">Men's Clothing</label>
                            </li>
                            <li>
                                <input type="checkbox" id="c2" className="cursor-pointer accent-green-400 scale-125 mr-2" onChange={() => setFilterData("jewelery", 1)} checked={check[1]} />
                                <label htmlFor="c2" className="cursor-pointer">Jewelery</label>
                            </li>
                            <li>
                                <input type="checkbox" id="c3" className="cursor-pointer accent-green-400 scale-125 mr-2" onChange={() => setFilterData("electronics", 2)} checked={check[2]} />
                                <label htmlFor="c3" className="cursor-pointer">Electronics</label>
                            </li>
                            <li>
                                <input type="checkbox" id="c4" className="cursor-pointer accent-green-400 scale-125 mr-2" onChange={() => setFilterData("women's clothing", 3)} checked={check[3]} />
                                <label htmlFor="c4" className="cursor-pointer">Women's Clothing</label>
                            </li>
                        </ul>

                        <strong className="mt-5 mb-2 block">Price:</strong>
                        <ul>
                            <li>
                                <input type="radio" name="r" id="d1" className="cursor-pointer accent-green-400 scale-125 mr-2" onChange={() => setPriceFilter(50, 4)} checked={check[4]} />
                                <label htmlFor="d1" className="cursor-pointer">Under $50</label>
                            </li>
                            <li>
                                <input type="radio" name="r" id="d2" className="cursor-pointer accent-green-400 scale-125 mr-2" onChange={() => setPriceFilter(100, 5)} checked={check[5]} />
                                <label htmlFor="d2" className="cursor-pointer">Under $100</label>
                            </li>
                            <li>
                                <input type="radio" name="r" id="d3" className="cursor-pointer accent-green-400 scale-125 mr-2" onChange={() => setPriceFilter(500, 6)} checked={check[6]} />
                                <label htmlFor="d3" className="cursor-pointer">Under $500</label>
                            </li>
                            <li>
                                <input type="radio" name="r" id="d4" className="cursor-pointer accent-green-400 scale-125 mr-2" onChange={() => setPriceFilter(1000, 7)} checked={check[7]} />
                                <label htmlFor="d4" className="cursor-pointer">Under $1000</label>
                            </li>
                        </ul>

                        <strong className="mt-5 mb-2 block">Ratings:</strong>
                        <ul>
                            <li>
                                <input type="radio" name="rating" id="e1" className="cursor-pointer accent-green-400 scale-125 mr-2" onChange={() => setRatingData(5, 8)} checked={check[8]} />
                                <label htmlFor="e1" className="cursor-pointer">5 Star</label>
                            </li>
                            <li>
                                <input type="radio" name="rating" id="e2" className="cursor-pointer accent-green-400 scale-125 mr-2" onChange={() => setRatingData(4, 9)} checked={check[9]} />
                                <label htmlFor="e2" className="cursor-pointer">4 Star</label>
                            </li>
                            <li>
                                <input type="radio" name="rating" id="e3" className="cursor-pointer accent-green-400 scale-125 mr-2" onChange={() => setRatingData(3, 10)} checked={check[10]} />
                                <label htmlFor="e3" className="cursor-pointer">3 Star</label>
                            </li>
                            <li>
                                <input type="radio" name="rating" id="e4" className="cursor-pointer accent-green-400 scale-125 mr-2" onChange={() => setRatingData(2, 11)} checked={check[11]} />
                                <label htmlFor="e4" className="cursor-pointer">2 Star</label>
                            </li>
                            <li>
                                <input type="radio" name="rating" id="e5" className="cursor-pointer accent-green-400 scale-125 mr-2" onChange={() => setRatingData(1, 12)} checked={check[12]} />
                                <label htmlFor="e5" className="cursor-pointer">1 Star</label>
                            </li>
                        </ul>
                        <button className="w-full bg-green-400 hover:bg-green-600 py-3 text-white text-lg cursor-pointer my-5 rounded-sm" onClick={clearFilter}>Clear Filters</button>
                    </div>
                </div>
                <div className="md:w-3/4 w-full shadow-md ">
                    <h2 className="px-5 py-3 bg-blue-400 text-white text-lg flex justify-between"><span>Product</span> {data.length} Items</h2>
                    <div className="flex gap-10 p-2 flex-wrap items-start">
                        {data.map((row) => (
                            <div className="flex-1 min-w-[250px] border border-1 border-green-400 p-4 rounded-sm" key={row.id}>
                                <img src={row.image} className="aspect-square" alt={row.title} />
                                <div>
                                    <span className="text-gray-500 uppercase block my-3">{row.category}</span>
                                    <h2 className="text-2xl my-3">{row.title}</h2>
                                    <div className="flex justify-between">
                                        <div>
                                            {[...Array(5)].map((star, i) => (
                                                <i key={i} className={`fa fa-star ${Math.round(row.rating.rate) > i ? 'text-orange-500' : 'text-gray-400'}`}></i>
                                            ))}
                                            <span className="mx-3">{row.rating.rate}</span>
                                        </div>
                                        <span>${row.price}</span>
                                    </div>
                                    <button className="block my-3 text-center bg-blue-400 hover:bg-blue-600 w-full text-white h-12 text-lg rounded-sm">VIEW MORE</button>
                                </div>
                            </div>
                        ))}
                        {data.length === 0 && 'No Data Found'}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Chat;
