//card options
const beePics = [
  {name:"bee1", img:"beePics/bee1.jpg"},
  {name:"bee2", img:"beePics/bee2.jpg"},
  {name:"bee3", img:"beePics/bee3.jpg"},
  {name:"bee4", img:"beePics/bee4.jpg"},
  {name:"bee5", img:"beePics/bee5.jpg"},
  {name:"bee6", img:"beePics/bee6.jpg"}
];

//double cards
const cardArray = beePics.concat(beePics);

//shuffle cards
function shuffleCards(cardArray) {
  for (let i = cardArray.length-1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardArray[i], cardArray[j]] = [cardArray[j], cardArray[i]];
  }
}
shuffleCards(cardArray);
console.log(cardArray);

//create seconds count
let count = 0;
let seconds = document.getElementById("seconds");

function incrementSeconds() {
    count += 1;
    seconds.innerText = count;
}

let secondsCount = setInterval(incrementSeconds, 1000);

//create moves count
let counting = 0;
let moves = document.getElementById("moves");

function incrementMoves() {
    counting += 1;
    moves.innerText = counting;
}

//flip card (change card)
let cardsChosen = [];
let cardsChosenId = [];

function flipCardBoard(e,innerCard) {

  if (cardsChosen.length < 2) {
    let cardId = e.target.dataset.id; 
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    innerCard.classList.toggle("flipAnimation");
        
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 1000);   //check for match function
    } 
  }
}

//create game board upside down cards
const grid = document.querySelector(".grid");

function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    let card = document.createElement("img"); 
    card.setAttribute("src", "upside down.jpg");
    card.setAttribute("data-id", i);

    const frontImg = document.createElement("img");
    frontImg.setAttribute("src", cardArray[i].img);
    frontImg.setAttribute("data-id", i);

    //added divs for flip card animation
    const flipCard = flipCardContainer();
    const innerCard = cardInner();
    const frontCard = cardFront();
    const backCard = cardBack();
    backCard.appendChild(frontImg);
    frontCard.appendChild(card);
    innerCard.appendChild(frontCard);
    innerCard.appendChild(backCard);
    flipCard.appendChild(innerCard);
    grid.appendChild(flipCard);

    card.addEventListener("click", incrementMoves); //moves count function
    
    //flip card animation (toggle)
    innerCard.addEventListener("click",function(e){
      flipCardBoard(e,innerCard)
    })
  }
}

//flip card animation
function flipCardContainer() {
  let flipCard = document.createElement("div"); 
  flipCard.classList.add("flipCard"); 
  
  return flipCard; 
}

function cardInner() {
  let cardInner = document.createElement("div"); 
  cardInner.classList.add("innerCard");  

  return cardInner; 
}

function cardFront() {
  let cardInner = document.createElement("div"); 
  cardInner.classList.add("frontCard");

  return cardInner; 
}

function cardBack() {
  let cardBack = document.createElement("div"); 
  cardBack.classList.add("backCard");
  
  return cardBack; 
}

//check for match
let cardsWon = [];
let congrats = document.getElementById("congrats"); //end of game message

function checkForMatch() {
  const optionOneId = cardsChosenId[0];
  const optionTwoId = cardsChosenId[1];
  if (optionOneId !== optionTwoId && cardsChosen[0] === cardsChosen[1]) {
    cardsWon.push(cardsChosen);  
    [...document.querySelectorAll(".flipAnimation")].map(element => 
      element.style.visibility = 'hidden'
    );
  } 
  else {    
    [...document.querySelectorAll(".flipAnimation")].map(element => 
       element.classList.toggle('flipAnimation')
    );
    console.log("not a match");
  }
  cardsChosen = [];
  cardsChosenId = [];
  
  if (cardsWon.length === cardArray.length/2) {
    congrats.textContent = "Congratulations!!! You are the Queen of Bees"; //end of game message
    
    window.setTimeout(function(){location.reload()},4000)
    clearInterval(secondsCount);
  }
}

createBoard();








