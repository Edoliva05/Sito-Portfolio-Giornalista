export default {
  name: 'articolo',
  title: 'Articolo',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titolo dell\'Articolo',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'date',
      title: 'Data di Pubblicazione',
      type: 'date',
      validation: Rule => Rule.required()
    },
    {
      name: 'coverImage',
      title: 'Immagine di Copertina / Foto del Ritaglio',
      type: 'image',
      options: { hotspot: true }
    },
    // Opzione A: Se l'articolo è online, mette il link
    {
      name: 'link',
      title: 'Link all\'Articolo Online (Se presente)',
      type: 'url'
    },
    // Opzione B: Se è cartaceo, può incollare il testo qui dentro
    {
      name: 'body',
      title: 'Testo dell\'Articolo (Per i pezzi cartacei)',
      type: 'text',
      description: 'Se l\'articolo è solo cartaceo, incolla qui il testo completo.'
    }
  ]
}