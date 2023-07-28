import { gql } from "@apollo/client";
import client from "client";
import Layout from '/components/layout'
import { getProductStaticProps } from "utils/getPageStaticProps"

const Product = (props) => {
    const { title, nameTaxonomy, featuredImage } = props.product;
    console.log(props.product)
    return (
        <>
            <Layout
                title={title}
                description={''}
            >
            <div className={`content-container}`}>
                Desde Product
                <p>{title}</p>
                <p>{nameTaxonomy}</p>
                <p>{featuredImage}</p>
            </div>
        </Layout>
        </>  
    );
};

export default Product;

export const getStaticProps = getProductStaticProps;

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