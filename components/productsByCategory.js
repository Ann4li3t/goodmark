import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client'
import { mapProducts } from 'utils/mapProducts'
import { getRandomColor, isPngImage } from 'utils/utils'
import styles from '../styles/productsIndex.module.css'


const GET_PRODUCTS = gql`
  query getProducts($first: Int!, $after: String, $categoryName: [String]) {
    productsCategories(where: { name: $categoryName }) {
      edges {
        node {
          products(first: $first, after: $after) {
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              node {
                title
                uri
                slug
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
`;

export default function LoadMoreList() {
  const router = useRouter();
  const selectedCategory = router.query.selectedCategory;  
  let products = []
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: { first: 300, after: null, categoryName: [selectedCategory]},
    notifyOnNetworkStatusChange: true, 
    fetchPolicy: 'network-only',        
    returnPartialData: true,
  });

  if (data) {      
    const nodes = data?.productsCategories?.edges.flatMap((categoryEdge) => {
        return categoryEdge.node.products.edges.map((productEdge) => productEdge.node);
    });  
    if (nodes ) {
      products = mapProducts(nodes);     
    }
  } 

  if (loading) return <div className="sk-fading-circle">
                        <div className="sk-circle1 sk-circle"></div>
                        <div className="sk-circle2 sk-circle"></div>
                        <div className="sk-circle3 sk-circle"></div>
                        <div className="sk-circle4 sk-circle"></div>
                        <div className="sk-circle5 sk-circle"></div>
                        <div className="sk-circle6 sk-circle"></div>
                        <div className="sk-circle7 sk-circle"></div>
                        <div className="sk-circle8 sk-circle"></div>
                        <div className="sk-circle9 sk-circle"></div>
                        <div className="sk-circle10 sk-circle"></div>
                        <div className="sk-circle11 sk-circle"></div>
                        <div className="sk-circle12 sk-circle"></div>
                      </div>;
  if (error) return <p>Error al cargar los productos</p>;

  return (
    <>
      {products.map((product) => {          
        const { featuredImage, id, title, uri } = product;          
        const isImagePng = isPngImage(featuredImage);

        const randomColor = isImagePng ? getRandomColor() : '#fff';
        return (
          <div key={id}>
            <Link
              key={id}
              className={`shadow ${styles.wrapperProduct}`}
              href={uri}
            > 
            <h3 className={styles.titleAllProduct}>{title}</h3>              

            <div className={styles.imageWrapperLink} style={{ backgroundColor: randomColor }}>
                  <Image
                    src={featuredImage}
                    alt="Descripción de la imagen"
                    width={400}
                    height={400}
                  />
                </div>                       
            </Link>           
          </div>     
        );
      })}
    </>
  );      
}
