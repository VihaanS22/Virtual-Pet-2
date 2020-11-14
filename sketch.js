 var dog, sittingDog, standingDog ,runningDog, eatingDog
var database
var foodStocks, foodS, Food, foodImg, foodObj
var lastFed, fedTime
var back
var feed,add
var eatingSound, whiningSound

function preload(){

database = firebase.database()
foodStocks = database.ref('food')
foodStocks.on("value", readStock)

eatingSound = loadSound("sounds/Chewing-sound-effect.mp3")
whiningSound = loadSound("sounds/Puppy-whining-sound.mp3")

back = loadImage("images/back.png")
sittingDog = loadImage("images/dog1.png")
  standingDog = loadImage("images/dog2.png")
  runningDog = loadImage("images/dog4.png")
  eatingDog = loadImage("images/dog3.png")

 

}

function setup() {
	createCanvas(500, 500);
  
dog = createSprite(400, 400, 50, 50)
dog.addAnimation("dog_sitting", sittingDog)
dog.addAnimation("dog_standing", standingDog)
dog.addAnimation("dog_running", runningDog)
dog.addAnimation("dog_eating", eatingDog)
/*Food = createSprite(100, 450, 50, 50)
Food.addImage("food_kept", foodImg)
Food.scale = 0.2
*/
foodObj = new Foods()

feed = createButton("FEED FLUPPY")
feed.position(400, 200)
feed.mousePressed(feedDog)

add = createButton("ADD FOOD FOR FLUPPY")
add.position(600, 200)
add.mousePressed(addFood)


}


function draw() {  


 fedTime = database.ref('FeedTime')
 fedTime.on("value", function(data){
   lastFed = data.val();
 })
  //add styles here
  background(back)
  
  foodObj.display();

if (keyDown("up")) {
 
  dog.changeAnimation("dog_standing",standingDog)
  whiningSound.play();
  eatingSound.stop();
}

if (keyDown("left")) {
  
  dog.changeAnimation("dog_running", runningDog)
  dog.x= 200
  eatingSound.stop();
}


if (keyDown("right")) {
 
  dog.changeAnimation("dog_sitting", sittingDog)
whiningSound.stop();
  eatingSound.stop();
 
  
}

textSize(15)
fill("red")
stroke("white")

if (lastFed>=12) {
  text("LAST FED : "+ lastFed%12 + "PM",  150, 200)

}
else if(lastFed == 0){
text("LAST FED : 12 AM", 150, 200)
}
else{
  text("LAST FED :" +lastFed + "AM", 150, 200)
}



  dog.display();
  drawSprites();

textSize(18)
fill("white")
stroke("orange")
  text("PRESS THE UP ARROW, THEN THE LEFT!" ,20, 20)
  text("AND FINALLY PRESS FEED BUTTON TO FEED FLUPPY!", 20, 40)
  text("AFTER HE FINISHES,", 10, 60)
text("PRESS RIGHT TO MAKE HIM SIT AGAIN!", 60, 80)

}

function readStock(data) {
  foodS = data.val();

}

function writePosition(x){
  if (x<=0) {
    x=0
  } 
  else {
    x=x-1
  }

database.ref('/').update({
  food:x
})



}

function feedDog(){
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  dog.changeAnimation("dog_eating", eatingDog)
  whiningSound.stop();
    eatingSound.play();
  database.ref('/').update({
    food: foodObj.getFoodStock(),
    FeedTime:hour()
  })
}



function addFood() {
  foodS++;
  database.ref('/').update({
   food:foodS
  })
}