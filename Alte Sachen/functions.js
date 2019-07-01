function multiply(num1,num2)
{
    return num1 * num2;
}

let x = multiply(3,5);
console.log("multiply(15) 3*5=",x)

function easycalc(what,num1,num2)
{
    return what(num1,num2);
}

console.log("Funktionsreferez:easycalc (36):",easycalc(multiply,6,6));

function test(what,num1,num2)
{
    var a= 10;
    function calc(what,num1,num2)
    {
        return what(a,a);
    }
    return calc(what,a,a);
}

function testclosure()
{
    console.log("closure (25):", test(multiply,5,5));
}

testclosure();