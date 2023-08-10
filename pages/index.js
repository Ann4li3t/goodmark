import React, { useContext } from 'react'
import { StateContext } from 'context/stateContext'
import Layout from '../components/layout'
import { Avatars } from 'components/avatars'
import { getStylesStaticProps } from "utils/getPageStaticProps"
import { Styles } from 'components/styles'

export default function Home(props) {
  const { globalState } = useContext(StateContext);
  return (
    <>       
        <Layout
          title={'FaceStyles'}
          description={''}
        >
          {globalState === null ? (
              <Avatars />
            ) : (
              <Styles propsStyles={props.styles}  />                
            )}        
        </Layout >          
    </>
  )
}

export const getStaticProps = getStylesStaticProps;