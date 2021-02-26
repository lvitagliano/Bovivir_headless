

export const ruleString = (max=20) => {
  return {
      validate: {
          required: (value) => (value && value.trim().length > 0) || "Campo Requerido"
      },
      maxLength: {
          value: max,
          message: `El campo no debe tener mas de ${max} caracteres.`
      },
      pattern: {
          value: /^[ A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙñÑ.-]+$/,
          message: "El campo solo debe contener letras"
      }
    }
  }
export const ruleNumber = (max = 5) => {
  return {
    validate: {
        required: (value) => (value && value.trim().length > 0) || "Campo Requerido"
    },
    maxLength: {
        value: max,
        message: `El campo no debe tener mas de ${max} caracteres.`
    },
    pattern: {
        value: /^\d+$/,
        message: "El campo solo debe contener números"
    }
  }
}

export const ruleApartm = {
      validate: {
          required: (value) => (value && value.trim().length > 0) || "Campo Requerido"
      },
      maxLength: {
          value: 3,
          message: "El campo no debe tener mas de 3 caracteres."
      },
      pattern: {
          value: /^[a-zA-Z0-9]+$/,
          message: "El campo solo debe contener numeros o letras"
      }
    }

export const ruleReq = {
    validate: {
        required: (value) => (value && value.trim().length > 0) || "Campo Requerido"
    },
  }