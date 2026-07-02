const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

const game = {

    day:1,

    score:0,

    health:100,

    running:true,

    trees:[],

    rivers:[],

    animals:[],

    disasters:[],

    particles:[]

};

function random(min,max){
    return Math.random()*(max-min)+min;
}

class Tree{

    constructor(x,y){

        this.x=x;
        this.y=y;

        this.size=random(15,35);

        this.health=100;

    }

    draw(){

        ctx.fillStyle="#4e342e";

        ctx.fillRect(
            this.x-3,
            this.y,
            6,
            18
        );

        ctx.beginPath();

        ctx.fillStyle="#2e7d32";

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI*2
        );

        ctx.fill();

    }

}

class Animal{

    constructor(x,y){

        this.x=x;

        this.y=y;

        this.vx=random(-1,1);

        this.vy=random(-1,1);

    }

    update(){

        this.x+=this.vx;

        this.y+=this.vy;

        if(this.x<0||this.x>canvas.width) this.vx*=-1;

        if(this.y<0||this.y>canvas.height) this.vy*=-1;
        
        updateWeather();
    }

    draw(){

        ctx.beginPath();

        ctx.fillStyle="orange";

        ctx.arc(
            this.x,
            this.y,
            6,
            0,
            Math.PI*2
        );

        ctx.fill();

    }

}

class River{

    constructor(y){

        this.y=y;

    }

    draw(){

        ctx.fillStyle="#42a5f5";

        ctx.fillRect(
            0,
            this.y,
            canvas.width,
            40
        );

    }

}

function generateWorld(){

    game.trees=[];

    game.animals=[];

    game.rivers=[];

    for(let i=0;i<120;i++){

        game.trees.push(

            new Tree(

                random(0,canvas.width),

                random(0,canvas.height)

            )

        );

    }

    for(let i=0;i<20;i++){

        game.animals.push(

            new Animal(

                random(0,canvas.width),

                random(0,canvas.height)

            )

        );

    }

    game.rivers.push(new River(canvas.height*0.4));

}

generateWorld();

function drawBackground(){

    const sky=ctx.createLinearGradient(
        0,
        0,
        0,
        canvas.height
    );

    sky.addColorStop(0,"#6ec6ff");

    sky.addColorStop(1,"#8bc34a");

    ctx.fillStyle=sky;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

}

function update(){

    for(const animal of game.animals){

        animal.update();

    }

      updateWeather();
    
}

function draw(){

    drawBackground();

    for(const river of game.rivers){

        river.draw();

    }

    for(const tree of game.trees){

        tree.draw();

    }

    for(const animal of game.animals){

        animal.draw();

    }
    
    drawWeather();
    
}

function ui(){

    document.getElementById("nature").textContent=
        Math.round(game.health)+"%";

    document.getElementById("money").textContent=
        game.score;

    document.getElementById("day").textContent=
        game.day;

}

function loop(){

    if(!game.running) return;

    update();

    draw();

    ui();

    requestAnimationFrame(loop);

}

loop();

setInterval(()=>{

    game.day++;

},10000);

document.getElementById("plantTree").onclick=()=>{

    game.trees.push(

        new Tree(

            random(50,canvas.width-50),

            random(50,canvas.height-50)

        )

    );

    game.score+=10;

};

document.getElementById("cleanRiver").onclick=()=>{

    game.health=Math.min(100,game.health+5);

    game.score+=15;

};

document.getElementById("saveAnimals").onclick=()=>{

    game.animals.push(

        new Animal(

            random(0,canvas.width),

            random(0,canvas.height)

        )

    );

    game.score+=20;

};

document.getElementById("weather").onclick=()=>{

    if(typeof startRain==="function"){

        startRain();

    }

};
