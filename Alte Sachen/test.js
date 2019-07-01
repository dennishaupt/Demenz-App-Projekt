var zahl1 = 20;
console.log("Zahl1 %d",zahl1);
var zahl2 = 30;
console.log("Zahl 2 %d",zahl2);
var zahl3;
zahl3 = zahl1 * zahl2;
console.log(zahl3);
zahl3="Hallo Welt!";
console.log(zahl3);

function quadrieren(zahl)
{
    return zahl *zahl;
}

function hallo()
{
    console.log("Hallo du")
}

console.log("%d hoch 2 ist %d", zahl1, quadrieren(zahl1));
hallo();