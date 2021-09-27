const tips = document.querySelectorAll(".tip");
let reset = document.querySelector(".reset");
let bill = document.querySelector(".bill");
const results = document.querySelectorAll(".price");
const people = document.querySelector(".n-of-people");
let custom = document.querySelector(".custom");

reset.addEventListener("click", clear);
bill.addEventListener("input", setBillValue);
custom.addEventListener("input", setTipCustomValue);
tips.forEach((btn) => {
  btn.addEventListener("click", handleClick);
});
people.addEventListener("input", setPeopleValue);

let billValue = 0.0;
let tipValue = 0.15;
let peopleValue = 0;

function validateInt(s) {
  const rgx = /^[0-9]*$/;
  return s.match(rgx);
}

function validateFloat(s) {
  //input can be only numeric characters
  //chci např 12.78
  const rgx = /^[0-9]*\.?[0-9]*$/;
  return s.match(rgx);
}

function setBillValue() {
  if (bill.value.includes(",")) {
    bill.value = bill.value.replace(",", ".");
  }
  //zajistí, aby nešlo do inputu vložit nic jiného než čísla
  if (!validateFloat(bill.value)) {
    bill.value = bill.value.substring(0, bill.value.length - 1);
  }
  //vrací číslo
  billValue = parseFloat(bill.value);

  calculateTip();
}

function handleClick(event) {
  tips.forEach((btn) => {
    //clear active state
    btn.classList.remove("active");

    //set active state
    if (event.target.innerHTML == btn.innerHTML) {
      btn.classList.add("active");
      tipValue = parseFloat(btn.innerHTML) / 100;
    }
  });

  //clear custom tip
  custom.value = "";

  calculateTip();
}

function setTipCustomValue() {
  if (!validateInt(custom.value)) {
    custom.value = custom.value.substring(0, custom.value.length - 1);
  }

  tipValue = parseFloat(custom.value / 100);
  // console.log(tipValue);

  tips.forEach((btn) => {
    btn.classList.remove("active");
  });

  if (custom.value !== "") {
    calculateTip();
  }
}

function setPeopleValue() {
  if (!validateInt(people.value)) {
    people.value = people.value.substring(0, people.value.length - 1);
  }

  peopleValue = parseFloat(people.value);
  calculateTip();
}

function calculateTip() {
  if (peopleValue >= 1) {
    let tipAmount = (billValue * tipValue) / peopleValue;
    let total = (billValue * (tipValue + 1)) / peopleValue;
    results[0].innerHTML = "$" + tipAmount.toFixed(2);
    results[1].innerHTML = "$" + total.toFixed(2);
  }
}

function clear() {
  bill.value = "0.00";
  setBillValue();

  people.value = "1";
  setPeopleValue();
}
