import fs from "node:fs";
import path from "node:path";

const filePath = path.resolve("test.txt");

// write;
fs.writeFileSync("test.txt", "Harshal");

// read;
const data = fs.readFileSync("test.txt", "utf-8");
console.log(data);

console.log("File path:", filePath);

// adding new text inside file -:
fs.appendFileSync(filePath, "\nHello from Harshal");

// creating folder-:
fs.mkdirSync("myFolder/innerFolder");
fs.mkdirSync("Har");
fs.mkdirSync("Har/h");

// delete
fs.unlinkSync("test.txt");

fs.writeFileSync("test.txt", "nnnnn");

//rename to file
fs.renameSync("test.txt", "test1.txt");

//copy file data
fs.cpSync("test1.txt", "finalTest.txt");

fs.rmdirSync("myFolder", { recursive: true });
