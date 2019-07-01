var assert = require("assert");
var Logic = require("./logicClass.js");
var logic = new Logic(1,1);

describe("Testing the logical modul logicClass.js", function()
{
    it("Nand should return 1", function()
    {
     let o = logic.nichtund(0,0);
     assert.equal(o,true);
    });
    it("Nand should return 1", function()
    {
     let o = logic.nichtund(1,0);
     assert.equal(o,true);
    });
    it("Nand should return 1", function()
    {
     let o = logic.nichtund(0,1);
     assert.equal(o,true);
    });
    it("Nand should return 0", function()
    {
     let o = logic.nichtund(1,1);
     assert.equal(o,false);
    });
    
    it("bitwiseAND should return 11101010", function()
    {
     var a=[1,1,1,0,1,1,1,0];
     var b=[1,1,1,1,1,0,1,0];
     let o = logic.bitwiseAND(a,b);
     assert.equal(o[0],1);
     assert.equal(o[1],1);
     assert.equal(o[2],1);
     assert.equal(o[3],0);
     assert.equal(o[4],1);
     assert.equal(o[5],0);
     assert.equal(o[6],1);
     assert.equal(o[7],0);
    });
    
});
