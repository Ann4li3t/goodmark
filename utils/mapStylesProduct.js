import { v4 as uuid } from 'uuid'

export const mapStylesProduct = (nodes) => {    
    return nodes.map((nodeItem) => ({
        id: uuid(),
        uri: nodeItem.uri,
        title: nodeItem.title,        
        madeWithTitle: nodeItem.styleFields.stylesGroup.madeWith.title,
        madeWithUri: nodeItem.styleFields.stylesGroup.madeWith.uri,
        nameTaxonomy: nodeItem.styleFields.stylesGroup.styleCategory.name,        
        steps: (nodeItem.styleFields.steps || []).map((steps) => ({
            id: uuid(),
            feminineImageStep: steps.feminineImageStep,
            masculineImageStep: steps.masculineImageStep
        })),
        youCanAlsoUse: (nodeItem.styleFields.stylesGroup.youCanAlsoUse || []).map((product) => ({
            id: uuid(),
            youCanAlsoUseTitle: product.title,
            youCanAlsoUseUri: product.uri,
            youCanAlsoUseFeaturedImage: product.featuredImage.node.mediaItemUrl
        })),
        youCanAdd: (nodeItem.styleFields.stylesGroup.youCanAdd || []).map((product) => ({
            id: uuid(),
            youCanAddTitle: product.title,
            youCanAddUri: product.uri,
            youCanAddFeaturedImage: product.featuredImage.node.mediaItemUrl
        }))
    }))
}