import fs from "fs/promises";
import path from "path";

let data = await fs.readFile(
  path.join(process.cwd(), "01", "input.txt"),
  "utf8"
);
data = data.split("\n");

const testData = [
  "L68",
  "L30",
  "R48",
  "L5",
  "R60",
  "L55",
  "L1",
  "L99",
  "R14",
  "L82",
];

// console.log(data);
// We start at 50, when over 99 we circle back to 0, when below 0 we circle back to 99
let current = 50;
let password = 0;

// my answer
function mapNum(num, currIsZero) {
  let pointAtZero = 0;
  function mapNumInner(num, currIsZero) {
    if (num === 100) return 0;
    if (num > 100) {
      console.log("Over 99");
      pointAtZero++;
      return mapNumInner(num - 100, currIsZero);
    }
    if (num < 0) {
      console.log("Under 0");
      if (!currIsZero) {
        pointAtZero++;
      } else {
        if (num < -99) pointAtZero++;
      }
      return mapNumInner(100 - num * -1, currIsZero);
    }
    return num;
  }
  const newNum = mapNumInner(num, currIsZero);
  console.log("Point at Zero: ", pointAtZero);
  password += pointAtZero;
  return newNum;
}

// ai answer
function mapNumModulo(num) {
  return ((num % 100) + 100) % 100;
}

// ai answer
function countZerosCrossed(start, distance, direction) {
  if (direction === 'R') {
    // Count how many times we hit exactly 100, 200, 300... during travel
    return Math.floor((start + distance) / 100);
  } else {
    // Count how many times we hit exactly 0, -100, -200... (excluding start if at 0)
    const stepsToFirstZero = start === 0 ? 100 : start;
    if (distance < stepsToFirstZero) return 0;
    return 1 + Math.floor((distance - stepsToFirstZero) / 100);
  }
}

data.forEach((line, index) => {
  // if (index > 9) return;
  console.log(line);
  let [direction, ...num] = line.split("");
  num = parseInt(num.join(""), 10);
  password += countZerosCrossed(current, num, direction);
  if (direction === "L") {
    // const newNum = mapNum(current - num, current === 0);
    const newNum = mapNumModulo(current - num, current === 0);
    console.log("Direction is Left, substracting ", num, " to ", current);
    console.log("New num is ", newNum);
    current = newNum;
  }
  if (direction === "R") {
    // const newNum = mapNum(current + num, current === 0);
    const newNum = mapNumModulo(current + num, current === 0);
    console.log("Direction is Right, adding ", num, " to ", current);
    console.log("New num is ", newNum);
    current = newNum;
  }
  // if (current === 0) password++;
  console.log(current);
});

console.log("Result: ", password);
