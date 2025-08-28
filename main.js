document.addEventListener("DOMContentLoaded", () => {
  // Кнопка у Hero
  document.querySelector(".cta-btn").addEventListener("click", () => {
    alert("🚀 Ласкаво просимо до Gamer Hub!");
  });

  // Модальне вікно
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalText = document.getElementById("modal-text");
  const closeBtn = document.querySelector(".close");

  const gameInfo = {
    "Minecraft": "Minecraft – це світ кубів, де можна виживати, будувати, створювати механізми та досліджувати нескінченні світи.",
    "Roblox": "Roblox – це платформа, де можна створювати власні ігри, або грати у мільйони вже створених іншими.",
    "CSGO": "CS:GO – легендарний шутер від Valve, де головне – командна гра, тактика і реакція."
  };

  document.querySelectorAll(".info-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const game = btn.getAttribute("data-game");
      modalTitle.textContent = game;
      modalText.textContent = gameInfo[game];
      modal.style.display = "block";
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
