import React, { useContext } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { StateContext } from 'context/stateContext';
import styles from '../styles/index.module.css'

export const Avatars = () => {
    const { globalState, updateGlobalState } = useContext(StateContext)   
    /* const router = useRouter() */

    const handleClickFeminine = () => {   
        const updatedGender = 'feminine'
        updateGlobalState(updatedGender)
        /* router.push('/styles') */
    }

    const handleClickMasculine = () => {
        const updatedGender = 'masculine'
        updateGlobalState(updatedGender)
        /* router.push('/styles') */
    } 
    console.log(globalState)
  return (
    <>
        <div className={`content ${styles.contentHome}`}>
          <div className={styles.contentBannerQuality}>
            <div className={styles.contentIcon}>
              <Image 
                src="/img/banner-quality/kid-friendly.png"               
                width={291}
                height={110} 
                alt='icon kid friendly' />
            </div>
            <div className={styles.contentIcon}>
              <Image 
                src="/img/banner-quality/dermatology-tested.png" 
                width={388}
                height={110} 
                alt='icon dermatology tested' />
            </div>            
            <div className={styles.contentIcon}>
              <Image 
                src="/img/banner-quality/easy-on-off.png" 
                width={357}
                height={110} 
                alt='icon easy on off' />
            </div>            
            <div className={styles.contentIcon}>
              <Image 
                src="/img/banner-quality/quality-approved.png" 
                width={110}
                height={110} 
                alt='icon quality approved' />
            </div>           
          </div>
          <div className={styles.contentAvatars}>
            <h3>Choose your avatar</h3>
            <div className={`contenedor ${styles.containerAvatars}`}>              
              <div className={styles.avatars}>
                <button onClick={handleClickFeminine}>
                  <Image 
                    src="/img/index/boy.png" 
                    width={400} 
                    height={400} 
                    className={styles.imgAvatar}
                    alt='imagen logotipo' />      
                </button>
              </div>
              <div className={styles.avatars}>
                <button onClick={handleClickMasculine}>
                <Image 
                    src="/img/index/girl.png" 
                    width={400} 
                    height={400} 
                    className={styles.imgAvatar}
                    alt='imagen logotipo' />     
                </button>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}
