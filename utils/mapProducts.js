import { v4 as uuid } from 'uuid'

export const mapProducts = (nodes) => {    
    return nodes.map((nodeItem) => ({
        id: uuid(),
        uri: nodeItem.uri,
        title: nodeItem.title,
        nameTaxonomy: nodeItem.productFields.productCategory.name,
        featuredImage: nodeItem.featuredImage.node.mediaItemUrl
    }))
}