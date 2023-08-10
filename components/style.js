import React, { useState, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { StateContext } from 'context/stateContext'
import styles from 'styles/styles.module.css'
import { getRandomColor, isPngImage } from 'utils/utils'

export const Style = ({filteredStyles}) => {
    const { globalState } = useContext(StateContext);
    const [gender, setGender] = useState(globalState)
  return (
    <>
        {filteredStyles.map((style) => {
            const {id, title, uri, steps} = style
            const imgStyle =
            gender === 'masculine'
              ? steps[steps.length - 1].masculineImageStep?.mediaItemUrl ?? null
              : gender === 'feminine'
              ? steps[steps.length - 1].feminineImageStep?.mediaItemUrl ?? null
              : null; 
              const randomColor = isPngImage(imgStyle) ? getRandomColor() : '#fff';
            return (
                <div className={styles.wrapperStyle} style={{ backgroundColor: randomColor }} key={id}>
                    <h3 className={styles.titleStyle}>{title}</h3>
                    <Link href={uri}>
                        <Image
                            className={styles.styleImage}                
                            src={imgStyle}
                            alt="Descripción de la imagen"
                            width={400} 
                            height={400}
                        />                        
                    </Link>               
                </div>
            ); 
        })}       
    </>
  )
}
