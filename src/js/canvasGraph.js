"use strict";
var graphStInitialise = false;
var tour = -2 * Math.PI;
var posini = (3 * Math.PI) / 2;
var purcent = 0;
var colorArray = [];
colorArray["bleu"] = "#438cca";
colorArray["violet"] = "#a074c4";
colorArray["jaune"] = "#ede551";
colorArray["rose"] = "#cb6697";
colorArray["orange"] = "#ef5033";
colorArray["rouge"] = "#ed1b24";
colorArray["autre"] = "#fff";

var ttlescanvas = document.getElementsByClassName("canvas_Graph");
var GraphArray = [];

function GraphiqueEnRond(id) {
  this.id = id;
  this.canvas = document.getElementById(id);
  this.c = this.canvas.getContext("2d");
  this.couleur = $("#" + id).attr("data-couleur");
  if (this.couleur.length == 0) {
    couleur = "autre";
  }
  this.ratio = $("#" + id).attr("data-score");

  this.draw = function(pourcent) {
    this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.c.beginPath();
    this.c.arc(
      this.canvas.width / 2,
      this.canvas.height / 2,
      this.canvas.width / 2 - 10,
      posini,
      posini + ((this.ratio * pourcent) / 100) * tour,
      true
    );
    this.c.strokeStyle = colorArray[this.couleur];
    this.c.lineWidth = 10;
    this.c.lineCap = "round";
    this.c.stroke();
  };
}

var nbCanvas = ttlescanvas.length;
for (var i = 0; i < nbCanvas; i++) {
  GraphArray.push(new GraphiqueEnRond(ttlescanvas[i].id));
}
// fin varialbe
//initialiser canvas
$(document).ready(InitigrafUlt);
function InitigrafUlt(){
    $(".button-competence").click(launchComp);
    $(window).scroll(iniGrapf);
    iniGrapf();
}
function iniGrapf() {
  if (graphStInitialise == false) {
    for (var i = 0; i < nbCanvas; i++) {
      GraphArray[i].canvas.width = 100;
      GraphArray[i].canvas.height = 100;
    }
    var YduDiv = $(".competence-selector").offset().top;
    var Yactu = document.body.scrollTop || document.documentElement.scrollTop;
    var hscreen = $(window).height();
    if (Yactu > YduDiv - (hscreen * 3) / 4) {
      graphStInitialise = true;
      $(".competence-selected-inte").css("display", "flex");
      animationGraph();
    }
  }
}
// appel de l'update des cercles a chaque nouvel frame
function animationGraph() {
  for (var i = 0; i < nbCanvas; i++) {
    GraphArray[i].draw(purcent);
  }
  if (purcent < 1) {
    purcent += 0.02;
    setTimeout(function() {
      requestAnimationFrame(animationGraph);
    }, 1);
  }
}

function launchComp() {
  graphStInitialise = true;
  $(".opened").removeClass("opened");
  $(this).addClass("opened");
  purcent = 0;
  var selector = $(this).attr("data-selector");
  if (selector == "inte") {
    $(".competence-selected-other").css("display", "none");
    $(".competence-selected-inte").css("display", "flex");
    animationGraph();
  } else if (selector == "other") {
    $(".competence-selected-inte").css("display", "none");
    $(".competence-selected-other").css("display", "flex");
    animationGraph();
  }
}
