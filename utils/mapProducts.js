import { v4 as uuid } from 'uuid'

export const mapProducts = (nodes) => {    
    return nodes.map((nodeItem) => ({
        id: uuid(),
        uri: nodeItem.uri,
        title: nodeItem.title,
        featuredImage: nodeItem.featuredImage.node.mediaItemUrl
    }))
}