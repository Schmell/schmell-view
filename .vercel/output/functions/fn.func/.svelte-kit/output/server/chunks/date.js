const getRandomValues = (bytes) => {
  return crypto.getRandomValues(new Uint8Array(bytes));
};
const DEFAULT_ALPHABET = "abcdefghijklmnopqrstuvwxyz1234567890";
const generateRandomString = (size, alphabet = DEFAULT_ALPHABET) => {
  const mask = (2 << Math.log(alphabet.length - 1) / Math.LN2) - 1;
  const step = -~(1.6 * mask * size / alphabet.length);
  let bytes = getRandomValues(step);
  let id = "";
  let index = 0;
  while (id.length !== size) {
    id += alphabet[bytes[index] & mask] ?? "";
    index += 1;
    if (index > bytes.length) {
      bytes = getRandomValues(step);
      index = 0;
    }
  }
  return id;
};
const isWithinExpiration = (expiresInMs) => {
  const currentTime = Date.now();
  if (currentTime > expiresInMs)
    return false;
  return true;
};
export {
  generateRandomString as g,
  isWithinExpiration as i
};
