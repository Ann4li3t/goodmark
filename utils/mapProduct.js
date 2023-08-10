import { v4 as uuid } from 'uuid'

export const mapProduct = (nodes) => {   
    return ({
        id: uuid(),
        uri: nodes.uri,
        title: nodes.title,
        nameTaxonomy: nodes.productFields.productCategory.name,
        content: nodes.blocks && nodes.blocks[0] && nodes.blocks[0].attributes ? nodes.blocks[0].attributes.content : '',
        featuredImage: nodes.featuredImage.node.mediaItemUrl,

        gender: nodes.productFields.gender,
        qualitySeals: (nodes.productFields?.qualitySeals || []).map((seal) => ({
            id: uuid(),
            name: seal.name,
            sealImage: seal.taxQualitySeals?.imgQualitySeals?.mediaItemUrl
        })), 
    })
}