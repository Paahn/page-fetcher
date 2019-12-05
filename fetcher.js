const request = require('request');
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let args = process.argv.slice(2);
// console.log(args[0][0]);

request(args[0], (error, response, body) => {
// wrong url
  if (error) {
    console.log("URL does not exist.");
    rl.close();
  } else { //file exists already, give 2 options to overwrite or peace out
    if (fs.existsSync(args[1])) {
      rl.question(`File already exists, type "Y" to overwrite the file. Type "Q" to exit.`, (answer) => {
        if (answer === "y") {
          fs.writeFile(args[1], body, (err) => {
            if (err) {
              console.log("Fail! Check if directory is valid.");
              rl.close();
            } else {
              console.log(`Downloaded and saved ${fs.statSync(args[1]).size} bytes to ${args[1]}.`);
              rl.close();
            }
          });
        } else if (answer === "q") { // peace
          rl.close();
        }
      });
    } else { // download and save the file like a normal dude
      console.log(`downloaded and saved ${fs.statSync(args[1]).size} bytes to ${args[1]}.`)
    }
  }
});