import React from 'react';
import Banner from '../components/Banner';
import BestSellerBooks from "./BestSelerBooks"; // Note: File name is still BestSelerBooks.jsx
import FeaturedBooks from './FeaturedBooks';
import FavoriteBook from './FavoriteBook';
import PromoBanner from './PromoBanner';
import OtherBooks from './OtherBooks';
import Review from './Review';

function Home() {
  return (
    <div className='bg-white'>
      <Banner />
      <BestSellerBooks />
      <FeaturedBooks />
      <FavoriteBook />
      <PromoBanner />
      <OtherBooks />
      <Review />
    </div>
  );
}

export default Home;