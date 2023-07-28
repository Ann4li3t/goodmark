import Image from 'next/image'

export const Assets = () => {
  return (
    <>
        <Image 
            src="/img/assets/asset-styles-1.png" 
            width={100} 
            height={95} 
            className='assetStyles assetStyles1'
            alt='imagen asset stars' />
        <Image 
            src="/img/assets/asset-styles-2-1.png" 
            width={268} 
            height={168} 
            className='assetStyles assetStyles2'
            alt='imagen asset stars' />
        <Image 
            src="/img/assets/asset-styles-3.png" 
            width={155} 
            height={176} 
            className='assetStyles assetStyles3'
           alt='imagen asset stars' />
        <Image 
            src="/img/assets/asset-styles-4.png" 
            width={131} 
            height={191} 
            className='assetStyles assetStyles4'
            alt='imagen asset stars' />
    </>
  )
}
