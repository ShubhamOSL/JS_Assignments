

/***More on Objects and The "this" Keyword**/




const car={
    brand:"Suzuki",
    model:"LXI",
    start:function(){
      console.log(`The ${this.brand} has introduced new model, ${this.model}`);
    }
  };
  
  car.start();
  
  
  
  