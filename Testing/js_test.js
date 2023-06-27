
let userInput = prompt("Hey what's up, what's 9 + 10? "); 

while(!userInput || !Number(userInput)) {
    alert("You dickhead, answer the question!!!"); 
    userInput = prompt("What's 9 + 10?"); 
}
userInput = userInput.trim(); 
alert("GO TO THE CONSOLE YOU STUPID MAN"); 


if(userInput === "21") console.log("DAMN OK YOU SMART"); 
else if(userInput === "19") console.log("YOU STUPID!"); 
else console.log("YOU DUMBER THAN I THOUGHT"); 

let day = {
    num1Clicked: 0, 
    num2Clicked: 0, 
    ratioClcked: null
}; 

console.log(
    `so far you've clicked ${day["num1Clicked"] + day["num2Clicked"]} buttons,
    get a move on you slow man`
); 


