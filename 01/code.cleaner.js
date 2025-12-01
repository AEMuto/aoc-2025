import fs from "fs/promises";
import path from "path";

let data = await fs.readFile(
  path.join(process.cwd(), "01", "input.txt"),
  "utf8"
);
data = data.split("\n").filter(Boolean);

const wrap = (n) => ((n % 100) + 100) % 100;

const countZerosCrossed = (start, distance, direction) => {
  if (direction === "R") {
    return Math.floor((start + distance) / 100);
  }
  const stepsToFirstZero = start === 0 ? 100 : start;
  if (distance < stepsToFirstZero) return 0;
  return 1 + Math.floor((distance - stepsToFirstZero) / 100);
};

let current = 50;
let password = 0;

data.forEach((line) => {
  const [direction, distance] = [line[0], parseInt(line.slice(1), 10)];

  password += countZerosCrossed(current, distance, direction);
  current = wrap(direction === "L" ? current - distance : current + distance);
});

console.log("Result:", password);
