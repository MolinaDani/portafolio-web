export default function createIntersectionObserver(options) {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entrie) => {
        if (entrie.isIntersecting) {
          entrie.target.classList.add("intersected");
          observer.unobserve(entrie.target);
        }
      });
    },
    {
      ...options,
    },
  );

  return observer;
}
