import { v4 as uuid } from 'uuid'

export const mapStyles = (nodes) => {    
    return nodes.map((nodeItem) => ({
        id: uuid(),
        uri: nodeItem.uri,
        title: nodeItem.title,
        nameTaxonomy: nodeItem.styleFields.stylesGroup.styleCategory.name,        
        steps: (nodeItem.styleFields.steps || []).map((steps) => ({
            id: uuid(),
            feminineImageStep: steps.feminineImageStep,
            masculineImageStep: steps.masculineImageStep
        }))
    }))
} 