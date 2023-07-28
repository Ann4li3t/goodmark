import { gql } from "@apollo/client"
import client from "client"
import { mapProducts } from "utils/mapProducts";
import { mapStyles } from "./mapStyles";
import { mapProduct } from "./mapProduct";
import { mapStyle } from "./mapStyle";

const getStylesStaticProps  = async () => {   
    const { data } = await client.query({
      query: gql`
        query styles {
          styles {
            nodes {
              title
              uri
              styleFields {
                steps {
                  feminineImageStep {
                    mediaItemUrl
                  }
                  masculineImageStep {
                    mediaItemUrl
                  }
                }
                stylesGroup {
                  styleCategory {
                      taxonomyName
                      name            
                  }
                }
              }
            }
          }
        }      
      `,
    });
    const styles = mapStyles(data.styles.nodes || null)
    return {
      props: {      
        styles: styles
      }
    };
};

const getProductsStaticProps  = async () => {   
  const { data } = await client.query({
    query: gql`
    query products {
      products {
        nodes {
          uri
          title
          slug  
          blocks        
          productFields {
            productCategory {
              name
            }
          }
          featuredImage {
            node {
              mediaItemUrl
            }
          }            
        }
      }      
    }
    `,
  });
  const products = mapProducts(data.products.nodes || null)
  return {
    props: {      
      products: products
    }
  };
};

const getProductStaticProps = async (context) => {

  const uri = `products/${context.params?.url}`

  const { data } = await client.query({
    query: gql`
      query PageQuery ($uri: String!) {        
        nodeByUri(uri: $uri) {
          ... on Product {
            id
            uri
            title
            slug
            featuredImage {
              node {
                mediaItemUrl
              }
            }
            productFields {
              productCategory {          
                name
              }
            }
          }           
        }        
      }        
    `,
    variables: {
      uri,
    },
  })

  if (!data.nodeByUri) {
    return {
        redirect: {
            destination: '/error404',
            permanent: false,
        },
    };
  }
  
  const product = mapProduct(data.nodeByUri || null)
  return {
    props: {      
      product: product
    }
  };
}

const getStyleStaticProps = async (context) => {

  const uri = `facestyles/${context.params?.url}`

  const { data } = await client.query({
    query: gql`      
      query Style ($uri: String!){
        nodeByUri(uri: $uri) {
          id
          uri
          ... on Style {
            id
            featuredImage {
              node {
                mediaItemUrl
              }
            }
            blocks
            slug
            title
            uri
             styleFields {
              steps {
                descriptionStep
                feminineImageStep {
                  mediaItemUrl
                }
                masculineImageStep {
                  mediaItemUrl
                }
                numberStep
              }
              stylesGroup {
                styleCategory {
                  taxonomyName
                  name
                }
                madeWith {
                  ... on Product {
                    id
                    uri
                    title
                    featuredImage {
                      node {
                        mediaItemUrl
                        title
                        uri
                      }
                    }
                  }
                }
                youCanAdd {
                  ... on Product {
                    id
                    uri
                    title
                    featuredImage {
                      node {
                        mediaItemUrl
                      }
                    }
                  }
                }
                youCanAlsoUse {
                  ... on Product {
                    id
                    uri
                    title
                    featuredImage {
                      node {
                        mediaItemUrl
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }       
    `,
    variables: {
      uri,
    },
  })

  if (!data.nodeByUri) {
    return {
        redirect: {
            destination: '/error404',
            permanent: false,
        },
    };
  }
  
  const style = mapStyle(data.nodeByUri || null)
  return {
    props: {      
      style: style
    }
  };
}
  
export {
  getStylesStaticProps,
  getProductsStaticProps,
  getProductStaticProps,
  getStyleStaticProps
}