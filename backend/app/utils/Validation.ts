/**
 * Clase encargada de la validez de datos ingresados
 */

const MAX_IMAGE_SIZE: Number = 3;

const EMAIL_REGEX: RegExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
const SPECIAL_REGEX: RegExp = /[*%<>)(}{]/;
const DIGIT_REGEX: RegExp = /^[0-9]+$/;
const TEXT_REGEX: RegExp = /^[a-zA-Z ]+$/;

const VALID_INGREDIENT_TYPES: Array<String> = ['both', 'roll', 'dish'];
const VALID_MIMETYPES: Array<String> = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

class Validation {

  // Esta función valida el formato del correo
  verifyEmailFormat = (mail: string) => EMAIL_REGEX.test(mail);

  // Esta función valida que no entren caracteres especiales
  verifySpecialCharacters = (input: string) => !SPECIAL_REGEX.test(input);

  // Esta función verifica el tamaño máximo de los caracteres ingresados
  verifyMaxSize = (input: string, max: number) => input.length <= max;

  //Esta función verifica el tamaño mínimo de los caracteres ingresados
  verifyMinSize = (input: string, min: number) => input.length >= min;

  // Esta función verifica el tamaño máximo del numero
  verifyMinNumber = (input: number, min: number) => input >= min;

  //Esta función verifica el tamaño mínimo del numero
  verifyMaxNumber = (input: number, max: number) => input <= max;

  // Esta función verifica que el dato ingresado sea un numero
  verifyNumber = (number: string) => DIGIT_REGEX.test(number);

  // Esta función verifica que el dato ingresado sea un número entero positivo
  verifyPositive = (number: number) => number >= 0;

  // Esta función verifica que el argumento ingresado sea solo texto 
  verifyText = (input: string) => TEXT_REGEX.test(input);

  // Esta función verifica la fecha
  verifyDate = (date: string) => new Date(date).toString() !== 'Invalid Date';

  // Esta función verifica el tipo de ingrediente
  verifyIngredientType = (input: string) => VALID_INGREDIENT_TYPES.includes(input);

  // Esta función verifica que la imagen este en el rango permitido
  verifyImageSize = (size: number) => (size / 1048576) <= MAX_IMAGE_SIZE;

  // Esta función verifica que el tipo de dato sea permitido
  verifyImageType = (mimetype: string) => VALID_MIMETYPES.includes(mimetype);

}

export default Validation;