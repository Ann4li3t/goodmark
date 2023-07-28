import Layout from '/components/layout'
import { Assets } from 'components/assets'
import { getProductsStaticProps } from "utils/getPageStaticProps"
import styles from '../styles/productsIndex.module.css'

export default function Products(props) {
  console.log('Props Products:', props.products)
  return (
    <>      
      <Layout
        title={'Products'}
        description={''}
      >        
        <div className={`content-container ${styles.contentProducts}`}>
          <Assets />
          <div className={`contenedor`}>
            <h1>Products</h1>
          </div>
        </div>
      </Layout>      
    </>
  )
}

export const getStaticProps = getProductsStaticProps;