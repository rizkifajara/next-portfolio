import social from './social'
import skill from './skill'
import project from './project'
import experience from './experience'
import pageInfo from './pageInfo'
import { createSchema } from 'sanity'

export const schemaTypes = [pageInfo, experience, project, skill, social]

// export default createSchema({
//     name: 'default',
//     types: SchemaTypes.concat(schemaTypes)
// })