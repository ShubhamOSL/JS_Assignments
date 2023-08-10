//******************DATA Types**************************** */

//Numbers
let num1=3;
let num2=2.2;

//Booleans
let a=false;
let b=true;

//Strings
let font="Italic";
let name="Shubham";

//Null
let number=null;

//undefined
const data=undefined;

//Symbol
let symbol1=Symbol("Color");

//BigInt
let bigNumber=BigInt("3333300204004040404040303030");


//Object
const team={
    Captain:"Shubham",
    Vice_Captain:"Sourabh"
}

//Date  Object
const date=new Date("2023-08-07");

/****************LOOPS********************************/

//printing numbers 1 to 10


for(var i=1;i<=10;i++){
    console.log(i);
}

//calculate sum from 1 to 100

var sum=0;

for(var i=1;i<=100;i++){
    sum+=i;
}

console.log(sum);

/******Switch statement***/

let day;
switch(new Date().getDay()+1){

case 1:
    day="Sunday";
    break;

case 2:
    day="Monday";
    break;
 
case 3:
    day="Tuesday";
    break;
    
case 4:
    day="Wednesday";
    break;
    
case 5:
    day="Thursday";
    break;
    
case 6:
    day="Friday";
    break;
    
case 7:
    day="Saturday";



}

console.log(day);


/****Program Flow: Functions*****************/
//calculating area of rectangle 

function getArea(a,b){
    return a*b;
}

var width=2;
var height=5;

var area=getArea(width,height);

console.log(area);

var width=10;
var height=3;

var area=getArea(width,height);


console.log(area);

/*******Conditional Statements**/


var num=5;

if(num>0){
    console.log(`${num} is a positive number`);

}
else if (num<0){
    console.log(`${num} is a negative number`);

}
else{
    console.log(`Given number is 0`);
}



var num=-5;

if(num>0){
    console.log(`${num} is a positive number`);

}
else if (num<0){
    console.log(`${num} is a negative number`);

}
else{
    console.log(`Given number is 0`);
}


var num=0;

if(num>0){
    console.log(`${num} is a positive number`);

}
else if (num<0){
    console.log(`${num} is a negative number`);

}
else{
    console.log(`Given number is 0`);
}


/**Program Flow:Loops**/
// loop to display even numbers form 1 to 20

for(var i=1;i<=20;i++){
    if(i%2==0){
        console.log(i);
    }
}


//loop to calculate the factorial of a given number.

var num=5;
var ans=1;

for(var i=1;i<=num;i++){
    ans*=i;
}

console.log(ans);
