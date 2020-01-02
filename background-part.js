(function(){
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    w = canvas.width = innerWidth,
    h = canvas.height = innerHeight,
    particles = [],
    properties = {
        bgColor                 : 'rgba(0, 0, 0, 1)',
        particleColor           : 'rgba(255, 40, 40, 1)' ,
        partcleRadius           : 3,
        particleCount           : 150,
        parcticleMaxVilocity    : 0.5,
        lineLenght              : 460,
        particleLife            : 6
    };

    document.querySelector('body').appendChild(canvas);

    window.onresize = function () {
        w = canvas.width = innerWidth,
        h = canvas.height = innerHeight;
    }

    console.log(properties.particleCount)



    class Particle{

        constructor(){
            this.x = Math.random()*w;
            this.y = Math.random()*h;
            this.velocityX = Math.random() * (properties.parcticleMaxVilocity * 2) - properties.parcticleMaxVilocity;
            this.velocityY = Math.random() * (properties.parcticleMaxVilocity * 2) - properties.parcticleMaxVilocity;
            this.life = Math.random()*properties.particleLife*60
        }

        reDraw(){
            ctx.beginPath();
            ctx.arc(this.x, this.y, properties.partcleRadius, 0, Math.PI*2);
            ctx.closePath();
            ctx.fillStyle = properties.particleColor;
            ctx.fill();
        }
        position(){
            this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0 ? this.velocityX *= -1 : this.velocityX;
            this.y + this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0 ? this.velocityY *= -1 : this.velocityY;
            this.x += this.velocityX;
            this.y += this.velocityY;
        }

        reCalculateLife(){
            if(this.life < 1){

                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.velocityX = Math.random() * (properties.parcticleMaxVilocity * 2) - properties.parcticleMaxVilocity;
                this.velocityY = Math.random() * (properties.parcticleMaxVilocity * 2) - properties.parcticleMaxVilocity;
                this.life = Math.random() * properties.particleLife * 60

            }
            this.life--;
        }




    }

    function reDrawBackground() {
        ctx.fillStyle = properties.bgColor;
        ctx.fillRect(0, 0, w, h);
    }

    function drawLines() {
        var x1, y1, x2, y2, length, opacity;
        for (let i in particles)
            for (let j in particles) {
                x1 = particles[i].x;
                y1 = particles[i].y;
                x2 = particles[j].x;
                y2 = particles[j].y;
                length = Math.sqrt(Math.pow(x2 -x1, 2) + Math.pow(y2 - y1, 2));
                if(length < properties.lineLenght){
                    opacity = 1 - length / properties.lineLenght;
                    ctx.lineWidth = '0.5';
                    ctx.strokeStyle = 'rgba(255, 40, 40, '+opacity+')';
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.closePath();
                    ctx.stroke();
                }

                
            }
          
    }
    

    function reDrawParticles() {
        for (var i in particles) {

            particles[i].reCalculateLife();
            particles[i].position();
            particles[i].reDraw();
            
        }
    }

    function loop(){
        reDrawBackground();
        reDrawParticles();
        drawLines();
        requestAnimationFrame(loop);

    }

    function init() {
        for (var i = 0; i < properties.particleCount; i++) {
            particles.push(new Particle);
        }
        loop();

    }

    init();

}())