import { gql } from "@apollo/client"
import { client } from "../../client"
import Image from "next/image"
import Layout from '/components/layout'
import { Assets } from "components/assets"
import { getProductStaticProps } from "utils/getPageStaticProps"
import styles from 'styles/product.module.css'
import { isPngImage } from 'utils/utils'
import { SliderStyles } from 'components/sliderStyles'


const Product = (props) => {
    const arrayStyles = props.styles
    const arrayProducts = props.product
    const { title, uri, content, featuredImage, qualitySeals } = arrayProducts;
    const normalizedUri = uri.trim().toLowerCase();

    const stylesForSelectedProduct = arrayStyles.filter((style) => {
    const products = [...style.youCanAlsoUse, ...style.youCanAdd, { youCanAlsoUseUri: style.madeWithUri }];
        return products.some((product) => {
            const productUri = product.youCanAlsoUseUri || product.youCanAddUri;
            const normalizedProductUri = productUri.trim().toLowerCase();
            return normalizedProductUri === normalizedUri;
        });
    });
        
    return (
        <>
            <Layout
                title={title}
                description={''}
            >           

            <div className={`content-container ${styles.contentProduct}`}>
                <Assets />
                <div className={`small-container ${styles.containerProduct}`}>
                    <div className={styles.productContent}>
                        <div className={`${styles.wrapperProduct}`}>
                            <div 
                                className={styles.imageWrapper} 
                                style={{ backgroundColor: isPngImage(featuredImage) ? '#EC8572' : '#fff' }}>
                                    <Image
                                    src={featuredImage}
                                    alt="Descripción de la imagen"
                                    width={400}
                                    height={400}
                                    />
                            </div>
                        </div>

                        <div className={`${styles.wrapperContent}`}> 
                            <h1>{title}</h1>                            
                            <p>{content}</p>
                            <div className={styles.containerQuality}>
                                {qualitySeals.length > 0 && (
                                <div className={styles.seals}>
                                    {qualitySeals.map((seal) => {    
                                    const {id, name, sealImage} = seal;
                                    return (
                                        <div key={id} className={styles.containerSeal}>
                                        <Image
                                            src={sealImage}        
                                            alt="Descripción de la imagen"
                                            width={60} 
                                            height={60}
                                        /> 
                                        <h5>{name}</h5>
                                        </div>
                                    );
                                    })}
                                </div>
                                )}
                                <div className={styles.approved}>
                                    <Image 
                                        src="/img/banner-quality/quality-approved.png" 
                                        width={70}
                                        height={70} 
                                        alt='icon quality approved' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {stylesForSelectedProduct.length > 0 && (    
                    <div className={styles.containerStylesYouCanAlsoGet}>
                        <div className="small-container">
                            <h3>{`Styles you can also get with this product `}</h3>
                            <div className={styles.contentStylesYouCanAlsoGet}>
                                <SliderStyles slides={stylesForSelectedProduct}/>
                            </div>   
                        </div>           
                    </div>
                )}
            </div>
        </Layout>
        </>  
    );
};

export default Product;

export const getStaticProps = getProductStaticProps

export async function getStaticPaths() {
  
  const { data } = await client.query({
      query: gql`
          query AllProductsQuery {
              products {
                  nodes {
                      uri
                  }
              }                
          }
      `,
  });

  if (data.products.nodes.length === 0) {
    return {
        redirect: {
            destination: '/error404', 
            permanent: false,
        },
    };
  }
  
  return {
      paths: data.products.nodes
          .filter(products => products.uri !== "/")
          .map(products => ({
              params: {
                  url: products.uri.substring(1),                    
              },
          })),
      fallback: "blocking",
      
      
  };
}