import { Pagination, Mousewheel, A11y } from 'swiper/modules'
import {Swiper, SwiperSlide} from "swiper/react"
import Image from "next/image"
import Link from "next/link"
import {isPngImage, getRandomColor} from "utils/utils"
import 'swiper/css'
import 'swiper/css/a11y'
import 'swiper/css/pagination'
import 'swiper/css/mousewheel'

export const Slider = ({ slides }) => {
  
  return (
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
        const { youCanUseFeaturedImage, id, youCanUseTitle, youCanUseUri } = slide;     
        const isImagePng = isPngImage(slide.youCanUseFeaturedImage);
        const randomColor = isImagePng ? getRandomColor() : '#fff';

        return ( 
          <SwiperSlide key={id}>            
            <div>
              <Link
                className="shadow wrapperImgSlide"
                href={youCanUseUri}
              > 
              <h4 className="titleSlide">{youCanUseTitle}</h4>  
              <div className="imageWrapperLink" style={{ backgroundColor: isPngImage(youCanUseFeaturedImage) ? randomColor : '#fff' }}>
                    <Image
                      src={youCanUseFeaturedImage}
                      alt="Descripción de la imagen"
                      width={400}
                      height={400}
                    />
                  </div>                       
              </Link>           
            </div>      
          </SwiperSlide>
        );
      })}
    </Swiper>
  )

}