
// Valores constantes de validacion.
const MAX_IMAGE_SIZE: Number = 3;
const VALID_MIMETYPES: Array<String> = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

// Metodos de verificacion de imagen.
export const verifyImageType = (mimetype: string) => VALID_MIMETYPES.includes(mimetype);
export const verifyImageSize = (size: number) => (size / 1048576) <= MAX_IMAGE_SIZE;