
/**************Data Structures : Arrays */


function sumArray(numbers){
  
  let sum=0;
  
  for(let i=0;i<numbers.length;i++){
    sum+=numbers[i];
  }


  return  sum;



}


const numbers=[1,2,3,4,5];
const ans= sumArray(numbers);
console.log(ans);




/*******Data Structures : Objects******************/


function printPersonDetails(person){

  console.log("Name:",person.name);
  console.log("Age:",person.age);
  console.log("Email:",person.email);
}



const person={
    name:"shubham",
    age:"23",
    email:"s@gmail.com"
}


printPersonDetails(person);



/*******Functions are just variables**/


const greeting=function(name){
  return `Hello ${name} , hope you are doing well`;
};


const nam="Shubham";
const message=greeting(nam);
console.log(message);



/***More on Objects and The "this" Keyword**/




const car={
  brand:"Suzuki",
  model:"LXI",
  start:function(){
    console.log(`The ${this.brand} has introduced new model, ${this.model}`);
  }
};

car.start();





/********The old var **********/




function printNumbers(){
  var count;

  for(count=1;count<=5;count++){
    console.log(count);
  }

  return count;
}

var ans1=printNumbers();




/****Function binding ***/


const user={
  name:"Shubham",
  sayName:function(){
    console.log(this.name);
  }
}


const boundSayName=user.sayName.bind(user);
boundSayName();



/***Arrow functions, the basics***/

const double=(number)=>{
  return number*2;
}

console.log(double(3));

