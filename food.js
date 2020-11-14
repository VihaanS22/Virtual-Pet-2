class Foods{

constructor(){
  this.foodStock = 0
  this.lastFed;  
  this.image = loadImage("images/food.png")

}

updateFoodStock(foodStock){
    this.foodStock=foodStock;
   }
   deductFood(){
    if(this.foodStock>0){
     this.foodStock=this.foodStock-1;
    }
   }
   getFoodStock(){
    return this.foodStock;
  }
  getFedTime(lastFed)
  {
      this.lastFed = lastFed;
  }
  display(){
    
    imageMode(CENTER);
 
    
   
    image(this.image,120, 445, 100, 80);

    
   
  }
    }
  