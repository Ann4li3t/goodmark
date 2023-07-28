import React, { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { StateContext } from 'context/stateContext'
import styles from 'styles/styles.module.css'

export const Style = ({filteredStyles}) => {
    const { globalState } = useContext(StateContext); 

  return (
    <>
        {filteredStyles.map(object => (
            <div className={styles.wrapperStyle} key={object.id}>
                <h3 className={styles.titleStyle}>{object.title}</h3>
                 
                {globalState === 'feminine' ? (
                    <Link href={object.uri}>
                        {/* <Image
                            src={object.steps[object.steps.length - 1].feminineImageStep.mediaItemUrl} 
                            alt="Descripción de la imagen"
                            width={400} 
                            height={400}
                        />  */}
                        <Image
                            src="/img/styles/asset.png" 
                            alt="Descripción de la imagen"
                            width={400} 
                            height={400}
                        /> 
                    </Link>                   
                ) : globalState === 'masculine' && (
                    <Link href={object.uri}>
                        {/* <Image
                            className={styles.styleImage}
                            src={object.steps[object.steps.length - 1].masculineImageStep.mediaItemUrl}
                            alt="Descripción de la imagen"
                            width={400} 
                            height={400}
                        />  */}

                        <Image
                            src="/img/styles/asset.png"  
                            alt="Descripción de la imagen"
                            width={400} 
                            height={400}
                        />
                    </Link>                    
                ) }
            </div>
        ))}
        {filteredStyles.map(object => (
            <div className={styles.wrapperStyle} key={object.id}>
                <p className={styles.titleStyle}>{object.title}</p>
                
                {globalState === 'feminine' ? (
                    <Link href={object.uri}>
                        {/* <Image
                            src={object.steps[object.steps.length - 1].feminineImageStep.mediaItemUrl} 
                            alt="Descripción de la imagen"
                            width={400} 
                            height={400}
                        />  */}
                        <Image
                            src="/img/styles/asset.png" 
                            alt="Descripción de la imagen"
                            width={400} 
                            height={400}
                        /> 
                    </Link>                   
                ) : globalState === 'masculine' && (
                    <Link href={object.uri}>
                        {/* <Image
                            className={styles.styleImage}
                            src={object.steps[object.steps.length - 1].masculineImageStep.mediaItemUrl}
                            alt="Descripción de la imagen"
                            width={400} 
                            height={400}
                        />  */}

                        <Image
                            src="/img/styles/asset.png"  
                            alt="Descripción de la imagen"
                            width={400} 
                            height={400}
                        />
                    </Link>                    
                ) }
            </div>
        ))}
    </>
  )
}
