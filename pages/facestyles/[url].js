import React, { useState, useContext, useEffect } from 'react'
import { gql } from "@apollo/client"
import { client } from "client"
import Image from "next/image"
import Link from "next/link"
import { StateContext } from 'context/stateContext'
import Layout from 'components/layout'
import { Assets } from "components/assets"
import { Slider } from "components/slider"
import { getStyleStaticProps } from "utils/getPageStaticProps"
import {interleaveArrays, isPngImage} from "utils/utils"
import styles from 'styles/style.module.css'


const Style = ({style}) => {
    const { globalState } = useContext(StateContext);
    const [gender, setGender] = useState(globalState);
    
    const { title, madeWithTitle, madeWithUri, madeWithFeaturedImage, steps, youCanAlsoUse, youCanAdd } = style; 

    const combinedArray = interleaveArrays(youCanAlsoUse, youCanAdd);

    return (
        <>
            <Layout
                title={title}
                description={''}
            >                
               <div className={`content-container ${styles.contentStyle}`}>
                    <Assets />
                    <div className={`small-container ${styles.containerStyle}`}>
                        <div className={styles.styleContent}>

                            <h1>{title}</h1>                            
                            <p>Lorem ipsum  dolor sit amet, consectetur adipiscing elit. Integer pulvinar metus vitae eros semper tempus. Morbi volutpat suscipit dui, et blandit neque ullamcorper ut. Nunc pretium tortor ac maximus feugiat.</p>                            
                        </div>
                    </div>
                    <div className={`small-container ${styles.containerStepsStyle}`}> 
                        {steps.map((step) => {                            
                            const imgStyle =
                            gender === 'masculine'
                                ? step.masculineImageStep?.mediaItemUrl ?? null
                                : gender === 'feminine'
                                ? step.feminineImageStep?.mediaItemUrl ?? null
                                : step.masculineImageStep?.mediaItemUrl ?? null
                            
                            return (
                                <div key={step.id} className={styles.contentStepsStyle}>
                                    <div className={styles.stepsStyle}>
                                        <div className={`${styles.containerStepsImg}`}>
                                           <Image
                                                src={imgStyle}
                                                className="shadow"
                                                alt="Descripción de la imagen"
                                                width={400} 
                                                height={400}
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className={styles.descriptionStep}>
                                            <div className={styles.stepContainer}>
                                                <h1>{step.numberStep}</h1>
                                                <span>Step</span>
                                            </div>
                                            <p>{step.descriptionStep}</p>
                                        </div>
                                    </div>
                                </div> 
                            );  
                        })}
                    </div>
                    <div className={styles.containerYouCanAlsoUse}>
                        <div className={styles.youCanAlsoUse}>
                            <div className={styles.contentMadeWith}>
                                <h3>Products needed</h3>
                                <div>
                                    <Link
                                    className="shadow wrapperImgSlide"
                                    href={madeWithUri}
                                    > 
                                    <h4 className="titleSlide">{madeWithTitle}</h4>              

                                    <div className="imageWrapperLink" style={{ backgroundColor: isPngImage(madeWithFeaturedImage) ? '#802FB4' : '#fff' }}>
                                        <Image
                                            src={madeWithFeaturedImage}
                                            alt="Descripción de la imagen"
                                            width={400}
                                            height={400}/>
                                    </div>                       
                                    </Link>           
                                </div>                                 
                            </div>
                            <div className={styles.contentProductsYouCanAlsoUse}>
                                <h3>{`Products you can also to give you a ${title} look`}</h3>
                                <div className={`contentYouCanAlsoUse ${styles.contentYouCanAlsoUse}`}>
                                    <Slider slides={combinedArray}/>
                                </div>                             
                            </div>   
                        </div>           
                    </div>                                  
                </div> 
            </Layout>
        </>        
    );
};

export default Style;

export const getStaticProps = getStyleStaticProps;

export async function getStaticPaths() {
  
  const { data } = await client.query({
      query: gql`
          query AllStylesQuery {
              styles {
                  nodes {
                      uri
                  }
              }                
          }
      `,
  });

  if (data.styles.nodes.length === 0) {
    return {
        redirect: {
            destination: '/error404', 
            permanent: false,
        },
    };
  }
  
  return {
      paths: data.styles.nodes
          .filter(styles => styles.uri !== "/")
          .map(styles => ({
              params: {
                  url: styles.uri.substring(1),                    
              },
          })),
      fallback: "blocking",          
  };
}