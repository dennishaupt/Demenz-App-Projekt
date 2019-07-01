class Logic
{
    constructor()
    {}
    

und(a,b)
{
    let self = this;
    var x;
    x = self.nichtund(self.nichtund(a,b),self.nichtund(a,b));
    return(x);
}

oder(a,b)
{
    let self = this;
    var x;
    x = self.nichtund(self.nichtund(a,a),self.nichtund(b,b));
    return(x);
}

nicht(a)
{
    let self = this;
    var x;
    x = self.nichtund(a,a);
    return(x);
}

nichtund(a,b)
{
    var x;
    if(a == 1 && b == 1)
    {
        x = 0;
    }
    else
    {
        x = 1;
    }
return(x);
}

nichtoder(a,b)
{
    var x;
    if(a == 0 && b == 0)
    {
        x = 1;
    }
    else
    {
        x = 0;
    }
    return(x);
}

xoder(a,b)
{
    var x;
    if(a == 0 && b == 0 || a == 1 && b == 1)
    {
        x = 0;
    }
    else
    {
        x = 1;
    }
    return(x);
}

xnichtoder(a,b)
{
    var x;
    if(a == 0 && b == 0 || a == 1 && b == 1)
    {
        x = 1;
    }
    else
    {
        x = 0;
    }
    return(x);
}

bitwiseAND(a,b)
{
    let self = this;
    var x = [];
    for(var i = 0; i < a.length; i++)
    {
        x[i] = self.nichtund(self.nichtund(a[i],b[i]),self.nichtund(a[i],b[i]));
    }
    
    return(x);
}

}
module.exports = Logic;