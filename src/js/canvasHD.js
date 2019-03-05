"use strict";
var intervalID;


var posArray = [];
var circleArray = [];
var nbEtoile;
var fond = document.getElementById("fond");
var fondCanvas = document.getElementById("fond");
var fondC = fondCanvas.getContext("2d");

var mouse = document.getElementById("mouse");
var mouseCanvas = document.getElementById("mouse");
var mouseC = mouseCanvas.getContext("2d");

var mousePos = {
  x: undefined,
  y: undefined
};
var mouseRadius = 10;

function Circle(x, y, velocityX, velocityY, radius) {
  this.x = x;
  this.y = y;
  this.velocityX = velocityX;
  this.velocityY = velocityY;
  this.radius = radius;
  this.color = "#fff";
  this.maxRadius = radius * 3;
  this.minRadius = radius;

  this.draw = function() {
    fondC.beginPath();
    fondC.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    fondC.fillStyle = this.color;
    fondC.fill();
  };
  this.update = function() {
    if (this.x + this.radius > fondCanvas.width || this.x - this.radius < 0) {
      this.velocityX = -this.velocityX;
    }
    if (this.y + this.radius > fondCanvas.height || this.y - this.radius < 0) {
      this.velocityY = -this.velocityY;
    }
    this.x += this.velocityX;
    this.y += this.velocityY;
    //interact souris

    this.draw();
  };
}

function Point(x, y, num) {
  this.x = x;
  this.y = y;
  this.num = num;
  this.color = "red";

  this.drawLine = function() {
    mouseC.lineTo(this.x, this.y);
  };
  this.update = function() {
    if (this.num != 0 && this.num != posArray.length - 1) {
      this.x = posArray[this.num - 1].x;
      this.y = posArray[this.num - 1].y;
    } else if (this.num == posArray.length - 1) {
      this.x = posArray[this.num - 1].x;
      this.y = posArray[this.num - 1].y;
    } else if (this.num == 0) {
      this.x = mousePos.x;
      this.y = mousePos.y;
    }
  };
}

var pointer = false;

// fin varialbe

//initialisation canvas
$(document).ready(initialisationCanvasHD);
function initialisationCanvasHD() {
  if (window.addEventListener) {
    window.addEventListener("resize", initialisation, true);
  } else if (window.attachEvent) {
    window.attachEvent("onresize", initialisation);
  }
  intervalID = setInterval(animateFond, 10);
  initialisation();
}

function initialisation() {
  fond = document.getElementById("fond");
  fondCanvas.width = fondCanvas.clientWidth;
  fondCanvas.height = fondCanvas.clientHeight;
  circleArray = [];

    nbEtoile = (window.innerWidth * window.innerHeight)/20000;

  for (var i = 0; i < nbEtoile; i++) {
    var x = Math.random() * (fondCanvas.width - radius * 2) + radius;
    var y = Math.random() * (fondCanvas.height - radius * 2) + radius;
    var radius = Math.random() * 3;
    var velocityX = (Math.random() - 0.5) * 5;
    var velocityY = (Math.random() - 0.5) * 5;
    circleArray.push(new Circle(x, y, velocityX, velocityY, radius));
  }

  $("a, button, .detectCursor").mouseenter(function() {
    pointer = true;
  });
  $("a, button, .detectCursor").mouseleave(function() {
    pointer = false;
  });

  mouse = document.getElementById("mouse");
  mouseCanvas.width = mouseCanvas.clientWidth;
  mouseCanvas.height = mouseCanvas.clientHeight;

  if (window.matchMedia("(any-pointer)").matches) {
    window.addEventListener("mousemove", function(event) {
      mousePos.x = event.x;
      mousePos.y = event.y;
    });
    for (var i = 0; i < 3; i++) {
      var x = mouseCanvas.width / 2;
      var y = mouseCanvas.height / 2;
      posArray.push(new Point(x, y, i));
    }
    $("body *").css("cursor", "none");
    AnimMouse();
  }
}


function animateFond() {

  fondC.clearRect(0, 0, fondCanvas.width, fondCanvas.height);
  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}
function AnimMouse() {
  requestAnimationFrame(AnimMouse);
  mouseC.clearRect(0, 0, mouseCanvas.width, mouseCanvas.height);

  for (var i = posArray.length - 1; i >= 0; i--) {
    posArray[i].update();
  }
  mouseC.beginPath();
  mouseC.arc(posArray[0].x, posArray[0].y, 10, Math.PI * 2, false);
  mouseC.strokeStyle = "#ffffff";
  mouseC.fillStyle = "#ffffff";
  mouseC.lineWidth = 1;
  mouseC.stroke();
  if (pointer) {
    mouseC.fill();
    mouseC.strokeStyle = "#e39581";
  }
  mouseC.beginPath();
  mouseC.moveTo(posArray[0].x, posArray[0].y);
  for (var j = 0; j < posArray.length; j++) {
    posArray[j].drawLine();
  }
  mouseC.lineWidth = mouseRadius * (3 / 4);
  mouseC.lineCap = "round";
  mouseC.stroke();
}
