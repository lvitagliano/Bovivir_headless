export const ruleReq = {
  validate: {
    required: value => (value && value.trim().length > 0) || 'Campo Requerido',
  },
}

export const ruleString = (max = 20) => {
  return {
    validate: {
      required: value => (value && value.trim().length > 0) || 'Campo Requerido',
    },
    maxLength: {
      value: max,
      message: `El campo no debe tener mas de ${max} caracteres.`,
    },
    pattern: {
      value: /^[A-Za-z ñÑ]+$/,
      message: 'El campo solo debe contener letras',
    },
  }
}

export const ruleNumber = (max = 5, min = 1) => {
  return {
    validate: {
      required: value => (value && value.trim().length > 0) || 'Campo Requerido',
    },
    maxLength: {
      value: max,
      message: `El campo no debe tener mas de ${max} caracteres.`,
    },
    minLength: {
      value: min,
      message: `El campo debe tener mas de ${min} caracteres.`,
    },
    pattern: {
      value: /^\d+$/,
      message: 'El campo solo debe contener números',
    },
  }
}

export const ruleEmail = {
  validate: {
    required: value => (value && value.trim().length > 0) || 'Campo Requerido',
  },
  maxLength: {
    value: 50,
    message: 'El campo no debe tener mas de 50 caracteres.',
  },
  pattern: {
    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    message: 'Ingrese un email válido',
  },
}

export const ruleCuit = {
  validate: {
    required: value => (value && value.trim().length > 0) || 'Campo Requerido',
    validateCuit: value => validateCuit(value) || 'C.U.I.T No valido',
  },
  pattern: {
    value: /^[0-9]{2}-[0-9]{8}-[0-9]$/,
    message: 'Ingrese un CUIT válido',
  },
}

export const ruleDni = {
  validate: {
    required: value => (value && value.trim().length > 0) || 'Campo Requerido',
  },
  maxLength: {
    value: 8,
    message: 'El campo no debe tener mas de 8 caracteres.',
  },
  minLength: {
    value: 7,
    message: 'El campo debe tener mas de 7 caracteres.',
  },
  pattern: {
    value: /^\d+$/,
    message: 'El campo solo debe contener numeros',
  },
}

export const rulePassword = {
  validate: {
    required: value => (value && value.trim().length > 0) || 'Campo Requerido',
  },
  maxLength: {
    value: 20,
    message: 'El campo no debe tener mas de 20 caracteres.',
  },
  minLength: {
    value: 8,
    message: 'El campo debe tener mas de 8 caracteres.',
  },
  pattern: {
    // value: /^.*(?=.{8,20})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    value: /^.*(?=.{8,20})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    message:
      'El Password debe ser una combinación de una minúscula, una mayúscula, un caracter especial, un número y una longitud entre 8 y 20 caracteres',
  },
}

const validateCuit = cuit => {
  if (!cuit) {
    return false
  }

  const cuitStr = cuit.toString().replace(/\D/g, '')

  if (cuitStr.length !== 11) {
    return false
  }

  let acumulado = 0
  const digitos = cuitStr.split('')
  const digito = digitos.pop()

  for (let i = 0; i < digitos.length; i += 1) {
    acumulado += digitos[9 - i] * (2 + (i % 6))
  }

  let verif = 11 - (acumulado % 11)

  if (verif === 11) {
    verif = 0
  } else if (verif === 10) {
    verif = 9
  }

  if (Number(digito) !== Number(verif)) {
    return false
  }

  const validCheckDigits = ['20', '23', '27', '30', '33']

  return validCheckDigits.indexOf(cuit.substr(0, 2)) !== -1
}
