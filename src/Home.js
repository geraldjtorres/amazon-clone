import React from 'react'
import './Home.css'
import Product from './Product'

function Home() {
  return (
    <div className='home'>
      <div className='home__container'>
        <img
          src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg'
          alt=''
          className='home__image'
        />

        <div className='home__row'>
          <Product
            id='111'
            title='The lead startup'
            price={29.99}
            image='https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg'
            rating={5}
          />
          <Product
            id='123'
            title='Nintendo Switch with Neon Blue and Neon Red JoyCon'
            price={338.99}
            image='https://m.media-amazon.com/images/I/61JnrafZ7zL._AC_UL640_FMwebp_QL65_.jpg'
            rating={5}
          />
        </div>

        <div className='home__row'>
          <Product
            id='222'
            title='Apple Macbook Pro Touch Bar and Touch ( 2019 ) Laptop - Space Gray'
            price={1999.99}
            image='https://m.media-amazon.com/images/I/71pC69I3lzL._AC_UL640_FMwebp_QL65_.jpg'
            rating={5}
          />
          <Product
            id='333'
            title='Converse - White'
            price={45.99}
            image='https://m.media-amazon.com/images/I/516eOw6ES2L._AC_UL640_FMwebp_QL65_.jpg'
            rating={5}
          />

          <Product
            id='444'
            title='Sony PlayStation Classic (with 20 Pre-Loaded Games)'
            price={99.99}
            image='https://m.media-amazon.com/images/I/61FH10p2JdL._AC_UL640_FMwebp_QL65_.jpg'
            rating={5}
          />
        </div>

        <div className='home__row'>
          <Product
            id='555'
            title='Samsung Odyssey G9 49 Inch Curved QLED Gaming Monitor'
            price={399.99}
            image='https://m.media-amazon.com/images/I/71UOuzURyLL._AC_UL640_FMwebp_QL65_.jpg'
            rating={5}
          />
        </div>
      </div>
    </div>
  )
}

export default Home
