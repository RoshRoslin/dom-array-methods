const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

//fetch random user
async function getRandomUser() {
  const response = await fetch("https://randomuser.me/api");
  const data = await response.json();

  user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

//add new object to data array
function addData(obj) {
  data.push(obj);

  updateDOM();
}

function updateDOM(providedData = data) {
  //clear main div
  main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";

  providedData.forEach(function (item) {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> $${formatMoney(
      item.money
    )}`;

    main.appendChild(element);
  });
}

//double money
function doubleMoney() {
  data = data.map(function (user) {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

//sort users by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

//filter only millionaires
function showMillionaires() {
  data = data.filter(function (user) {
    return user.money >= 1000000;
  });
  updateDOM();
}

//calculate total wealth
function calculateWealth() {
  const wealth = data.reduce(function (acc, user) {
    return acc + acc + user.money;
  }, 0);
  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3> Total Wealth: <strong>$${formatMoney(
    wealth
  )}</strong></h3>`;

  main.appendChild(wealthEl);
}

//format number as money
function formatMoney(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"); // 12,345.67
}

//event listeners
addUserBtn.addEventListener("click", getRandomUser);

doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);
