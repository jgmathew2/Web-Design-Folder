const fps = 50; 
let velocityP = 0; 
let velocityP2 = 0; 
let positionP = 42; 
let positionP2 = 42; 
const paddleRad = 13.85; 
let velocityB = [0, 1.1]; 
let positionB = [47, 50]; 
const paddleDepth = 88; 
const paddleDepth2 = 10; 
let score = [-1, 0]; 

//Start's game after user clicks Play
function startGame() {
    //Gets the html elements for title and playButton, and hides them
    const startButton = document.querySelector("#starting"); 
    const startTitle = document.querySelector("#title"); 
    startButton.style.display="none"; 
    startTitle.style.display="none"; 
    updateScoreText(0); 

    //Gets html element for the player 
    const player = document.querySelector("#player"); 
    player.style.display="block"; 

    const player2 = document.querySelector("#player2"); 
    player2.style.display="block"; 

    const ball = document.querySelector("#ball"); 
    ball.style.display="block"; 

    document.querySelector("#score").style.display="block"; 

    


    //Will repeat draw function over and over again for mechanics 
    setInterval(draw, 1000/fps); 

    window.addEventListener('keydown', playerMove, false);
    // Automatically passes in event object

}

function draw() {
    positionP += velocityP; 
    positionP2 += velocityP2; 
    player.style.left = `${positionP}%`; 
    player2.style.left= `${[positionP2]}%`; 

    if(positionP > 66 || positionP < 20) velocityP = 0; 

    if(positionP2 > 66 || positionP2 < 20) velocityP2 = 0; 



    positionB[0] += velocityB[0]; 
    positionB[1] += velocityB[1]; 

    ball.style.left=`${positionB[0]}%`; 
    ball.style.top=`${positionB[1]}%`

    if(inRange(positionB[0], positionP - 2, positionP + paddleRad) &&
            inRange(positionB[1], paddleDepth - 3.2, paddleDepth + 3.2)) {
                velocityB[1] *= -1; 
                velocityB[0] += velocityP; 
            } 
    if(inRange(positionB[1], paddleDepth2 - 3.2, paddleDepth2 + 3.2) && 
            inRange(positionB[0], positionP2 - 2, positionP2 + paddleRad)) {

        velocityB[1] *= -1; 
        velocityB[0] += velocityP2; 
    }

    if(positionB[0] < 20) velocityB[0] *= -1; 
    if(positionB[0] > 78) velocityB[0] *= -1; 


    if(positionB[1] < 5) {

        updateScoreText(0); 
        reset(); 

    } 
    if(positionB[1] > 110 ) {
        updateScoreText(1); 
        reset(); 
    }
    

}

function playerMove(e) {
    let pressed = e.key; 
    //finds which key is pressed from the event object

    if(pressed == "ArrowRight" && positionP < 66) {
        if(velocityP <= 0) {
            velocityP += 0.3; 
        }
        else velocityP += 0.2; 

    }
    else if(pressed == "ArrowLeft" && positionP > 20) {
        if(velocityP >= 0) velocityP -= 0.3; 
        else velocityP -= 0.2; 

        
        
    }
    
    else if(pressed == "a" && positionP2 > 20) {
        if(velocityP2 >= 0) velocityP2 -= 0.3; 
        else velocityP2 -= 0.2; 
    } 
    else if(pressed == "d" && positionP2 < 66) {
        if(velocityP2 <= 0) velocityP2 += 0.3; 
        else velocityP2 += 0.2; 
    } 

}

function inRange(test, left, right) {
    if(test >= left && test <= right) return true; 
    else return false; 
}

function updateScoreText(scorer) {
    score[scorer]++; 

    const scoreText = document.querySelector("#score"); 

    scoreText.textContent=`Score: ${score[0]}:${score[1]}`;
    scoreText.style.display="block";  

    setTimeout( () => {scoreText.style.display="none"}, 1500); 


}

function reset() {
    velocityP = 0; 
    velocityP2 = 0; 
    positionP = 42; 
    positionP2 = 42; 
    velocityB = [0, 1.1]; 
    positionB = [47, 50]; 
    paddleDepth = 102; 
    paddleDepth2 = 15; 

}