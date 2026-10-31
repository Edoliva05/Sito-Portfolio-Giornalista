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
    // NUOVO CAMPO: Scelta testata
    {
      name: 'testata',
      title: 'Testata Giornalistica',
      type: 'string',
      options: {
        list: [
          { title: 'La Nazione', value: 'La Nazione' },
          { title: 'Scomodo', value: 'Scomodo' },
          { title: 'Buzz Prato', value: 'Buzz Prato' },
          { title: 'Generazione News', value: 'Generazione News' }
        ],
        layout: 'radio'
      }
    },
    {
      name: 'link',
      title: 'Link all\'Articolo Online (Se presente)',
      type: 'url'
    },
    {
      name: 'body',
      title: 'Testo dell\'Articolo (Per i pezzi cartacei)',
      type: 'text',
      description: 'Se l\'articolo è solo cartaceo, incolla qui il testo completo.'
    }
  ]
}