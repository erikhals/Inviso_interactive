function animate() {
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
}
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
      .to(outline, { opacity: 1 }, "=-0.2");

    //Click animation
    let clicktl = gsap.timeline({ paused: true });
    clicktl
      .to(textline, { opacity: 1, duration: 0.2 })
      .to(box, { opacity: 1, duration: 0.3 }, "<")
      .to(list, { opacity: 1, translateX: 0, stagger: 0.1 }, "<");

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

animate();

const dragfrom = document.getElementById("drag");
dragfrom.ondragstart = (event) => {
  event.preventDefault();
  window.api.send("onDragStart", "lister.json");
};

const dragto = document.getElementById("inviso");
dragto.addEventListener("drop", (event) => {
  event.preventDefault();
  event.stopPropagation();

  window.api.receive("fromDropped", (data) => {
    updateFeatures(data);
  });

  for (const f of event.dataTransfer.files) {
    // Using the path attribute to get absolute file path
    window.api.send("onDropped", f.path);
  }
});

dragto.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.stopPropagation();
});

dragto.addEventListener("dragenter", (event) => {
  console.log("File is in the Drop Space");
});

dragto.addEventListener("dragleave", (event) => {
  console.log("File has left the Drop Space");
});

function updateFeatures(json) {
  for (let u = 0; u < 6; u++) {
    let v = u + 1;

    let featureText = document.getElementById("featuretext" + v);
    featureText.innerHTML = json[u].title;

    let listDiv = document.getElementById("feature" + v + "box");
    listDiv.innerHTML = "";
    let ul = document.createElement("ul");
    for (var i = 0; i < json[u].list.length; ++i) {
      let li = document.createElement("li");
      li.innerHTML = json[u].list[i]; // Use innerHTML to set the text'
      ul.appendChild(li);
    }
    listDiv.appendChild(ul);
  }
}
