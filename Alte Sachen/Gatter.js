var assert = require("assert");
var Logic = require("./logicClass.js");
var logic = new Logic(1,1);


console.log("NAND")
console.log("A B X")
console.log("1 1 %d",logic.nichtund(1,1));
console.log("1 0 %d",logic.nichtund(1,0));
console.log("0 1 %d",logic.nichtund(0,1));
console.log("0 0 %d",logic.nichtund(0,0));

console.log("AND")
console.log("A B X")
console.log("1 1 %d",logic.und(1,1));
console.log("1 0 %d",logic.und(1,0));
console.log("0 1 %d",logic.und(0,1));
console.log("0 0 %d",logic.und(0,0));

console.log("OR")
console.log("A B X")
console.log("1 1 %d",logic.oder(1,1));
console.log("1 0 %d",logic.oder(1,0));
console.log("0 1 %d",logic.oder(0,1));
console.log("0 0 %d",logic.oder(0,0));

console.log("NOT")
console.log("A X")
console.log("1 %d",logic.nicht(1));
console.log("0 %d",logic.nicht(0));