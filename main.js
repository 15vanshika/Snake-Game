const canvas=document.getElementById("canvas");
const pen=canvas.getContext("2d");

pen.fillStyle="red";


const cs=47;
const W=1200;
const H=600;
let food=null;
let count=0;






console.log(pen)

class Snake{

    constructor(){
        this.init_len=5;
        this.direction="right";
        this.cells= [];
        
    }
    createSnake(){
        for(let i=0;i<this.init_len;i++){
            this.cells.push({
                x: i,
                y: 0

            })
        }
    }
    drawSnake(){
        for(let i=0;i<this.cells.length;i++){
            const cell=this.cells[i];
            if(i===this.cells.length-1){
                pen.fillStyle="yellow"
                
            }
            else{
                pen.fillStyle="red"
            }
            pen.fillRect(cell.x*cs, cell.y*cs, cs-2,cs-2)//-2 taaki vo alg alg box ki shape m aae
        }
    }
    updateSnake(){
        const headX=this.cells[this.cells.length-1].x;
        const headY=this.cells[this.cells.length-1].y;

        let nextX= headX+1;
        let nextY= headY;

        if(food.x === headX && food.y === headY){
            food=randomFood();
            count++
        }
        else{
            this.cells.shift()
        }
        //body collision
        for(let i = 0; i < this.cells.length-1; i++){
            const cell=this.cells[i];
            if(cell.x === headX && cell.y === headY){
                gameover();
                return;
            }  
        }

        if(this.direction === "left"){
            nextX=headX-1;
            nextY=headY;
            if(nextX*cs < 0 ){
                gameover()
            }
        }
        else if(this.direction === "up"){
            nextX=headX;
            nextY=headY-1;
           if(nextY*cs<0){
            gameover()
           }
        }
      else if(this.direction === "down"){
        nextX=headX;
        nextY=headY+1;
        if(nextY*cs>H){
            gameover()
        }
    }
     else if(this.direction === "right"){
        nextX=headX+1;
        nextY=headY;
        if(nextX*cs>W){
            gameover()
        }
      }
   
        this.cells.push({
            x: nextX,
            y: nextY
        });

        // /this.cells.shift()/remove cell from start i.i first one

    }
    changeDirection(direction){
        this.direction = direction;
        
    }
}
const snake=new Snake();

//this will initialise the game

function init(){

snake.createSnake();
snake.drawSnake();
food=randomFood();
console.log(food);


function keypressed(e){
    if(e.key==="ArrowLeft"){
        snake.changeDirection("left")
    }
    else if(e.key==="ArrowRight"){
        snake.changeDirection("right")
    }
    else if(e.key==="ArrowUp"){
        snake.changeDirection("up")
    }
    else if(e.key==="ArrowDown"){
        snake.changeDirection("down")
    }
}

document.addEventListener("keydown",keypressed)

}

//this will draw the updated value

function draw(){
    pen.clearRect(0,0,W,H);

    
    pen.fillStyle="red"
    
    pen.font="40 px sans-serif"
    pen.fillText(`Score: ${count}`,30,30)
    pen.fillRect(food.x*cs,food.y*cs,cs,cs);
    pen.fillStyle="yellow"
    snake.drawSnake();

}

function update(){
 snake.updateSnake()


}

function gameloop(){
    update();
    draw();
}

function randomFood(){
    const foodX=Math.floor(Math.random()*(W-cs)/cs);// divide by cs taaki multiple ho vo uss jagah p
    const foodY=Math.floor(Math.random()*(H-cs)/cs);

    const food={
        x:foodX,
        y:foodY
    }
    return food;
}

init()
document.getElementById("easy").onclick = function() {myFunctionE()};

function myFunctionE() {
    const id=setInterval(gameloop,400)
}
document.getElementById("medium").onclick = function() {myFunctionM()};

function myFunctionM() {
    const id=setInterval(gameloop,200)
}
    
document.getElementById("hard").onclick = function() {myFunctionH()};

function myFunctionH() {
    const id=setInterval(gameloop,100)
}
function gameover(){
    clearInterval(id)

}