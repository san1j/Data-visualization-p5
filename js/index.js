var data = [];
var radius = 50; var angle = 0;
var range;
var button, input;
function setup() { 
  createCanvas(windowWidth,windowHeight);
  background(0);
  let h4 = createElement('h4','Enter a word to visualize how its popularity has changed over the years');
  let legend1 = createElement('h3','19th century');
  let square1 = createElement('div').addClass('square');
  let legend2 = createElement('h3','20th century');
  let square2 = createElement('div').addClass('square2');
  let legend3 = createElement('h3','21st century');
  let square3 = createElement('div').addClass('square3');
  input = createInput();
  button = createButton('submit');
  button.mousePressed(submitWord);
  h4.position(10,height-110);
  input.position(10,height-60);
  button.position(150,height-60);
  select('.square').position(width-300,170)
  legend1.position(width-270,145)
  select('.square2').position(width-300,200)
  legend2.position(width-270,175)
  select('.square3').position(width-300,230)
  legend3.position(width-270,205)
  noLoop();
} 
function submitWord (){
  var word = input.value();
  input.value('');
  loadJSON("https://api.wordnik.com/v4/word.json/"+ word + "/frequency?useCanonical=false&startYear=1800&endYear=2012&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7", gotData, 'jsonp')
}

function gotData(wordData){
  data = wordData.frequency;
  range = data[0].count;
  redraw();
}

function draw(){
  background(0);
  angle = 0;
  radius = 50;
  data.forEach(word=> {   
    if(angle == 360) {
    angle = 0;
    radius+=40;
  } 
  if(Math.floor(word.year/100)==18 )
    fill(212,random(90,180), 79)
  else if(Math.floor(word.year/100)==19)
     fill(37, random(128,174), 142)
  else fill(250, 233, random(154))
  var m = map(word.count,0,range,4,10);
  var x = radius*cos(angle)+width/2;
  var y = radius*sin(angle)+height/2;
  ellipse(x,y,m,m) 
  angle+=10; 
   });

}