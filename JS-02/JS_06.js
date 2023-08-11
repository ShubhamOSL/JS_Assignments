
/****Function binding ***/


const user={
    name:"Shubham",
    sayName:function(){
      console.log(this.name);
    }
  }
  
  
  const boundSayName=user.sayName.bind(user);
  boundSayName();
  