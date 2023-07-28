import { v4 as uuid } from 'uuid'

export const mapStyle = (nodes) => {    
    return ({
        id: uuid(),
        uri: nodes.uri,
        title: nodes.title,
        nameTaxonomy: nodes.styleFields.stylesGroup.styleCategory.name,
        madeWithTitle: nodes.styleFields.stylesGroup.madeWith.title,
        madeWithUri: nodes.styleFields.stylesGroup.madeWith.uri,
        madeWithFeaturedImage: nodes.styleFields.stylesGroup.madeWith.featuredImage.node.mediaItemUrl,
        steps: (nodes.styleFields.steps || []).map((steps) => ({
            id: uuid(),
            numberStep: steps.numberStep,
            descriptionStep: steps.descriptionStep,
            feminineImageStep: steps.feminineImageStep,
            masculineImageStep: steps.masculineImageStep
        })),        
        youCanAlsoUse: (nodes.styleFields.stylesGroup.youCanAlsoUse || []).map((product) => ({
            id: uuid(),
            youCanAlsoUseTitle: product.title,
            youCanAlsoUseUri: product.uri,
            youCanAlsoUseFeaturedImage: product.featuredImage.node.mediaItemUrl
        })),
        youCanAdd: (nodes.styleFields.stylesGroup.youCanAdd || []).map((product) => ({
            id: uuid(),
            youCanAddTitle: product.title,
            youCanAddUri: product.uri,
            youCanAddFeaturedImage: product.featuredImage.node.mediaItemUrl
        }))
    })
} 