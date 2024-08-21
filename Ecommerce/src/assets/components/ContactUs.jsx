import React, { useEffect, useState } from 'react';
import Loader from '../../Loader';

const ContactUs = () => {

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [isLoading])

    return (
        <>
            {
                isLoading && <Loader loadingText='Sending Your Message...' toggle={false} cls='top-0 min-h-full flex justify-center items-center' />
            }
            <section className='w-full px-5'>
                <div className='py-12 max-w-xl px-5 my-10 mx-auto  border border-green-400 rounded-md'>
                    <div className='text-center'>
                        <h1 className='text-3xl text-green-400 font-bold'>Contact Us</h1>
                        <p className='py-3 text-lg'>
                            We'd love to hear from you! Please fill out the form below and we will get in touch with you shortly.
                        </p>
                    </div>
                    <form action="https://api.web3forms.com/submit" method="POST" onSubmit={() => setIsLoading(true)}>
                        <input type="hidden" name="access_key" value="1024f79a-3e8b-40af-b6e9-e4f6044f2dc1" />
                        <div className=''>
                            <div>
                                <label htmlFor='name' className='block text-lg ml-2 mb-1 cursor-pointer'>Name:- </label>
                                <input type='text' name='Name' id='name' required placeholder='Name' className='block w-full px-3 py-3 border border-green-400 placeholder-gray-500 outline-none rounded-md text-lg' />
                            </div>
                            <div className='my-3'>
                                <label htmlFor='email' className='block text-lg ml-2 mb-1 cursor-pointer'>Email:- </label>
                                <input type='email' name='Email' id='email' required placeholder='Email' className='block w-full px-3 py-3 border border-green-400 placeholder-gray-500 outline-none rounded-md text-lg' />
                            </div>
                            <div>
                                <label htmlFor='subject' className='block text-lg ml-2 mb-1 cursor-pointer'>Subject:- </label>
                                <input type='text' name='Subject' id='subject' required placeholder='Subject' className='block w-full px-3 py-3 border border-green-400 placeholder-gray-500 outline-none rounded-md text-lg' />
                            </div>
                            <div className='mt-5'>
                                <label htmlFor='msg' className='block text-lg ml-2 mb-1 cursor-pointer'>Message:- </label>
                                <textarea name='Message' id='msg' rows={8} required className='w-full border border-green-400 outline-none rounded-md px-3 py-2' placeholder='Write Message Here...'>

                                </textarea>
                            </div>
                            <button type='submit' className='mt-5 bg-green-400 text-lg cursor-pointer w-full py-3 rounded-md text-white hover:bg-green-500'>Send Message</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default ContactUs;
