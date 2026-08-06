import fs from "node:fs";

fs.writeFile("async.txt", "osojidbv", (err) => {
  if (err) {
    console.log(err);
  }
  console.log("File written Succesfully");
});

fs.readFile("async.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(data);
});
