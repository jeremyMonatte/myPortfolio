"use strict"
var graphStInitialise=false;
var tour=-2*Math.PI;
var posini=3*Math.PI/2;
var purcent=0;
var colorArray = [];
    colorArray["bleu"]='#438cca';
    colorArray["violet"]='#a074c4';
    colorArray["jaune"]='#ede551';
    colorArray["rose"]='#cb6697';
    colorArray["orange"]='#ef5033';
    colorArray["rouge"]='#ed1b24';
    colorArray["autre"]='#fff';

var posArray=[];
var ttlescanvas=document.getElementsByClassName("canvas_Graph");
var GraphArray=[];
var circleArray=[];

var fond = document.getElementById("fond");
var fondCanvas= document.getElementById("fond");
var fondC= fondCanvas.getContext("2d");

var mouse = document.getElementById("mouse"); 
var mouseCanvas= document.getElementById("mouse");
var mouseC= mouseCanvas.getContext("2d");

var mousePos ={
    x:undefined,
    y:undefined
}
var mouseRadius=10;

function Circle(x, y, velocityX, velocityY, radius){
    this.x =x;
    this.y =y;
    this.velocityX =velocityX;
    this.initvelocityX =velocityX;
    this.velocityY =velocityY;
    this.initvelocityY =velocityY;
    this.radius=radius;
    this.color="#fff";
    this.maxRadius= radius*3;
    this.minRadius= radius;

    this.draw = function(){
        fondC.beginPath();
        fondC.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        fondC.fillStyle= this.color;
        fondC.fill();
    }
    this.update=function(){
            if ((this.x+this.radius>fondCanvas.width)||(this.x - this.radius<0)){
                this.velocityX=-this.velocityX;
            }
            if ((this.y+this.radius>fondCanvas.height)||(this.y - this.radius<0)){
                this.velocityY=-this.velocityY;
            }
            this.x +=this.velocityX;
            this.y +=this.velocityY;
            //interact souris

        this.draw();
    }
}

function GraphiqueEnRond(id){
    this.id =id;
    this.canvas= document.getElementById(id);
    this.c=this.canvas.getContext("2d");
    this.couleur = $("#"+id).attr('data-couleur');
    if (this.couleur.length==0){
        couleur="autre";
    }
    this.ratio= $("#"+id).attr('data-score');

    this.draw = function(pourcent){
        this.c.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.c.beginPath();
        this.c.arc(this.canvas.width/2,this.canvas.height/2, (this.canvas.width/2)-10,posini, posini+(((this.ratio*pourcent)/100)*tour), true);
        this.c.strokeStyle = colorArray[this.couleur];
        this.c.lineWidth =10;
        this.c.stroke();
    }
}
function Point(x, y, num){
    this.x =x;
    this.y =y;
    this.num =num;
    this.color='red';

    this.drawLine=function(){
        mouseC.lineTo(this.x, this.y);
    }
    this.update=function(){
        if((this.num!=0 )&&(this.num!=posArray.length-1)){
            this.x=posArray[this.num-1].x;
            this.y=posArray[this.num-1].y;
        }else if (this.num==posArray.length-1) {
            this.x=posArray[this.num-1].x;
            this.y=posArray[this.num-1].y;

        }else if(this.num==0){
            this.x=mousePos.x;
            this.y=mousePos.y;
        }
    }
}

var pointer=false;
var nbCanvas=ttlescanvas.length;
for(var i =0; i<nbCanvas;i++){
    GraphArray.push(new GraphiqueEnRond(ttlescanvas[i].id))
}
// fin varialbe

if (window.addEventListener) {
	window.addEventListener("resize", initialiser, true);
} else if (window.attachEvent) {
	window.attachEvent("onresize", initialiser);
}

//initialiser canvas
$(document).ready(initialiser);
$(document).ready(iniGrapf);
function initialiser() {
    
    fond = document.getElementById("fond");
    fondCanvas.width=fondCanvas.clientWidth;
    fondCanvas.height=fondCanvas.clientHeight;
    circleArray=[];


    if (window.matchMedia("(min-width: 800px)").matches) {
        var nbEtoile = 50;
    } else {
        var nbEtoile = 10;
    }

    for (var i =0; i<nbEtoile; i++){
        var x = Math.random()*(fondCanvas.width - radius*2)+radius;
        var y = Math.random()*(fondCanvas.height - radius*2)+radius;
        var radius =Math.random()*3+1;
        var velocityX=(Math.random()-0.5)*5;
        var velocityY=(Math.random()-0.5)*5;
        circleArray.push(new Circle(x,y, velocityX,velocityY,radius))
    }
    animateFond();

    $('a, button, .detectCursor').mouseenter(function(){pointer=true;});
    $('a, button, .detectCursor').mouseleave(function(){pointer=false;});

    mouse = document.getElementById("mouse");
    mouseCanvas.width=mouseCanvas.clientWidth;
    mouseCanvas.height=mouseCanvas.clientHeight;

    window.addEventListener('mousemove',
    function(event){
        mousePos.x=event.x;
        mousePos.y=event.y;
        $("body *").css('cursor', 'none');
    });

    if (window.matchMedia("(any-pointer)").matches) {
        for (var i =0; i<3; i++){
            var x = mouseCanvas.width/2;
            var y = mouseCanvas.height/2;
            posArray.push(new Point(x,y,i));
        }
        AnimMouse();
    }
}

$(window).scroll(iniGrapf);
function iniGrapf(){
    $('.button-competence').click(launchComp);
    for(var i =0; i<nbCanvas;i++){
        GraphArray[i].canvas.width=100;
        GraphArray[i].canvas.height=100;
    }
    if(graphStInitialise==false){
        var YduDiv =$('.competence-selector').offset().top;
        var Yactu = document.body.scrollTop || document.documentElement.scrollTop;
        var hscreen = $( window ).height();
        if(Yactu>YduDiv-hscreen*3/4){
            $(".competence-selected-inte").css('display','flex');
            $(".competence-selected-inte").animate({opacity: 1}, 300, "linear",animationGraph());
        };
    }
}
// appel de l'update des cercles a chaque nouvel frame
function animationGraph(){
    for(var i =0; i<nbCanvas;i++){
        GraphArray[i].draw(purcent);
    }
    console.log('test');
    if(purcent<1){
        purcent+=0.0005;
        setTimeout(
            function(){
                requestAnimationFrame(animationGraph);
        }, 10);
    }
}

function launchComp(){
    graphStInitialise=true;
    $('.opened').removeClass('opened');
    $(this).addClass('opened');
    purcent=0;
    var selector = $(this).attr('data-selector');
    if(selector=="inte"){
       // $(".competence-selected-other").animate({opacity: 0}, 300, "linear", function() {
            $(".competence-selected-other").css('display','none');
            $(".competence-selected-inte").css('display','flex');
            //$(".competence-selected-inte").animate({opacity: 1}, 300, "linear",animationGraph());
            purcent=0;
            animationGraph();
        //});
    }else if(selector=="other"){
        //$(".competence-selected-inte").animate({opacity: 0}, 300, "linear", function() {
            $(".competence-selected-inte").css('display','none');
            $(".competence-selected-other").css('display','flex');
            //$(".competence-selected-other").animate({opacity: 1}, 300, "linear",animationGraph());
            purcent=0;
            animationGraph();
        //});
    }
}

function animateFond(){
    requestAnimationFrame(animateFond);

    fondC.clearRect(0,0,fondCanvas.width,fondCanvas.height);
    for (var i =0; i<circleArray.length; i++){
        circleArray[i].update();
    }
    
}
function AnimMouse(){
    requestAnimationFrame(AnimMouse);
    mouseC.clearRect(0,0,mouseCanvas.width,mouseCanvas.height);

    for (var i =posArray.length-1; i>=0; i--){
        posArray[i].update();
    };
    mouseC.beginPath();
    mouseC.arc(posArray[0].x, posArray[0].y, 10, Math.PI*2, false);
    mouseC.strokeStyle="#ffffff";
    mouseC.fillStyle="#ffffff";
    mouseC.lineWidth=1;
    mouseC.stroke();
    if(pointer){
        mouseC.fill();
        mouseC.strokeStyle="#e39581";
    }
    mouseC.beginPath();
    mouseC.moveTo(posArray[0].x, posArray[0].y);
    for (var j =0; j<posArray.length; j++){
        posArray[j].drawLine();
    }
    mouseC.lineWidth=mouseRadius*(3/4);
    mouseC.lineCap = "round";
    mouseC.stroke();
}
