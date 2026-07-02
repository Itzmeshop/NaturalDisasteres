// =============================
// Natural Disasters
// =============================

const disasters = {

    fire:[],

    tornado:[],

    drought:false,

    flood:false,

    timer:0

};

class Fire{

    constructor(x,y){

        this.x=x;
        this.y=y;

        this.life=500;

        this.radius=25;

    }

    update(){

        this.life--;

        // повреждаем деревья

        for(const tree of game.trees){

            const dx=tree.x-this.x;
            const dy=tree.y-this.y;

            const dist=Math.sqrt(dx*dx+dy*dy);

            if(dist<this.radius){

                tree.health-=0.3;

            }

        }

    }

    draw(){

        ctx.beginPath();

        ctx.fillStyle="orange";

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI*2
        );

        ctx.fill();

        ctx.beginPath();

        ctx.fillStyle="red";

        ctx.arc(
            this.x,
            this.y,
            this.radius*0.5,
            0,
            Math.PI*2
        );

        ctx.fill();

    }

}

class Tornado{

    constructor(){

        this.x=-100;

        this.y=Math.random()*canvas.height;

        this.speed=2+Math.random()*2;

    }

    update(){

        this.x+=this.speed;

        for(const tree of game.trees){

            const dx=tree.x-this.x;

            const dy=tree.y-this.y;

            if(Math.sqrt(dx*dx+dy*dy)<80){

                tree.health-=1;

            }

        }

    }

    draw(){

        ctx.fillStyle="rgba(200,200,200,.7)";

        ctx.beginPath();

        ctx.moveTo(this.x,this.y);

        ctx.lineTo(this.x-20,this.y+80);

        ctx.lineTo(this.x+20,this.y+80);

        ctx.closePath();

        ctx.fill();

    }

}

function createFire(){

    disasters.fire.push(

        new Fire(

            Math.random()*canvas.width,

            Math.random()*canvas.height

        )

    );

}

function createTornado(){

    disasters.tornado.push(

        new Tornado()

    );

}

function startDrought(){

    disasters.drought=true;

}

function stopDrought(){

    disasters.drought=false;

}

function updateDisasters(){

    disasters.timer++;

    // случайные события

    if(disasters.timer>1200){

        disasters.timer=0;

        const r=Math.random();

        if(r<0.35){

            createFire();

            addEvent("🔥 Начался лесной пожар");

        }

        else if(r<0.6){

            createTornado();

            addEvent("🌪 Замечен торнадо");

        }

        else{

            startDrought();

            addEvent("☀ Началась засуха");

        }

    }

    // пожар

    for(let i=disasters.fire.length-1;i>=0;i--){

        disasters.fire[i].update();

        if(disasters.fire[i].life<=0){

            disasters.fire.splice(i,1);

        }

    }

    // торнадо

    for(let i=disasters.tornado.length-1;i>=0;i--){

        disasters.tornado[i].update();

        if(disasters.tornado[i].x>canvas.width+100){

            disasters.tornado.splice(i,1);

        }

    }

    // засуха

    if(disasters.drought){

        game.health-=0.01;

        for(const tree of game.trees){

            tree.health-=0.02;

        }

    }

    // удаляем погибшие деревья

    game.trees=game.trees.filter(tree=>tree.health>0);

}

function drawDisasters(){

    for(const fire of disasters.fire){

        fire.draw();

    }

    for(const tornado of disasters.tornado){

        tornado.draw();

    }

    if(disasters.drought){

        ctx.fillStyle="rgba(255,180,0,.08)";

        ctx.fillRect(

            0,

            0,

            canvas.width,

            canvas.height

        );

    }

}
