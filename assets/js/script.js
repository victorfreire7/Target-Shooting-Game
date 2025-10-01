class Game {
    constructor(){
        this.targets = document.querySelectorAll('.target');
        this.content_area = document.querySelector('.content-target');
        this.clown_SVG = document.querySelectorAll('.boss');
        this.bullet = 5;
        this.level = 1;
        this.points = 0;
        this.pointInterval = false; 
        this.target_position_changer;
        this.first_level_verificator = false;        
        this.second_level_verificator = false;
        this.boss_level_verificator = false;
        this.position_target_one = 0;
        this.position_target_two = 250;
        this.boss_life = 15;
        this.boss_position;
    }

    startGame(){
        this.adjustTargetVelocity();
        this.shoot();
        this.addHTML();
    }

    adjustTargetVelocity() {
        this.level === 1 ? this.moveTarget(50, 5) : this.generatTwoBallon(40);
        this.level === 2 ? this.moveTarget(10, 3) : false;
        this.level === 3 ? this.moveTarget(10, 5) : false;
        this.level === 4 ? this.bossLevel() : false;
    }

    adjustLevel(){ //parei aqui, tenho q desativar os interval (eu acho)
        if(this.points >= 1100){ // se eu tiver mais pontos do que 1100
            if(!this.first_level_verificator){
                this.level = 2;
                clearInterval(this.target_position_changer);
                this.adjustTargetVelocity();
                this.addHTML();
                return this.first_level_verificator = true;
            }
        }

        if(this.points <= 2600 && this.points > 1700){
            if(!this.second_level_verificator){
                    this.level = 3;
                    clearInterval(this.target_position_changer);
                    this.adjustTargetVelocity();
                    this.addHTML();
                    return this.second_level_verificator = true;
                }
        }
        if(this.points > 3000){
            if(!this.boss_level_verificator){
                this.level = 4;
                this.generatTwoBallon(0, 300);
                clearInterval(this.target_position_changer);
                this.adjustTargetVelocity();
                this.addHTML();
                return this.boss_level_verificator = true;
            }
        }
    }

    generatTwoBallon(time_one, time_two){
        setTimeout(() => this.ballonUpper() , time_one);
        time_two ? setTimeout(() => this.ballonUpper() , time_two) : false;
    }

    moveTarget(ms, vel){
        let ida = true;
        let ida_two = true;

        this.target_position_changer = setInterval(() => {
            if(this.position_target_one <= 250 && ida){
                this.targets[0].style = `transform: translate(${this.position_target_one += vel}%);`
            } else {
                ida = false
            }

            if(this.position_target_one >= 0 && !ida){
                this.targets[0].style = `transform: translate(${this.position_target_one -= vel}%);`
            } else {
                ida = true;
            }

            if(this.position_target_two <= 250 && ida_two){
                this.targets[1].style = `transform: translate(${this.position_target_two += vel}%);`
            } else {
                ida_two = false
            }

            if(this.position_target_two >= 0 && !ida_two){
                this.targets[1].style = `transform: translate(${this.position_target_two -= vel}%);`
            } else {
                ida_two = true;
            }
        }, ms);
    }

    bossLevel(){
        this.removeTargetsStyle();
        this.bossGenerator();
        setTimeout(() => {
            this.moveBoss();
        }, 5 * 1000);
    }

    bossGenerator(){
      setTimeout(() => {
        let count = 0;
        const interval = setInterval(() => {
          this.clown_SVG[0].style.display = '';
          this.clown_SVG[0].style.opacity = count += 0.1
        }, 200);

        setTimeout(() => {
          clearInterval(interval);
        }, 4 * 1000);
      }, 2 * 1000);
    }

    moveBoss(){
        setInterval(() => {
            let random = this.returnRandomNumber(-10, 80);
            for (const element of this.clown_SVG) {
                element.style.left = `${random}%`
            }
        }, 800);
    }
    
    removeTargetsStyle(){
        for(let arg of this.targets){
            let count = 1;
            const interval = setInterval(() => {
                arg.style.opacity = count -= 0.1
            }, 200);
            setTimeout(() => {
                clearInterval(interval)
                arg.parentNode.remove();
            }, 5 * 1000);
        }
    }

    ballonGeneratatorAuthentication(){
        if(this.boss_life === 14){
            this.generatTwoBallon(0, 500)
        }
        if(this.boss_life === 12){
            this.generatTwoBallon(0, 100)
        }
        if(this.boss_life === 9){
            this.generatTwoBallon(0, 500)
        }
        if(this.boss_life === 7){
            this.generatTwoBallon(0, 600)
        }
        if(this.boss_life === 5){
            this.generatTwoBallon(0, 300)
        }
        if(this.boss_life === 2){
            this.generatTwoBallon(0, 500)
        }
        if(this.boss_life <= 0){
            alert('voce venceu!')
        }
        // PRECISO FAZER OS VERIFICADORES DE GERADORES DE BALAO DE ACORDO COM ACADA NIVEL ATINGIDO
    }

    ballonUpper(){
      this.createBallon();
      let allBallons = document.querySelectorAll('.ballon');

      let count = 0;
      
      for (const element of allBallons) {
        setInterval(() => {
  
          element.style.bottom = `${count+=0.01}%`        
  
        }, 10);
      }
    }

    createBallon(){
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg'); 
      svg.setAttribute('width', '234');
      svg.setAttribute('height', '1066'); 
      svg.setAttribute('viewBox', '0 0 234 1066'); 
      svg.setAttribute('fill', 'none');
      svg.setAttribute('class', 'ballon');
      svg.style.position = 'absolute';
      svg.style.zIndex = '2';
      svg.style.bottom = '-110%';
      svg.style.left = `${this.returnRandomNumber(85, 5)}%`;
      //ENTRE 5 E 85

      const path_one = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path_one.setAttribute('d', 'M129 282C129 275.373 123.627 270 117 270C110.373 270 105 275.373 105 282H117H129ZM117 282.1H105V283.014L105.138 283.918L117 282.1ZM114.703 582.24L103.134 579.053L114.703 582.24ZM123.617 1054L123.436 1066L123.527 1066H123.617V1054ZM117 1053.9L117.181 1041.9L105 1041.72V1053.9H117ZM105 1054C105 1060.63 110.373 1066 117 1066C123.627 1066 129 1060.63 129 1054H117H105ZM117 282H105V282.1H117H129V282H117ZM117 282.1L105.138 283.918C111.873 327.867 111.129 358.821 104.567 378.238L115.935 382.08L127.304 385.922C135.773 360.859 135.738 325.16 128.862 280.282L117 282.1ZM115.935 382.08L104.567 378.238C96.2232 402.928 96.0973 427.829 104.206 452.541L115.608 448.8L127.01 445.059C120.524 425.291 120.616 405.712 127.304 385.922L115.935 382.08ZM115.608 448.8L104.206 452.541C111.081 473.492 114.061 494.305 113.233 515.041L125.223 515.52L137.214 515.999C138.161 492.255 134.731 468.588 127.01 445.059L115.608 448.8ZM125.223 515.52L113.233 515.041C112.383 536.333 109.025 557.665 103.134 579.053L114.703 582.24L126.272 585.427C132.632 562.335 136.288 539.187 137.214 515.999L125.223 515.52ZM114.703 582.24L103.134 579.053C96.5863 602.824 94.9439 626.71 98.268 650.613L110.154 648.96L122.039 647.307C119.178 626.73 120.568 606.136 126.272 585.427L114.703 582.24ZM110.154 648.96L98.268 650.613C101.42 673.279 105.811 695.933 111.437 718.574L123.083 715.68L134.729 712.786C129.302 690.947 125.073 669.121 122.039 647.307L110.154 648.96ZM123.083 715.68L111.437 718.574C116.665 739.613 118.484 760.577 116.93 781.512L128.898 782.4L140.865 783.288C142.612 759.743 140.554 736.227 134.729 712.786L123.083 715.68ZM128.898 782.4L116.93 781.512C115.243 804.26 115.007 827.011 116.224 849.761L128.207 849.12L140.19 848.479C139.027 826.749 139.252 805.02 140.865 783.288L128.898 782.4ZM128.207 849.12L116.224 849.761C117.337 870.556 114.769 891.409 108.451 912.378L119.941 915.84L131.431 919.302C138.515 895.791 141.458 872.164 140.19 848.479L128.207 849.12ZM119.941 915.84L108.451 912.378C101.513 935.405 97.1199 958.488 95.2956 981.616L107.258 982.56L119.221 983.504C120.905 962.152 124.967 940.755 131.431 919.302L119.941 915.84ZM107.258 982.56L95.2956 981.616C93.4228 1005.36 96.8697 1025.89 107.473 1041.66L117.431 1034.96L127.389 1028.26C120.92 1018.64 117.586 1004.24 119.221 983.504L107.258 982.56ZM117.431 1034.96L107.473 1041.66C111.711 1047.96 113.5 1051.51 113.967 1052.95C114.05 1053.2 113.953 1052.99 113.901 1052.44C113.854 1051.93 113.779 1050.48 114.459 1048.64C115.236 1046.54 116.793 1044.55 119.041 1043.27C121.049 1042.13 122.832 1042 123.617 1042V1054V1066C125.506 1066 128.189 1065.67 130.895 1064.14C133.842 1062.46 135.894 1059.87 136.966 1056.98C138.753 1052.15 137.455 1047.57 136.792 1045.53C135.197 1040.62 131.687 1034.66 127.389 1028.26L117.431 1034.96ZM123.617 1054L123.799 1042L117.181 1041.9L117 1053.9L116.819 1065.9L123.436 1066L123.617 1054ZM117 1053.9H105V1054H117H129V1053.9H117Z');
      path_one.setAttribute('fill', '#647691');
      svg.appendChild(path_one);

      const path_second = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path_second.setAttribute('d', 'M0 131.957C0 97.729 3.44941 3.533 109.32 0.0835943C215.19 -3.36581 231.376 100.913 232.968 131.957C234.56 163.001 215.986 328.566 120.729 333.88C25.4726 339.194 0 166.185 0 131.957Z');
      path_second.setAttribute('fill', '#D0193D');
      path_second.setAttribute('class', 'ballonTrigger');
      svg.appendChild(path_second);

      const path_third = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path_third.setAttribute('d', 'M183.35 51.8174C183.35 51.8174 198.739 69.8604 208.026 100.109C217.313 130.358 208.026 166.975 208.026 166.975');
      path_third.setAttribute('stroke', 'white');
      path_third.setAttribute('stroke-width', '14');
      path_third.setAttribute('stroke-linecap', 'round');
      svg.appendChild(path_third);

      this.content_area.appendChild(svg);
    }

    returnRandomNumber(first, second){
      return Math.floor(Math.random() * (first - second + 1) + second)
    }

    addHTML(){
        document.querySelector('#bullets').textContent = `Balas: ${this.bullet}`;
        document.querySelector('#lvl').textContent = `Level: ${this.level}`;
        document.querySelector('#points').textContent = `Pontos: ${this.points}`;
        if(this.level === 4 ){
            document.querySelector('#bossLife').textContent = `boss: ${this.boss_life}/15`
        } 
    }

    deleteBallon(){
        let all_ballon_generated = document.querySelectorAll('.ballon')
        for(const element of all_ballon_generated){
            if (parseFloat(element.style.bottom) > 10){
                element.remove()
            }
        }
    }

    shoot(){
        document.addEventListener('click', (e) => {
            this.adjustLevel();

            this.deleteBallon();

            const el = e.target;
            const tag = el.getAttribute('fill') || el.getAttribute('stroke');


            if(this.bullet === 0){
                document.querySelector('.menuRestart').style = "display:flex";  
            }

            if(this.bullet > 0 && !this.pointInterval){
                this.bullet -= 1;
                this.addHTML();

                if(el.classList.contains('1000points') && !this.pointInterval){
                    this.points += 1000;
                    this.targetStyle(el.parentNode);
                }
            
                if(tag === '#FFC619'){
                    this.points += 500;
                }
                
        
                if(tag === '#FF4829' && !el.classList.contains('ballonTrigger')){
                    this.points += 250;
                } 
        
                if(tag === '#003E83' || tag){
                    this.points += 100;
                }

                if(el.classList.contains('ballonTrigger')){
                  this.bullet += 2;
                  this.addHTML();
                  el.parentNode.remove()
                }
                if(el.classList.contains('clown-nose')){
                    this.bossDamageStyle();
                    
                    this.boss_life -= 1;
                    this.points += 500;
                    this.ballonGeneratatorAuthentication();
                }

                this.adjustLevel();
                this.addHTML();
            }
        });
    }

    bossDamageStyle(){
        this.clown_SVG[0].style.display = 'none';
        this.clown_SVG[1].style.display = 'flex';

        setTimeout(() => {
            this.clown_SVG[1].style.display = 'none';
            this.clown_SVG[0].style.display = 'flex';
        }, 1 * 1000 + 500);
    }

    targetStyle(arg) {
        this.pointInterval = true;
        let count = 1;
        let ida = true;

        const sty = setInterval(() => {
            if(count >= 0.01 && ida){
                arg.style.opacity = count -= 0.01;
            } else {
                ida = false;
            }

            if(count <= 1 && !ida){
                arg.style.opacity = count += 0.01;
            } else {
                ida = true;
            }
        }, 1);

        setTimeout(() => {
            clearInterval(sty);
            arg.style.opacity = 1;
            this.pointInterval = false;
        }, 1000 * 2);
    }


}

let g = new Game();

document.addEventListener('click', (e) => {
    const el = e.target

    if(el.classList.contains('reiniciar')){
        location.reload();
    }

    if(el.classList.contains('start-button')){
        el.parentNode.remove();
        g.startGame();
    }
    
})