let size = 10;

function startGame() {

  const title = document.querySelector("#title");
  title.style.display = "hidden";
  const startButton = document.querySelector("#start_button");
  startButton.style.display = "hidden";

  const grid = document.querySelector("#title");
  grid.style.display="block";
 
}

function getSize() {
  let sizeInput = document.querySelector("#size_input");

  if(sizeInput.style.display != "block") {
    sizeInput.style.display = "block";
  }
  else {
    size = Number(sizeInput.value);

   
  }
}