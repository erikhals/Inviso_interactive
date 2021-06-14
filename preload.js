"use strict";

const { contextBridge, ipcRenderer } = require("electron");

let jsonData = require("./lister.json");

window.addEventListener("DOMContentLoaded", () => {
  updateFeatures(jsonData);
});

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
  send: (channel, data) => {
    // whitelist channels
    let validChannels = ["onDragStart", "onDropped"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    let validChannels = ["fromDropped"];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
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
      li.innerHTML = json[u].list[i]; // Use innerHTML to set the text
      ul.appendChild(li);
    }
    listDiv.appendChild(ul);
  }
}

/* let data = JSON.stringify(jsonData);

fs.writeFile("student-3.json", data, (err) => {
  if (err) throw err;
  console.log("Data written to file");
});
 */
