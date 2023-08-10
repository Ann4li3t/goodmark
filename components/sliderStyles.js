import React, { useState, useContext } from 'react'
import { StateContext } from 'context/stateContext'

import { Pagination, Mousewheel, A11y } from 'swiper/modules'
import {Swiper, SwiperSlide} from "swiper/react"
import Image from "next/image"
import Link from "next/link"
import {isPngImage,
  getRandomColor} from "utils/utils"
import 'swiper/css'
import 'swiper/css/a11y'
import 'swiper/css/pagination'
import 'swiper/css/mousewheel'
import styles from 'styles/product.module.css'

export const SliderStyles = ({ slides }) => {
  const { globalState } = useContext(StateContext);
  const [gender, setGender] = useState(globalState)

  const slidesPerView = slides.length

  console.log(slidesPerView)

  return (  
    <div className='text-center'>
    {slidesPerView >= 5 ? (
      <Swiper
      modules={[Pagination, Mousewheel, A11y]}
      spaceBetween={15}
      slidesPerView={5}      
      pagination={{ clickable: true }}
      mousewheel={true}
      effect={"cube"}
      cubeEffect={{
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      }}
    >      
      {slides.map((slide) => {
        const { uri, id, title, steps } = slide;     

        console.log(slide)

        const imgStyle =
          gender === 'masculine'
              ? steps[steps.length - 1].masculineImageStep?.mediaItemUrl ?? null
              : gender === 'feminine'
              ? steps[steps.length - 1].feminineImageStep?.mediaItemUrl ?? null
              : steps[steps.length - 1].masculineImageStep?.mediaItemUrl ?? null 

          const randomColor = isPngImage(imgStyle) ? getRandomColor() : '#fff';

        return ( 
          <SwiperSlide key={id}>            
            <div 
              key={id}
              className={styles.wrapperStylesYouCanAlsoGet}
              style={{ backgroundColor: randomColor }}
            >
              <h4 className={styles.stylesYouCanAlsoGetTitle}>{title}</h4>                                
              <Link href={uri}>
                  <Image
                      src={imgStyle} 
                      className="shadow"
                      alt="Descripción de la imagen"
                      width={500} 
                      height={500}
                  /> 
              </Link>   
            </div> 
          </SwiperSlide>
        );
      })}
      </Swiper>
    ) : (
      slides.map((slide) => {
        const { uri, id, title, steps } = slide;     

        console.log(slide)

        const imgStyle =
          gender === 'masculine'
              ? steps[steps.length - 1].masculineImageStep?.mediaItemUrl ?? null
              : gender === 'feminine'
              ? steps[steps.length - 1].feminineImageStep?.mediaItemUrl ?? null
              : steps[steps.length - 1].masculineImageStep?.mediaItemUrl ?? null 

          const randomColor = isPngImage(imgStyle) ? getRandomColor() : '#fff';

        return (                    
            <div 
              key={id}
              className={`${styles.wrapperStylesYouCan} ${styles.wrapperStylesYouCanAlsoGet}`}
              
              style={{ backgroundColor: randomColor }}
            >
              <h4 className={styles.stylesYouCanAlsoGetTitle}>{title}</h4>                                
              <Link href={uri}>
                  <Image
                      src={imgStyle} 
                      className="shadow"
                      alt="Descripción de la imagen"
                      width={500} 
                      height={500}
                  /> 
              </Link>   
            </div>          
        );
      })  
    )}  

    </div> 
  )

}