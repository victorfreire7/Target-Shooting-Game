class Game {
    constructor(){
        this.bullet = 5;
        this.level = 1;
        this.points = 0;
        this.pointInterval = false; 
        this.count_target_one = 0;
        this.count_target_two = 250;
        this.targets = document.querySelectorAll('.target');
    }

    startGame(){
        this.adjustTargetVelocity();
        this.shoot();
        this.addHTML();
    }

    adjustTargetVelocity() {
        this.level === 1 ? this.moveTarget(50, 5) : false;
        this.level === 2 ? this.moveTarget(10, 1) : false;
        this.level === 3 ? this.moveTarget(10, 3) : false;
        this.level === 4 ? this.bossGenerator() : false;
    }

    adjustLevel(){
        this.points === 2000 ? this.level = 2  : false;
    }

    hourglassCount(arg, ms, vel){
        if(arg === 0){
            let ida = true;
            setInterval(() => {
                if(this.count_target_one <= 250 && ida){
                    this.targets[arg].style = `transform: translate(${this.count_target_one += vel}%);`
                } else {
                    ida = false
                }

                if(this.count_target_one >= 0 && !ida){
                    this.targets[arg].style = `transform: translate(${this.count_target_one -= vel}%);`
                } else {
                    ida = true;
                }
            }, ms);
        }

        if(arg === 1){
            let ida = true;
            setInterval(() => {
                if(this.count_target_two <= 250 && ida){
                    this.targets[arg].style = `transform: translate(${this.count_target_two += vel}%);`
                } else {
                    ida = false
                }

                if(this.count_target_two >= 0 && !ida){
                    this.targets[arg].style = `transform: translate(${this.count_target_two -= vel}%);`
                } else {
                    ida = true;
                }
            }, ms);
        }
    }

    moveTarget(ms, vel){
        this.hourglassCount(0, ms, vel);
        this.hourglassCount(1, ms, vel);
    }

    bossGenerator(){
    }

    ballonGenerator(){

    }

    addHTML(){
        document.querySelector('#bullets').textContent = `bullet: ${this.bullet}`;
        document.querySelector('#lvl').textContent = `lv: ${this.level}`;
        document.querySelector('#points').textContent = `points: ${this.points}`;
    }

    shoot(){
        document.addEventListener('click', (e) => {
            this.adjustLevel();
            

            const el = e.target;
            const tag = el.getAttribute('fill') || el.getAttribute('stroke');
            if(this.bullet > 0){
                this.bullet -= 1;
                this.addHTML();

                if(el.classList.contains('1000points')){
                    if(!this.pointInterval){
                        this.targetStyle(el.parentNode);
                        this.points += 1000;
                    }
                    this.bullet++;
                }
    
                if(tag === '#FFC619'){
                    this.points += 500;
                }
    
                if(tag === '#FF4829'){
                    this.points += 250;
                } 
    
                if(tag === '#003E83' || tag){
                    this.points += 100;
                }

                this.addHTML();
            }
        });
    }

    targetStyle(arg) {
        this.pointInterval = true;
        let count = 1;
        let ida = true;

        const sty = setInterval(() => {
            if(count >= 0.10 && ida){
                arg.style.opacity = count -= 0.01;
            } else {
                ida = false;
            }

            if(count <= 1 && !ida){
                arg.style.opacity = count += 0.01;
            } else {
                ida = true;
            }
        }, 0.1);

        setTimeout(() => {
            clearInterval(sty);
            arg.style.opacity = 1;
            this.pointInterval = false;
        }, 1000 * 5);
    }


}

let g = new Game();
g.startGame();
// g.startGame();