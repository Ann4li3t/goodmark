import { gql } from "@apollo/client"
import { client } from "client"
import { mapProducts } from "utils/mapProducts";
import { mapStyles } from "./mapStyles";
import { mapProduct } from "./mapProduct";
import { mapStyle } from "./mapStyle";
import { mapProductsCategories } from "./mapProductsCategories";
import { mapStylesProduct } from "./mapStylesProduct";

const getProductsCategoriesStaticProps  = async () => {   
  const { data } = await client.query({
    query: gql`
    query productsCategories {
      productsCategories {
        nodes {
          taxProductCategory {
            groupProductCategory {
              priorityProductCategory
              imgProductCategory {
                mediaItemUrl
              }
            }
          }
          name
        }
      }
    }     
    `,
  });
  const productsCategories = mapProductsCategories(data.productsCategories.nodes || null)
  
  return {
    props: {      
      productsCategories: productsCategories
    }
  };
};

const getProductsStaticProps  = async () => {   
  const { data } = await client.query({
    query: gql`
    query products {
      products(first: 150) {
        nodes {
          uri
          title
          slug  
          blocks        
          productFields {
            productCategory {
              name
              taxProductCategory {
                groupProductCategory {
                  imgProductCategory {
                    mediaItemUrl
                  }
                }
              }
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
            blocks
            featuredImage {
              node {
                mediaItemUrl
              }
            }         
            productFields {
              gender            
              productCategory {
                name
                taxProductCategory {
                  groupProductCategory {
                    imgProductCategory {
                      mediaItemUrl
                    }
                  }
                }
              }
              sealQualityApproved
              qualitySeals {
                name
                taxQualitySeals {
                  imgQualitySeals {
                    mediaItemUrl
                  }
                }              
              }
            }
          }           
        } 
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
  const styles = mapStylesProduct(data.styles.nodes || null)
  return {
    props: {      
      product: product,
      styles: styles
    }
  };
}

const getStylesStaticProps  = async () => {   
  const { data, loading, error } = await client.query({
    query: gql`
      query styles {
        styles(first: 300) {
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
  
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los productos</p>;

  const styles = mapStyles(data.styles.nodes || null)
  return {
    props: {      
      styles: styles
    }
  };
};

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
  getStyleStaticProps,
  getProductsCategoriesStaticProps
}