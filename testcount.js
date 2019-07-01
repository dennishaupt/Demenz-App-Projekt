var count = 10;

var counter = [];
      for(var i=0;i<10;i++) {
        counter[i] = Math.round(Math.random() * (count - 1) + 1);
        if(i!=0) {
          for(var j=0;j<i;j++) {
            if(counter[j]==counter[i]) {
              counter[i] = Math.round(Math.random() * (count - 1) + 1);
              j=0;
            }
          }
        }
      }
      
       for(i=0;i<10;i++) {
        console.log(counter[i]);
      }