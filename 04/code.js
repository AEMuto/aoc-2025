import fs from "fs/promises";
import path from "path";

const data = await fs.readFile(
  path.join(process.cwd(), "04", "input.txt"),
  "utf8"
);

const testData = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;

const map = data.split("\n").map((row) => row.split(""));

// prettier-ignore
function lookAround(x, y, map) {
  return {
    nw: y - 1 >= 0 && x - 1 >= 0 
      ? map[y - 1][x - 1] 
      : undefined,
    n:  y - 1 >= 0 
      ? map[y - 1][x] 
      : undefined,
    ne: y - 1 >= 0 && x + 1 < map[y].length 
      ? map[y - 1][x + 1] 
      : undefined,
    e:  x + 1 < map[y].length 
      ? map[y][x + 1] 
      : undefined,
    se: y + 1 < map.length && x + 1 < map[y].length
        ? map[y + 1][x + 1]
        : undefined,
    s: y + 1 < map.length 
      ? map[y + 1][x] 
      : undefined,
    sw: y + 1 < map.length && x - 1 >= 0 
      ? map[y + 1][x - 1] 
      : undefined,
    w: x - 1 >= 0 
      ? map[y][x - 1] 
      : undefined,
  };
}

let resultPart01 = 0;

for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    if (map[y][x] !== "@") continue;
    // prettier-ignore
    const paperRollsAround = Object
      .values(lookAround(x, y, map))
      .filter((a) => a === "@");
    if (paperRollsAround.length < 4) resultPart01++;
  }
}

console.log(
  `There are ${resultPart01} rolls of paper that can be accessed by a forklift.`
);

let removed = -1;
let total_removed = 0;
let count = 0;

while (removed !== 0) {
  // console.log("Round: ", count)
  let result = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] !== "@") continue;
      // prettier-ignore
      const paperRollsAround = Object
        .values(lookAround(x, y, map))
        .filter((a) => a === "@");
      if (paperRollsAround.length < 4) {
        result++;
        total_removed++;
        map[y][x] = ".";
      }
    }
  }
  removed = result;
  // console.log(removed);
  count++;
  // write resulting map in output.txt
  await fs.writeFile(
    path.join(process.cwd(), "04", `output-${String(count).padStart(3, '0')}.txt`),
    map
      .map((row) =>
        row
          .map((char) => {
            if (char === ".") return " ";
            if (char === "@") return "◉";
          })
          .join("")
      )
      .join("\n"),
    "utf8"
  );
}

console.log("Part 02: ", total_removed, ". In ", count + 1, " rounds.");
