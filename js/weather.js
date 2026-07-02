// =========================
// Weather System
// =========================

const weather = {

    type: "sun",

    timer: 0,

    duration: 600,

    rain: [],

    snow: [],

    lightning: 0,

    rainbow: 0

};

function randomWeather(){

    const list=[
        "sun",
        "rain",
        "storm",
        "snow",
        "fog"
    ];

    weather.type=list[
        Math.floor(Math.random()*list.length)
    ];

    weather.timer=0;

}

function startRain(){

    weather.type="rain";

    weather.timer=0;

}

function startStorm(){

    weather.type="storm";

    weather.timer=0;

}

function startSnow(){

    weather.type="snow";

    weather.timer=0;

}

function startFog(){

    weather.type="fog";

    weather.timer=0;

}

function startSun(){

    weather.type="sun";

    weather.timer=0;

}

class RainDrop{

    constructor(){

        this.reset();

    }

    reset(){

        this.x=Math.random()*canvas.width;

        this.y=Math.random()*-canvas.height;

        this.speed=8+Math.random()*8;

        this.len=10+Math.random()*12;

    }

    update(){

        this.y+=this.speed;

        if(this.y>canvas.height){

            this.reset();

        }

    }

    draw(){

        ctx.strokeStyle="#8fd3ff";

        ctx.beginPath();

        ctx.moveTo(this.x,this.y);

        ctx.lineTo(this.x-2,this.y+this.len);

        ctx.stroke();

    }

}

class Snow{

    constructor(){

        this.reset();

    }

    reset(){

        this.x=Math.random()*canvas.width;

        this.y=Math.random()*-canvas.height;

        this.size=2+Math.random()*4;

        this.speed=1+Math.random()*2;

    }

    update(){

        this.y+=this.speed;

        this.x+=Math.sin(this.y*0.02);

        if(this.y>canvas.height){

            this.reset();

        }

    }

    draw(){

        ctx.beginPath();

        ctx.fillStyle="white";

        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);

        ctx.fill();

    }

}

for(let i=0;i<250;i++){

    weather.rain.push(new RainDrop());

}

for(let i=0;i<180;i++){

    weather.snow.push(new Snow());

}

function updateWeather(){

    weather.timer++;

    if(weather.timer>weather.duration){

        randomWeather();

    }

    switch(weather.type){

        case "rain":

            game.health=Math.min(
                100,
                game.health+0.01
            );

            break;

        case "storm":

            if(Math.random()<0.01){

                weather.lightning=8;

            }

            break;

        case "sun":

            break;

        case "snow":

            break;

        case "fog":

            break;

    }

    if(weather.lightning>0){

        weather.lightning--;

    }

    if(weather.rainbow>0){

        weather.rainbow--;

    }

}

function drawWeather(){

    switch(weather.type){

        case "rain":

            for(const d of weather.rain){

                d.update();

                d.draw();

            }

            break;

        case "storm":

            for(const d of weather.rain){

                d.update();

                d.draw();

            }

            if(weather.lightning>0){

                ctx.fillStyle="rgba(255,255,255,.5)";

                ctx.fillRect(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );

            }

            break;

        case "snow":

            for(const s of weather.snow){

                s.update();

                s.draw();

            }

            break;

        case "fog":

            ctx.fillStyle="rgba(220,220,220,.18)";

            ctx.fillRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            break;

    }

    if(weather.rainbow>0){

        ctx.lineWidth=6;

        const colors=[
            "red",
            "orange",
            "yellow",
            "green",
            "blue",
            "indigo",
            "violet"
        ];

        colors.forEach((c,i)=>{

            ctx.beginPath();

            ctx.strokeStyle=c;

            ctx.arc(
                canvas.width/2,
                canvas.height,
                180+i*6,
                Math.PI,
                Math.PI*2
            );

            ctx.stroke();

        });

    }

}
