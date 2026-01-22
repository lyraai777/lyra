window.addEventListener("load", () => {
  const intro = document.getElementById("intro-screen");
  const app = document.getElementById("app");

  setTimeout(() => {
    intro.style.opacity = "0";
    intro.style.transition = "opacity 1s ease";

    setTimeout(() => {
      intro.remove();
      app.classList.remove("hidden");
    }, 1000);

  }, 2500); // intro duration
});
