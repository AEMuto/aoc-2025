import fs from "fs/promises";
import path from "path";

let data = await fs.readFile(
  path.join(process.cwd(), "02-Structural_Patterns", "input.txt"),
  "utf8"
);
data = data.split(",").map((range) => range.split("-").map((num) => +num));

const testData = [
  [11, 22],
  [95, 115],
  [998, 1012],
  [1188511880, 1188511890],
  [222220, 222224],
  [1698522, 1698528],
  [446443, 446449],
  [38593856, 38593862],
  [565653, 565659],
  [824824821, 824824827],
  [2121212118, 2121212124],
];

function range(start, end, step = 1) {
  let result = [];
  for (let a = start; a < end; a += step) {
    result.push(a);
  }
  return result;
}

function isSillyNumberV1(num) {
  // Convert to string, split in middle, see if equal, yes ? -> silly_number
  const str = num.toString();
  // If length is odd we cannot have: "you can find the invalid IDs by looking
  // for any ID which is made only of some sequence of digits repeated twice."
  if (str.length % 2 > 0) return false;
  const middle = str.length / 2;
  const [left, right] = [str.slice(0, middle), str.slice(middle)];
  // console.log("left: ", left, " right: ", right);
  return left === right;
}

function isRepeatingPattern(num) {
  const str = num.toString();
  const len = str.length;

  // We only need to check pattern lengths up to half the string.
  // (You can't have a repeating pattern longer than half the string)
  for (let i = 1; i <= len / 2; i++) {
    // 1. Only check if the total length is divisible by this pattern length
    if (len % i === 0) {
      // 2. Extract the potential pattern (e.g., "21")
      const pattern = str.substring(0, i);

      // 3. Repeat that pattern enough times to fill the length
      // If pattern is "21" and length is 6, we repeat "21" 3 times.
      const repeated = pattern.repeat(len / i);

      // 4. strictly compare
      if (repeated === str) {
        return true; // Match found!
      }
    }
  }

  return false;
}

function isRepeatingMath(num) {
  const s = num.toString();
  // Double the string, strip first and last char, see if original exists inside
  return (s + s).slice(1, -1).includes(s);
}

function isRepeatingRegex(num) {
  // ^      : Start of line
  // (.+)   : Capture group 1 (any sequence of 1 or more characters)
  // \1+    : Match exactly what was in group 1, one or more times
  // $      : End of line
  return /^(.+)\1+$/.test(num.toString());
}

let result = 0;
data.forEach((range, _i) => {
  const [start, end] = range;
  for (let i = start; i <= end; i++) {
    if (isRepeatingRegex(i)) result += i;
  }
});

console.log(result);

/**
 * Useful concrete thingy we can do thx to some of the studied logic above
 * 
 * User types: "1234567812345678"
 * We want: "1234 5678 1234 5678"
 * We split the string into chunks of 4, just like checking for a pattern of length 4
 * const formatLicenseKey = (str) => {
 *  return str.match(/.{1,4}/g).join(' '); 
 * };
 */