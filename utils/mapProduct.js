import { v4 as uuid } from 'uuid'

export const mapProduct = (nodes) => {   
    return ({
        id: uuid(),
        uri: nodes.uri,
        title: nodes.title,
        nameTaxonomy: nodes.productFields.productCategory.name,
        featuredImage: nodes.featuredImage.node.mediaItemUrl
    })
}