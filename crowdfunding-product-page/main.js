const INITIAL_DATA = {
  goal: 100000,
  backed: 89914,
  backers: 5007,
  daysLeft: 56,
  firstMobileParagraph:
    "A beautifully handcrafted monitor stand to reduce neck and eye strain.",
  firstDesktopParagraph:
    "A beautiful & handcrafted monitor stand to reduce neck and eye strain.",
};

const SELECTION_MODAL = new bootstrap.Modal(
  document.getElementById("selectionModal"),
  {
    focus: true,
  }
);
const SUCCESS_MODAL = new bootstrap.Modal(
  document.getElementById("successModal")
);

const IDS_DICT = {
  noReward: {
    footerId: "footerNoReward",
    mainCardId: null,
    miniCardId: "pledge-no-reward-card",
    radioId: "radioNoReward",
    formId: "noRewardForm",
    inputId: "noRewardInput",
  },
  bambooReward: {
    footerId: "footerBambooReward",
    mainCardId: "bambooCard",
    miniCardId: "pledge-bamboo-reward-card",
    radioId: "radioBambooReward",
    formId: "bambooRewardForm",
    inputId: "bambooRewardInput",
  },
  blackReward: {
    footerId: "footerBlackReward",
    mainCardId: "blackCard",
    miniCardId: "pledge-black-reward-card",
    radioId: "radioBlackReward",
    formId: "blackRewardForm",
    inputId: "blackRewardInput",
  },
  mahoganyReward: {
    footerId: "footerMahoganyReward",
    mainCardId: "mahoganyCard",
    miniCardId: "pledge-mahogany-reward-card",
    radioId: "radioMahoganyReward",
    formId: "mahoganyRewardForm",
    inputId: "mahoganyRewardInput",
  },
};

function isHidden(elementId) {
  return document.getElementById(elementId).classList.contains("hidden");
}

function ensureHidden(elementId) {
  if (!isHidden(elementId)) {
    document.getElementById(elementId).classList.toggle("hidden");
  }
}

function ensureUnSelected(elementId) {
  if (document.getElementById(elementId).classList.contains("selected")) {
    document.getElementById(elementId).classList.remove("selected");
  }
}

function mediaQueryChange(event) {
  const firstParagraph = document.querySelector("div.section:nth-child(1) > p");
  if (event.matches) {
    firstParagraph.innerHTML = INITIAL_DATA.firstMobileParagraph;
  } else {
    firstParagraph.innerHTML = INITIAL_DATA.firstDesktopParagraph;
  }

  document.getElementsByTagName("nav")[0].classList.toggle("navbar-light");
}

function goToModalReward(reward) {
  document
    .getElementById("selectionModal")
    .addEventListener("shown.bs.modal", () => {
      document
        .querySelector(`#${IDS_DICT[reward].footerId} .pledge-input-div input`)
        .focus();

      document.getElementById(IDS_DICT[reward].miniCardId).scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    });
  document.getElementById(IDS_DICT[reward].radioId).click();
  SELECTION_MODAL.show();
}

function updatePledgeSlider() {
  const pledgeSlider = document.getElementById("pledge-slider");
  const pledgeRatio = Number.parseFloat(
    (INITIAL_DATA.backed / INITIAL_DATA.goal) * 100
  ).toFixed(3);
  pledgeSlider.setAttribute("aria-valuenow", pledgeRatio);
  pledgeSlider.setAttribute("value", pledgeRatio);
  pledgeSlider.style.width = `${pledgeRatio}%`;
}

function handlePledgeChanges(rewardId, pledgeValue) {
  INITIAL_DATA.backed += Number(pledgeValue);
  INITIAL_DATA.backers += 1;
  document.querySelector("#backed").innerHTML =
    INITIAL_DATA.backed.toLocaleString();
  document.querySelector("#backers").innerHTML =
    INITIAL_DATA.backers.toLocaleString();

  const itemsLeftMainCard = document.querySelector(
    `#${IDS_DICT[rewardId].mainCardId} .items-left .main-number`
  );
  if (itemsLeftMainCard) {
    itemsLeftMainCard.innerHTML -= 1;
  }

  const itemsLeftMiniCard = document.querySelector(
    `#${IDS_DICT[rewardId].miniCardId} .items-left .main-number`
  );
  if (itemsLeftMiniCard) {
    itemsLeftMiniCard.innerHTML -= 1;
  }
  updatePledgeSlider();
  SELECTION_MODAL.hide();
  SUCCESS_MODAL.show();
}

const radios = document.querySelectorAll("input[type='radio']");
radios.forEach((radio) =>
  radio.addEventListener("input", (event) => {
    Object.entries(IDS_DICT).forEach((dictElement) => {
      if (dictElement[1].radioId === event.target.id) {
        document
          .getElementById(dictElement[1].footerId)
          .classList.toggle("hidden");
        document
          .getElementById(dictElement[1].miniCardId)
          .classList.toggle("selected");
      } else {
        ensureHidden(dictElement[1].footerId);
        ensureUnSelected(dictElement[1].miniCardId);
      }
    });
  })
);

const miniHeaders = document.querySelectorAll(".mini-header");
miniHeaders.forEach((miniHeader) => {
  const radioButton = document.getElementById(
    IDS_DICT[miniHeader.closest(".mini-card").getAttribute("data-zz-value")]
      .radioId
  );

  miniHeader.addEventListener("mouseover", () => {
    radioButton.focus();
  });
  miniHeader.addEventListener("mouseleave", () => {
    radioButton.blur();
  });
  miniHeader.addEventListener("click", () => {
    radioButton.click();
  });
});

const rewardButtons = document.querySelectorAll(
  "#details-section .btn-reward:enabled"
);
rewardButtons.forEach((rewardButton) => {
  rewardButton.addEventListener("click", () => {
    const reward = rewardButton.closest(".card").getAttribute("data-zz-value");
    goToModalReward(reward);
  });
});

document.getElementById("bookmark-btn").addEventListener("click", () => {
  document.getElementById("bookmark-btn").classList.toggle("bookmarked");
});

const pledgeForms = document.querySelectorAll(".card.mini-card form");

pledgeForms.forEach((pledgeform) => {
  pledgeform.addEventListener("submit", (event) => {
    event.preventDefault();
    const formId = event.target?.id;
    const form = document.getElementById(formId);
    const card = form.getAttribute("data-zz-value");

    const pledgeValue = form.elements[IDS_DICT[card].inputId].value;

    handlePledgeChanges(card, pledgeValue);
  });
});

const mediaQuery = window.matchMedia("(max-width: 767.98px)");
mediaQuery.addEventListener("change", mediaQueryChange);

const navLinks = document.querySelectorAll(".nav-item>a");
const menuToggle = document.getElementById("navbarSupportedContent");
navLinks.forEach((navLink) => {
  navLink.addEventListener("click", () => {
    const bsCollapse = new bootstrap.Collapse(menuToggle);
    bsCollapse.toggle();
  });
});

mediaQueryChange(mediaQuery);
