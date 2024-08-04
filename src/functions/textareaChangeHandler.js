export default function handler(e, counterElement) {
  counterElement.innerHTML = `${e.target.value.length}/500`;
}
