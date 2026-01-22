import { createScrollContainer } from "../scroll.js";

export function renderHome() {
  const screen = document.createElement("div");
  screen.className = "home-screen";

  screen.innerHTML = `
    <div class="home-title">LYRA</div>
    <div class="home-subtitle">Logic · Learn · Lead</div>

    <div class="home-card">
      This is not a chatbot.<br />
      This is a thinking space.
    </div>

    <div class="home-card">
      Built for calm minds.<br />
      Designed for deep focus.
    </div>
  `;

  return createScrollContainer(screen);
}
