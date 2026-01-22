import { renderHome } from "./screens/home.js";

export function loadScreen(name) {
  const main = document.getElementById("main-content");
  main.innerHTML = "";

  if (name === "home") {
    main.appendChild(renderHome());
  }
}
