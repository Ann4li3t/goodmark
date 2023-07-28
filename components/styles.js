import React, { useState, useContext } from 'react'
import Image from 'next/image'
import { StateContext } from 'context/stateContext'
import { Style } from 'components/style'
import styles from '../styles/styles.module.css'
import { Assets } from './assets'

export const Styles = ({propsStyles}) => {
    const { globalState } = useContext(StateContext)
    
    const categoryStyles = Array.from(new Set(propsStyles.map(object => object.nameTaxonomy)))

    const [selectedCategory, setSelectedCategory] = useState(categoryStyles[0] || '')

    const filteredStyles = selectedCategory ? propsStyles.filter(object => object.nameTaxonomy === selectedCategory) : propsStyles

    const handleCategoriaChange = (category) => {
        setSelectedCategory(category);
    }

    return (
      <>      
        <div className={styles.contentStyles}>
            <Assets />         

            <div className={styles.contentTitleStyles}>
                <h3>Choose your look</h3>
                <Image 
                    src="/img/assets/asset-stars.png" 
                    width={72} 
                    height={22} 
                    /* className={styles.imgAvatar} */
                    alt='imagen asset stars' /> 
            </div>
            
            <div className={`contenedor ${styles.containerStyles}`}>
                   
                {categoryStyles.length > 1 && (                 
                    <div className={styles.tabStyles}>
                        {categoryStyles.map(category => (
                        <button
                            key={category}
                            onClick={() => handleCategoriaChange(category)}
                            style={{ fontWeight: category === selectedCategory ? 'bold' : 'normal' }}
                        >
                            {category}
                        </button>
                        ))}
                    </div>
                )}
                <div className={styles.panelStyles}>
                    <Style filteredStyles={filteredStyles}/> 
                </div>                                       
               
            </div>
        </div>  
      </>
    )
}
