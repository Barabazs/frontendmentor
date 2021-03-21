var values = ["10K", "50K", "100K", "500K", "1M"];
var prices = ["$8.00", "$12.00", "$16.00", "$24.00", "$36.00"];
var discounted = ["$6.00", "$9.00", "$12.00", "$18.00", "$27.00"];
var input = document.getElementById("slider"),
  pageViewOutput = document.getElementById("pageViewOutputValue"),
  pricingOutput = document.getElementById("pricingOutputValue"),
  toggleSwitch = document.getElementById("toggleSwitch");
input.oninput = function () {
  let progress = (4 - this.value) / 0.04;
  void 0;
  input.style.background = `linear-gradient(to left, hsl(224, 65%, 95%) ${progress}%, hsl(174, 77%, 80%) ${progress}%)`;
  pageViewOutput.innerHTML = values[this.value];
  if (toggleSwitch.checked) {
    pricingOutput.innerHTML = discounted[this.value];
  } else {
    pricingOutput.innerHTML = prices[this.value];
  }
};
input.oninput();
toggleSwitch.addEventListener("click", () => {
  input.oninput();
});
