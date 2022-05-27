////////////////////////////////////////////////////////////////
function setupGround() {
    ground = Bodies.rectangle(500, 600, 1000, 40, {
        isStatic: true,
        angle: 0
    });
    World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround() {
    push();
    fill(128);
    drawVertices(ground.vertices);
    pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller() {
    // your code here
    propeller = Bodies.rectangle(150, 480, 200, 15, {
        isStatic: true,
        angle: angle
    });
    World.add(engine.world, [propeller]);
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller() {
    push();
    // your code here
    Body.setAngle(propeller, angle);
    Body.setAngularVelocity(propeller, angleSpeed);
    angle += angleSpeed;
    drawVertices(propeller.vertices);
    pop();
}
////////////////////////////////////////////////////////////////
function setupBird() {
    var bird = Bodies.circle(mouseX, mouseY, 20, {
        friction: 0,
        restitution: 0.95
    });
    Matter.Body.setMass(bird, bird.mass * 10);
    World.add(engine.world, [bird]);
    birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds() {
    push();
    //your code here
    for (var i = 0; i < birds.length; i++) {
        drawVertices(birds[i].vertices);
        if (isOffScreen(birds[i])) {
            removeFromWorld(birds[i]);
            birds.splice(i, 1);
            i--;
        }
    }
    pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower() {
    //you code here
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 6; j++) {
            var currentBox = Bodies.rectangle(600 + i * 80, 560 - 80 * j, 80, 80);
            World.add(engine.world, [currentBox]);
            boxes.push(currentBox);
            var currentColor = random(100, 255);
            colors.push(currentColor);
        }
    }
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower() {
    push();
    //your code here
    for (var i = 0; i < boxes.length; i++) {
        fill(0, colors[i], 0);
        drawVertices(boxes[i].vertices);
    }
    pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot() {
    //your code here
    slingshotBird = Bodies.circle(100, 150, 25, {
    friction: 0,
    restitution: 0.95
  });

    Matter.Body.setMass(slingshotBird, slingshotBird.mass * 10);
    slingshotConstraint = Constraint.create({
        pointA: {
            x: 150,
            y: 50
        },
        bodyB: slingshotBird,
        stiffness: 0.01,
        damping: 0.0001
    });
    World.add(engine.world, [slingshotBird, slingshotConstraint]);
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot() {
       push();
       // your code here
       fill(255);
       drawVertices(slingshotBird.vertices);
       drawConstraint(slingshotConstraint);
       pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction() {
    var mouse = Mouse.create(canvas.elt);
    var mouseParams = {
        mouse: mouse,
        constraint: {
            stiffness: 0.05
        }
    }
    mouseConstraint = MouseConstraint.create(engine, mouseParams);
    mouseConstraint.mouse.pixelRatio = pixelDensity();
    World.add(engine.world, mouseConstraint);
}
