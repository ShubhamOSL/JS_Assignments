

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
