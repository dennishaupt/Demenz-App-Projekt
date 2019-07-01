var assert = require("assert");
var Test = require("./test");
var test= new Test("blau");
describe('Testen der Funktion Blaues Kästchen Auswahl',function() {
    it('Bei blau sollte 1 zurückgeben',function() {
    let o = test.checkcolorblue("blau");
    assert.equal(o,true);
    });
    it('Bei blau sollte 0 zurückgeben',function() {
    let o = test.checkcolorblue("rot");
    assert.equal(o,false);
    });
});
describe('Testen der Funktion rotes Kästchen Auswahl',function() {
    it('Bei Rot sollte 1 zurückgeben',function() {
    let o = test.checkcolorred("rot");
    assert.equal(o,true);
    });
    it('Bei Rot sollte 0 zurückgeben',function() {
    let o = test.checkcolorred("blau");
    assert.equal(o,false);
    });
});
describe('Testen der Funktion Gender Auswahl',function() {
    it('Bei 0 sollte Male zurückgeben',function() {
    let o = test.genderclient(0);
    assert.equal(o,true);
    });
    it('Bei 1 sollte Female zurückgeben',function() {
    let o = test.genderclient(1);
    assert.equal(o,false);
    });
});