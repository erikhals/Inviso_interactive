//Intro timeline
let intro = true;
let tl1 = gsap.timeline({ onComplete: makeInteractive });
tl1
  .from(".feature", {
    scale: 0.95,
    opacity: 0,
    transformOrigin: "center",
    stagger: 0.1,
    delay: 0.5,
  })
  .to(".feature", { opacity: 0.5, scale: 0.95, transformOrigin: "center" })
  .to(".outline, .connector, .textline", { opacity: 0 }, "<");

//Feature interactivity
function makeInteractive() {
  gsap.utils.toArray(".feature").forEach((feature) => {
    const line = feature.querySelector(".connector"),
      outline = feature.querySelector(".outline"),
      textline = feature.querySelector(".textline"),
      boxId = "#" + feature.id + "box",
      box = document.querySelector(boxId),
      list = box.querySelectorAll("ul li");

    //Click to toggle active
    let active = false;

    //Hover animation
    let hovertl = gsap.timeline({ paused: true });
    hovertl
      .to(feature, { opacity: 1, scale: 1 })
      .to(line, { opacity: 1 }, "<")
      .to(outline, { opacity: 1 });

    //Click animation
    let clicktl = gsap.timeline({ paused: true });
    clicktl
      .to(textline, { opacity: 1, duration: 0.2 })
      .to(box, { opacity: 1, duration: 0.3 }, "<")
      .to(list, { opacity: 1, stagger: 0.1 }, "<");

    //Hover and click listeners
    feature.addEventListener("mouseenter", () => !active && hovertl.play());
    feature.addEventListener("mouseleave", () => !active && hovertl.reverse());

    feature.addEventListener("click", () => {
      hovertl.progress(1).paused(true);
      active ? clicktl.reverse() : clicktl.play();
      active = !active;
    });
  });
}
