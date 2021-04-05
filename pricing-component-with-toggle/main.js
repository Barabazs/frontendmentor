var toggleSwitch = document.getElementById("toggleSwitch");

toggleSwitch.addEventListener("click", () => {
  togglePricing();
});

function togglePricing() {
  let monthlyPrice = document.getElementsByClassName("monthly-price");
  let annualPrice = document.getElementsByClassName("annual-price");
  if (toggleSwitch.checked == true) {
    Array.from(monthlyPrice).forEach((element) => {
      element.classList.remove("hidden");
    });
    Array.from(annualPrice).forEach((element) => {
      element.classList.add("hidden");
    });
  } else {
    Array.from(monthlyPrice).forEach((element) => {
      element.classList.add("hidden");
    });
    Array.from(annualPrice).forEach((element) => {
      element.classList.remove("hidden");
    });
  }
}
togglePricing();
