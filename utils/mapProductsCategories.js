import { v4 as uuid } from 'uuid'

export const mapProductsCategories = (nodes) => {    
    return nodes.map((nodeItem) => ({
        id: uuid(),
        nameTaxonomy: nodeItem.name,
        imgTaxonomy: nodeItem.taxProductCategory.groupProductCategory.imgProductCategory?.mediaItemUrl || null,
        priorityTaxonomy: nodeItem.taxProductCategory.groupProductCategory.priorityProductCategory || null
    }))
}