let tl1 = gsap.timeline();
tl1
  .from(".feature", {
    scale: 0.95,
    opacity: 0,
    transformOrigin: "center",
    stagger: 0.1,
  })
  .to(".feature", { opacity: 0.5, scale: 0.95, transformOrigin: "center" })
  .to(".outline, .connector, .textline", { opacity: 0 }, "<");

let tl2 = gsap.timeline({ paused: true, yoyo: true });

gsap.utils.toArray(".feature").forEach((feature) => {
  const pad = feature.querySelector(".pad"),
    line = feature.querySelector(".connector"),
    outline = feature.querySelector(".outline"),
    textline = feature.querySelector(".textline");
  let active = false;

  let hovertl = gsap.timeline({ paused: true });
  hovertl
    .to(feature, { opacity: 1, scale: 1 })
    .to(line, { opacity: 1 }, "<")
    .to(outline, { opacity: 1 });

  let clicktl = gsap.timeline({ paused: true });
  clicktl.to(textline, { opacity: 1 });

  feature.addEventListener("mouseenter", () => !active && hovertl.play());
  feature.addEventListener("mouseleave", () => !active && hovertl.reverse());
  feature.addEventListener("click", () => {
    hovertl.progress(1).paused(true);
    active = !active;
  });
});
