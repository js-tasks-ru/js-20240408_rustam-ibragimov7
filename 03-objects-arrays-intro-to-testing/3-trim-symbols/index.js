/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  let result = "";
  let i = 0;

  while (i < string.length) {
    let current = string[i];
    let r = i;

    while (string[i] === current) {
      i++;
    }
    result += current.repeat(i - r).slice(0, size);
  }
  return result;
}
