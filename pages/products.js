import React, { useState } from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image'
import Link from 'next/link'
import Layout from '/components/layout'
import { Assets } from 'components/assets'
import { getProductsCategoriesStaticProps } from "utils/getPageStaticProps"
import styles from '../styles/productsIndex.module.css'

export default function Products({productsCategories}) {
  const router = useRouter()

  const [selectedCategory, setSelectedCategory] = useState('')

  const sortedCategories = productsCategories.sort((a, b) => a.priorityTaxonomy  - b.priorityTaxonomy )

  const handleCategoriaSelected = (category) => {
    setSelectedCategory(category)
    router.push({
      pathname: '/all-products',
      query: { selectedCategory: category },
    });
  }
 
  return (
    <>      
      <Layout
        title={'Products'}
        description={''}
      >        
        <div className={`content-container ${styles.contentProducts}`}>
          <Assets />          

          <div className={styles.contentTitleProducts}>
            <h3>What are you looking for?</h3>
                <Image 
                    src="/img/assets/asset-stars.png" 
                    width={72} 
                    height={22} 
                    alt='imagen asset stars' /> 
          </div>
          <div className={`contenedor ${styles.containerStyles}`}>
            {productsCategories.length > 1 && (                 
                <div className={styles.containerProducts}>

                  {productsCategories.map(category => (
                    <div key={category.id}>
                      <button
                        key={category.id}
                        className={`shadow ${styles.wrapperProduct}`}
                        onClick={() => handleCategoriaSelected(category.nameTaxonomy)}
                      >                          
                        <Image
                            src={category.imgTaxonomy} 
                            alt="Descripción de la imagen"
                            width={387} 
                            height={387}
                        /> 
                      </button> 
                      <h3 className={styles.titleProduct}>{category.nameTaxonomy}</h3>
                    </div>                    
                  ))}                  
                </div>
              )} 
            </div>
        </div>
        
      </Layout>      
    </>
  )
}

export const getStaticProps = getProductsCategoriesStaticProps;