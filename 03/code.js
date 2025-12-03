import fs from "fs/promises";
import path from "path";

const data = await fs.readFile(
  path.join(process.cwd(), "03", "input.txt"),
  "utf8"
);

const testData = `987654321111111
811111111111119
811111111111881
234234234234278
818181911112111`;

const batteries = data.split("\n").map((line) => line.split("").map(Number));

let result_01 = 0;

batteries.forEach((battery) => {
  const maxes = [0];
  for (let i = 0; i < battery.length; i++) {
    if (battery[i] >= maxes[maxes.length - 1]) maxes.push(battery[i]);
  }
  // console.log("First loop maxes: ", maxes);
  const first_max = maxes[maxes.length - 1];
  const sec_max = maxes[maxes.length - 2];
  if (
    battery.lastIndexOf(first_max) === battery.length - 1 ||
    first_max === sec_max
  ) {
    // result.push(+`${sec_max}${first_max}`);
    result_01 += +`${sec_max}${first_max}`;
  } else {
    // Find max forward current max
    const start = battery.lastIndexOf(maxes[maxes.length - 1]) + 1;
    const battery_right = battery.slice(start);
    const forward_max = Math.max(...battery_right);
    // result.push(+`${first_max}${forward_max}`);
    result_01 += +`${first_max}${forward_max}`;
  }
});

console.log("Part 01:\n", result_01);

let result_02 = 0;
batteries.forEach((battery) => {
  const clone = [...battery];
  // console.log("Clone start: ", clone);
  while (clone.length > 12) {
    for (let i = 0; i <= clone.length; i++) {
      // console.log(clone[i], clone[i + 1]);
      if (clone[i] < clone[i + 1]) {
        // console.log("Deleting: ", clone[i], ". At index: ", i);
        clone.splice(i, 1);
        // console.log(
        //   "Modified clone: ",
        //   clone,
        //   ". Length is now: ",
        //   clone.length
        // );
        break;
      }
      if (i === clone.length - 1) {
        const first_lowest = Math.min(...clone);
        const index_lowest = clone.indexOf(first_lowest);
        // console.log(
        //   `Reached clone end, deleting first lowest number at index ${index_lowest}, value is ${first_lowest}`
        // );
        clone.splice(index_lowest, 1);
      }
    }
  }
  result_02 += +clone.join("");
});

console.log("Part 02:\n", result_02);
