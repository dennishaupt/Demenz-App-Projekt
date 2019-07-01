class test{
constructor(){}
checkcolorblue(color) {
  if (color === "blau") {
   var rightcolor = 1;
  }
  else {
    rightcolor = 0;
  }
return rightcolor;
}
checkcolorred(color) {
  if (color === "rot") {
   var rightcolor = 1;
  }
  else {
    rightcolor = 0;
  }
return rightcolor;
}
genderclient(eingabe)
    {
      if(eingabe == 0) {
        var gender = "male";
      } else {
        var gender = "female";
      } 
      if(gender == "male") {
        var gender = true;
      } else {
        var gender = false;
      } 
return gender;
}
}
module.exports= test;