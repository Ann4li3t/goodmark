import { useRouter } from 'next/router'
import Image from 'next/image'
import Layout from '/components/layout'
import styles from '../styles/productsIndex.module.css'
import { Assets } from 'components/assets'
import { ApolloProvider } from "@apollo/client"
import { client } from "../client"
import LoadMoreList from 'components/productsByCategory'

const AllProducts = ({products}) => {
  const router = useRouter();
 const selectedCategory = router.query.selectedCategory;  

  return (
    <>      
      <Layout
        title={'Products'}
        description={''}
      >  
      <div className={`content-container ${styles.contentProducts}`}>
      <Assets />    
        <div className={styles.contentTitleProducts}>
          <h3>Products for every occasion</h3>
              <Image 
                  src="/img/assets/asset-stars.png" 
                  width={72} 
                  height={22} 
                  alt='imagen asset stars' /> 
        </div>
        <h1>{selectedCategory}</h1>
        <div className={`contenedor ${styles.containerAll}`}>
          <div className={styles.containerAllProducts}> 
            <ApolloProvider client={client}>
                <LoadMoreList />
            </ApolloProvider>  
          </div>
        </div>
      </div>
    </Layout>      
    </>
  );
};

export default AllProducts;
