import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Order of the experience in the experience list'
    }),
    defineField({
      name: 'jobTitle',
      title: 'JobTitle',
      type: 'string',
    }),
    defineField({
      name: 'companyImage',
      title: 'CompanyImage',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'company',
      title: 'CompanyText',
      type: 'string',
    }),
    defineField({
      name: 'dateStarted',
      title: 'DateStarted',
      type: 'string',
    }),
    defineField({
      name: 'dateEnded',
      title: 'DateEnded',
      type: 'string',
    }),
    defineField({
      name: 'isCurrentlyWorkingHere',
      title: 'isCurrentlyWorkingHere',
      type: 'boolean',
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {
            type: 'skill',
          }
        }
      ]
    }),
    defineField({
      name: 'points',
      title: 'Points',
      type: 'array',
      of: [
        {
          type: 'string',
        }
      ]
    }),
    defineField({
      name: 'linkToBuild',
      title: 'LinkToBuild',
      type: 'url',
    }),
  ],
  orderings: [
    {
      title: 'Experience Order',
      name: 'experienceOrder',
      by: [
        {field: 'order', direction: 'asc'}
      ]
    }
  ]
})
