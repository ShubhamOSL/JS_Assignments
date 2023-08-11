
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



