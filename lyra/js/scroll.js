export function createScrollContainer(content) {
  const container = document.createElement("div");
  container.className = "scroll-container";
  container.appendChild(content);
  return container;
}
