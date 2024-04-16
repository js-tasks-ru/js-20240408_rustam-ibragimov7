/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  const newObj = [];

  if (string) {
    newObj.push(
      string.split("").reduce((newStr, Str) => {

        if (newStr.includes(Str)) {
          newStr += Str;
        } else {
          newObj.push(newStr);
          newStr = Str;
        }
        return newStr;
      })
    );
  }

  return newObj.map((string) => (string.length > size ? string.slice(0, size) : string)).join("");
}

