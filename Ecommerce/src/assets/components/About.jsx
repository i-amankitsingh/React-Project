import React, { useEffect } from 'react';

const AboutUs = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="font-sans text-black w-full md:px-10 px-5">
      <div className="relative text-center py-20 flex flex-row-reverse items-center">
        <div className="w-full flex-1">
            <img src='/image/about.jpg' className='' />
        </div>
        <div className="flex-1">
          <h1 className="text-5xl font-bold mb-4 text-green-400">About Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Welcome to ShopEase, your number one source for all things fashion. We're dedicated to giving you the very best of clothing, with a focus on quality, customer service, and uniqueness.
          </p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto py-8 px-5 bg-white  rounded-lg mt-8">
        <section className="mb-12">
          <h2 className="text-4xl font-bold mb-4 text-green-400">Our Story</h2>
          <p className="text-lg mb-6">
            Founded in 2020, ShopEase has come a long way from its beginnings in a home office. When we first started out, our passion for eco-friendly and ethically sourced fashion drove us to do intense research, and gave us the impetus to turn hard work and inspiration into a booming online store. We now serve customers all over the world and are thrilled to be a part of the eco-friendly wing of the fashion industry.
          </p>
        </section>
        <section className="mb-12">
          <h2 className="text-4xl font-bold mb-4 text-green-400">Our Mission</h2>
          <p className="text-lg mb-6">
            Our mission is to provide high-quality, stylish clothing that not only looks good but also feels good. We believe in sustainability and ethical fashion, and we strive to make a positive impact on the environment and society. Our clothes are made from sustainable materials and are produced in factories that uphold the highest ethical standards.
          </p>
        </section>
        <section className="mb-12">
          <h2 className="text-4xl font-bold mb-4 text-green-400">Meet the Team</h2>
          <p className="text-lg mb-6">
            Our team is a diverse group of fashion enthusiasts, designers, and customer service experts who are dedicated to making your shopping experience exceptional. We believe in fostering a creative and inclusive workplace where every voice is heard and valued.
          </p>
        </section>
        <section className="mb-12">
          <h2 className="text-4xl font-bold mb-4 text-green-400">Why Shop With Us?</h2>
          <ul className="list-disc list-inside text-lg">
            <li className="mb-2">Wide range of high-quality products</li>
            <li className="mb-2">Customer-centric approach</li>
            <li className="mb-2">Eco-friendly and sustainable fashion</li>
            <li className="mb-2">Secure and easy shopping experience</li>
          </ul>
        </section>
        <section>
          <h2 className="text-4xl font-bold mb-4 text-green-400">Contact Us</h2>
          <p className="text-lg">
            If you have any questions or comments, please don't hesitate to contact us. Our customer service team is always ready to help!
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
