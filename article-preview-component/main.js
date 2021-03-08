document.getElementById("shareButtonMobile").addEventListener("click", () => {
  appendToggler();
});
document.getElementById("shareButtonMobile2").addEventListener("click", () => {
  appendToggler();
});

appendToggler = () => {
  let cardFooter = document.getElementById("cardFooterMobile");
  let shareFooter = document.getElementById("shareFooterMobile");
  cardFooter.classList.toggle("hidden");
  shareFooter.classList.toggle("hidden");
};

document.getElementById("shareButtonDesktop").addEventListener("click", () => {
  let sharebutton = document.getElementById("shareButtonDesktop");
  sharebutton.classList.toggle("activeShareButtonDesktop");
});

let sharehtml = `<div id="shareToolTip" class="d-flex justify-content-center align-items-center">
        <div class="shareDiv">
            <p id="shareTextTippy">SHARE</p>
        </div>
        <div class="social-icons">
            <img src="images/icon-facebook.svg">
            <img src="images/icon-twitter.svg">
            <img src="images/icon-pinterest.svg">
        </div>
    </div>
`;
tippy("#shareButtonDesktop", {
  content: sharehtml,
  trigger: "click",
  allowHTML: true,
});
