const CancionConstraints = {
    titulo: { 
      type: 'string', 
      presence: {message: 'está vacío.'}, 
      length: {
        minimum: 3,
        maximum: 20,
        tooLong: "necesita tener %{count} letras más o menos.",
        tooShort: "necesita tener más de %{count} letras.",
        notValid: "no es válido."
      }
    },
    grupo: { 
        type: 'string', 
        presence: {message: 'está vacío.'}, 
        length: {
            minimum: 3,
            maximum: 20,
            tooLong: "necesita tener %{count} letras más o menos.",
            tooShort: "necesita tener más de %{count} letras.",
            notValid: "no es válido."
        }
      },
      genero: { 
        type: 'string', 
        presence: {message: 'está vacío.'}, 
        length: {
            minimum: 3,
            maximum: 20,
            tooLong: "necesita tener %{count} letras más o menos.",
            tooShort: "necesita tener más de %{count} letras.",
            notValid: "no es válido."
        }
      },
    anho: {
      type: 'number',
      presence: {message: 'está vacío.'},
      numericality: {
        onlyInteger: true
      }
    }
};

module.exports = CancionConstraints;