const intro = document.querySelector(".intro");
const introContainer = document.querySelector(".intro-container");
const nameForm = document.querySelector(".input-name");
const checkName = document.getElementById("intro__input");
const introContinue = document.getElementById("intro__continue");
const appStart = document.querySelector(".app-start");
let greeting = document.querySelector(".greetings");
let getLSG = localStorage.getItem("name");
var signOut = document.getElementById('signout');

let signOutData = [];
signOut.style.display = "none";

if (getLSG) {
  checkMorningNight(getLSG);
  introContainer.classList.add("showCSS");
  appStart.classList.remove("showCSS");
}

function checkMorningNight(value) {
  checkName.style.display = "none";
  let time = new Date().getHours();
  let checkTime =
    time < 12
      ? `Good morning, ${value}`
      : time < 18
      ? `Good afternoon, ${value}`
      : `Good evening, ${value}`;

  greeting.textContent = checkTime;
  greeting.style.textTransform = "capitalize";
}

function placeholderColor(value) {
  value.style.width = "25rem";
  value.placeholder = "Please write your beautiful name.";
  value.classList.add("placeholderred");
}

nameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let checkValue = checkName.value;
  if (checkValue) {
    checkName.style.display = "none";
    localStorage.setItem("name", checkValue);
    checkMorningNight(checkValue);
    introContainer.classList.add("showCSS");
    appStart.classList.remove("showCSS");

    let signOutObject = {
      signout : true      
    }

    signOutData.push(signOutObject);    
    renderLogOut(signOutData, true)    
    localStorage.setItem("signout", JSON.stringify(signOutData));
  } else {
    placeholderColor(checkName);
  }
});

introContinue.addEventListener("click", (e) => {
  e.preventDefault();
  let targetName = e.target.previousElementSibling.children[0].value;
  if (targetName) {
    localStorage.setItem("name", targetName);
    checkMorningNight(targetName);
    introContainer.classList.add("showCSS");
    appStart.classList.remove("showCSS");
  } else {
    placeholderColor(checkName);
  }
});

function showSignOut(){
  signOut.style.display = "block";
}

function renderLogOut(data, on){
  data.forEach(item =>  item.signout === on && showSignOut())
}

function logOutData(){
  let logOutItem = localStorage.getItem("signout") ? JSON.parse(localStorage.getItem("signout")) : [];
  return logOutItem;  
}

function init(){
  signOutData = logOutData();
  renderLogOut(signOutData, true)
}

init();