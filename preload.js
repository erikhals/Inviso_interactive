"use strict";
let jsonData = require("./lister.json");

window.addEventListener("DOMContentLoaded", () => {
  for (let u = 0; u < 6; u++) {
    let v = u + 1;

    let featureText = document.getElementById("featuretext" + v);
    featureText.innerHTML = jsonData[u].title;

    let listDiv = document.getElementById("feature" + v + "box");
    listDiv.innerHTML = "";
    let ul = document.createElement("ul");
    for (var i = 0; i < jsonData[u].list.length; ++i) {
      let li = document.createElement("li");
      li.innerHTML = jsonData[u].list[i]; // Use innerHTML to set the text
      ul.appendChild(li);
    }
    listDiv.appendChild(ul);
  }
});
