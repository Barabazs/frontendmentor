var toggleSwitch = document.getElementById("toggleSwitch");

toggleSwitch.addEventListener("click", () => {
  togglePricing();
});

function togglePricing() {
  let monthlyPrice = document.getElementsByClassName("monthly-price");
  let annualPrice = document.getElementsByClassName("annual-price");
  if (toggleSwitch.checked == true) {
    toggleSwitch.setAttribute("aria-checked", "true");
    Array.from(monthlyPrice).forEach((element) => {
      element.classList.remove("hidden");
    });
    Array.from(annualPrice).forEach((element) => {
      element.classList.add("hidden");
    });
  } else {
    toggleSwitch.setAttribute("aria-checked", "false");
    Array.from(monthlyPrice).forEach((element) => {
      element.classList.add("hidden");
    });
    Array.from(annualPrice).forEach((element) => {
      element.classList.remove("hidden");
    });
  }
}
togglePricing();
