var myObj = {
"name":["UND" , "ODER" , "NICHTUND" , "NICHTODER" , "NICHT" , "XODER" , "XNICHTODER"],
"UND":"Wenn beide Eingänge 1 sind, wird 1 ausgegeben",
"ODER":"Wenn ein Eingang oder beide 1 sind, wird 1 ausgegeben"
}

var string = JSON.stringify(myObj.name[0])
console.log(string);