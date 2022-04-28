let vs = []
function setup (){
  createCanvas( 400,400);
  v =new Vehicle (200,200);
}

function draw (){
   background(173, 216, 230);
  
  v.display()
  v.edges()
  v.update();
  v.wander();

}

class Vehicle{
  constructor(x,y){
    this.location = createVector(x,y);
    this.velocity = createVector(1,0);
    this.acceleration = createVector(0,0);
    this.l = 30;
    this.maxspeed = 1;
    this.maxforce = 0.01;
    this.wanderTheta = PI/2;
  }
  
  wander(){
    let projVector = this.velocity.copy();
    projVector.setMag(100);
    let projPoint = projVector.add(this.location);
    
    let wanderRadius = 50;
    let theta = this.wanderTheta + this.velocity.heading();
    let xBar = wanderRadius * cos(theta);
    let yBar = wanderRadius * sin(theta);
    
    let wanderPoint = p5.Vector.add(projPoint, createVector(xBar, yBar));
    
    let debug = true;
    
    if (debug){
     
    }
    
    let steeringForce = wanderPoint.sub(this.location);
    steeringForce.setMag(this.maxforce);
    this.applyForce(steeringForce);
    
    this.wanderTheta += random(-0.5, 0.5);
  }
  
  seek(vektorTarget){
    // percieve target location 
    var desired = p5.Vector.sub(vektorTarget, this.location);
    desired.normalize();
    desired.mult(this.maxspeed);
    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  arrive(vektorTarget){
    // percieve target location
    var desired = p5.Vector.sub(vektorTarget, this.location);
    var jarak = desired.mag()

    if (jarak < 100){
      var m = map(jarak, 0, 100, 0, this.maxspeed);
      desired.normalize();
      desired.mult(m);
    }
    else{
      desired.normalize();
      desired.mult(this.maxspeed);    
    }
    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }
  applyForce(force){
    this.acceleration.add(force);
  }
  display(){
    var theta = this.velocity.heading()// + PI/2;
    push();
    strokeWeight(1);
    translate(this.location.x, this.location.y)
    rotate(theta)
    fill('#EE52C4')
    ellipse(4,0, -this.l, this.l/2,0)
    line(4,6, this.l/9, this.l/2,0)
    line(4,6, -this.l/9, this.l/2,0)
    ellipse(4,35, -this.l, this.l/2,0)
    ellipse(4,70, -this.l, this.l/2,0)
  fill(255,255,0)
  line(150,65,170,115)
  ellipse(50,70,20,20)
  ellipse(175,125,20,20)
  line(52,80,57,95)
  rect(60,20,100,100)
  rect(130,160,5,15)
  rect(88,160,5,15)
  arc(110,80,60,30,radians(360),radians(180))

  fill(255,255,255)
  rect(60,120,100,15)
  rect(112,95,10,10)
  rect(97,95,10,10)
  ellipse(127,60,30,30)
  ellipse(95,60,30,30)
  triangle(110,120,120,130,150,120)
  triangle(75,120,100,130,110,120)
  rect(50,90,10,10)
  rect(160,90,10,10)

  fill(139,69,19)
  rect(60,135,100,20)
  rect(83,155,15,7)
  rect(125,155,15,7)
  
  fill(0)
  rect(67,140,12,5)
  rect(90,140,12,5)
  rect(115,140,12,5)
  rect(137,140,12,5)
  line(95,45,95,38)
  line(90,46,88,39)
  line(100,46,102,39)
  line(129,45,129,38)
  line(123,46,121,39)
  line(135,46,138,39)
  ellipse(79,183,14,10)
  ellipse(90,180,14,10)
  ellipse(133,180,14,10)
  ellipse(145,183,14,10)

  fill(255,0,0)
  ellipse(117,118,10,15)
  ellipse(103,118,10,15)
  rect(105,116,10,5)
  
  strokeWeight(1)
  fill(255,255,0)
  arc(80,78,15,15,radians(150),radians(360))
  arc(143,78,15,15,radians(215),radians(360))
  arc(110,78,15,25,radians(125),radians(360))
  fill(0,255,254)
  ellipse(127,60,15,15)
  ellipse(95,60,15,15)

  fill(0)
  ellipse(95,60,7,7)
  ellipse(127,60,7,7)
  strokeWeight(1)
    pop();
  }

  edges() {
    if (this.location.x > width + 10) {
      this.location.x = -10;
    } else if (this.location.x < -10) {
      this.location.x = width + 10;
    }
    if (this.location.y > height + 10) {
      this.location.y = -10;
    } else if (this.location.y < -10) {
      this.location.y = height + 10;
    }
  }
}