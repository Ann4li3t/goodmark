import { gql } from "@apollo/client";
import client from "client";
import Image from "next/image";
import Link from "next/link";
import { getStyleStaticProps } from "utils/getPageStaticProps"
import Layout from 'components/layout'
import styles from 'styles/style.module.css'
import { Assets } from "components/assets";

const Style = (props) => {
    console.log(props.style)
    const { title, madeWithTitle, madeWithUri, madeWithFeaturedImage, steps, youCanAlsoUse, youCanAdd } = props.style;
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
                            <Image
                                src="/img/styles/asset.png" 
                                alt="Descripción de la imagen"
                                className="shadow"
                                width={400} 
                                height={400}
                            /> 

                            {/* <Image src={steps[steps.length - 1].feminineImageStep.mediaItemUrl} className="shadow" width={300} height={300} alt='imagen logotipo' /> */} 

                            {/* <Image src="/img/step.jpg" className="shadow" width={400} height={400} alt='imagen logotipo' /> */}
                            {/* <div className={styles.contentMadeWith}>
                                <h1>Made With</h1>
                                <div className={styles.wrapperMadeWith}>
                                    <p className={styles.madeWithTitle}>{madeWithTitle}</p>
                                    <Link href={madeWithUri}>
                                        {/* <Image
                                            src={youCanAlsoUseFeaturedImage} 
                                            alt="Descripción de la imagen"
                                            width={400} 
                                            height={400}
                                        />  */}
                                        {/* <Image
                                            src="/img/makeups.jpg" 
                                            className="shadow"
                                            alt="Descripción de la imagen"
                                            width={200} 
                                            height={200}
                                        />  */}
                                    {/*</Link> 
                                </div> 
                            </div> */}
                        </div>
                        <div className={styles.containerStepsStyle}>
                            {steps.map(step => (
                                <div key={step.id} className={styles.contentStepsStyle}>
                                    <div className={styles.stepsStyle}>
                                        <div className={`${styles.containerStepsImg}`}>
                                            {/* <Image
                                                src={step.masculineImageStep.mediaItemUrl}
                                                alt="Descripción de la imagen"
                                                layout="fill"
                                                objectFit="cover"
                                            />  */}

                                            <Image
                                                src="/img/step.jpg"
                                                className="shadow"
                                                alt="Descripción de la imagen"
                                                layout="fill"
                                                objectFit="cover"
                                            /> 
                                        </div>
                                        <div>
                                            <div className={styles.stepContainer}>
                                                <h1>{step.numberStep}</h1>
                                                <span>Step</span>
                                                
                                            </div>
                                            <div>
                                                <p>{step.descriptionStep}</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div> 
                            ))}
                        </div>
                    </div>
                    <div className={styles.containerYouCanAlsoUse}>
                        <div className="small-container">
                            <h3>{`Products you can also to give you a ${title} look`}</h3>
                            <div className={styles.contentYouCanAlsoUse}>
                                {youCanAlsoUse.map(product => (
                                    <div className={styles.wrapperYouCanAlsoUse}>
                                        <h4 className={styles.youCanAlsoUseTitle}>{product.youCanAlsoUseTitle}</h4>
                                
                                        <Link href={product.youCanAlsoUseUri}>
                                            {/* <Image
                                                src={youCanAlsoUseFeaturedImage} 
                                                alt="Descripción de la imagen"
                                                width={400} 
                                                height={400}
                                            />  */}
                                            <Image
                                                src="/img/step.jpg" 
                                                className="shadow"
                                                alt="Descripción de la imagen"
                                                width={500} 
                                                height={500}
                                            /> 
                                        </Link>                
                            
                                    </div> 
                                ))}  
                            </div>   
                        </div>           
                    </div> 
                    <div className={styles.containerYouCanAdd}>
                        <div className="small-container">

                            <h3>{`Products you can add to complete your look`}</h3>

                            <div className={styles.contentYouCanAdd}>
                                {youCanAdd.map(product => (
                                    <div className={styles.wrapperYouCanAdd}>
                                        <h4 className={styles.youCanAddTitle}>{product.youCanAddTitle}</h4>
                                
                                
                                        <Link href={product.youCanAddUri}>
                                            {/* <Image
                                                src={youCanAlsoUseFeaturedImage} 
                                                alt="Descripción de la imagen"
                                                width={400} 
                                                height={400}
                                            />  */}
                                            <Image
                                                src="/img/step.jpg" 
                                                className="shadow"
                                                alt="Descripción de la imagen"
                                                width={500} 
                                                height={500}
                                            /> 
                                        </Link>                
                            
                                    </div> 
                                ))}  
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