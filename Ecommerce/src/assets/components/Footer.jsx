import React from "react";
import Logo from '/image/logo.png'
import { Link } from "react-router-dom";

const Footer = () => {
    const userId = JSON.parse(sessionStorage.getItem('userInfo'))?.uid
    return (
        <>
            <section className="lg:flex md:grid grid-cols-2 justify-between g-5 px-10 mt-20">
                <div className="">
                    <img src={Logo} className="w-20 ml-7" />
                    <div className="">
                        <div className="flex gap-5">
                            <div>
                                <i className="fa fa-home text-2xl text-green-400"></i>
                            </div>
                            <div>
                                <span className="font-semibold block">Uttarakhand, India</span>
                                <span className="text-gray-500">Rishikesh, Dehradun</span>
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <div>
                                <i className="fa fa-phone text-2xl text-green-400"></i>
                            </div>
                            <div>
                                <span className="font-semibold block">+91 6397022305</span>
                                <span className="text-gray-500">Mon to Fri 9 am to 7 pm</span>
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <div>
                                <i className="fa fa-envelope text-xl text-green-400"></i>
                            </div>
                            <div>
                                <span className="font-semibold block">rixronger@gmail.com</span>
                                <span className="text-gray-500">Send your query on mail at anytime</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sm:flex gap-10 md:mt-0 mt-5">
                    <div className="">
                        <strong>Information</strong>
                        <ul className="mt-5 leading-7">
                            <li className="hover:text-green-400 transition-all duration-300"><Link to='/about'>About</Link></li>
                            <li className="hover:text-green-400 transition-all duration-300"><Link to='/shop'>Shop</Link></li>
                            <li className="hover:text-green-400 transition-all duration-300"><Link to='/sale'>Product</Link></li>
                            <li className="hover:text-green-400 transition-all duration-300"><Link to={`wishlist/${userId}`}>Wishlist</Link></li>
                        </ul>
                    </div>
                    <div>
                        <strong>Support</strong>
                        <ul className="mt-5 leading-7">
                            <li className="hover:text-blue-400 transition-all duration-300"><Link to=''>My Account</Link></li>
                            <li className="hover:text-blue-400 transition-all duration-300"><Link to='/contact'>Contact</Link></li>
                            <li className="hover:text-blue-400 transition-all duration-300"><Link to='https://wa.me/+916397022305?text=Hello%20Ankit%20I%20have%20question%20about%20your%20services'>Whatsapp</Link></li>
                            <li className="hover:text-blue-400 transition-all duration-300"><Link to=''>Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="lg:mt-0 mt-5">
                    <strong>Join Us Here</strong>
                    <div className="flex gap-3 mt-5">
                        <a href="https://www.instagram.com/itz.____ankit/" className="grid w-8 h-8 rounded-full bg-blue-400 hover:bg-green-400 transition-all duration-400 cursor-pointer text-white text-lg place-items-center"><i className="fa fa-instagram"></i></a>
                        <a href="https://github.com/i-amankitsingh" className="grid w-8 h-8 rounded-full bg-blue-400 hover:bg-green-400 transition-all duration-400 cursor-pointer text-white text-lg place-items-center"><i className="fa fa-twitter"></i></a>
                        <a href="https://www.facebook.com/profile.php?id=100040956545130" className="grid w-8 h-8 rounded-full bg-blue-400 hover:bg-green-400 transition-all duration-400 cursor-pointer text-white text-lg place-items-center"><i className="fa fa-facebook"></i></a>
                        <a href="https://www.linkedin.com/in/ankit-singh-jethuri/" className="grid w-8 h-8 rounded-full bg-blue-400 hover:bg-green-400 transition-all duration-400 cursor-pointer text-white text-lg place-items-center"><i className="fa fa-linkedin"></i></a>
                    </div>
                    <img src="/image/join-us.jpg" className="w-48 mt-5" />
                </div>
            </section>
            <footer className="text-center mt-5 py-3 px-2 border-t border-gray-400">
                <p className="text-gray-500">&copy; TeamDev. All Right Reserved 2024</p>
            </footer>
        </>
    )
}

export default Footer;