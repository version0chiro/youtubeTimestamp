document.addEventListener("DOMContentLoaded", function () {
  // eventlistner on button on extension
  document.getElementById("save_button").addEventListener("click", function () {
    // get the url of the current tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "save" });
    });
  });

  const bg = chrome.extension.getBackgroundPage();
  Object.keys(bg.videos).forEach(function (title) {
    const time = bg.videos[title].currentTime;

    const searchURL = bg.videos[title].searchURL;

    // convert time string into seconds
    const timeInSeconds = time.split(":").reduce(function (acc, curr) {
      return acc * 60 + parseInt(curr);
    }, 0);

    const div = document.createElement("div");
    div.className = "flex flex-row justify-between items-center";

    const li = document.createElement("li");
    li.innerText = title + ": " + time;

    li.className = "font-weight-bold";

    // add the url as href for li

    const a = document.createElement("button");

    // extract params from url
    const params = new URLSearchParams(searchURL);

    a.innerText = "Open";

    a.href =
      "https://www.youtube.com/watch?v=" +
      params.get("v") +
      "&t=" +
      timeInSeconds;

    //https://youtu.be/PnUnL5xdMkM?t=407

    a.className = "text-white mx-2 p-2 bg-blue-500 hover:bg-blue-700 rounded";

    a.addEventListener("click", function () {
      chrome.tabs.create({ url: this.href });
    });

    // add a remove button to the li

    const removeButton = document.createElement("button");

    removeButton.innerText = "Remove";

    removeButton.className =
      "text-white mx-2 p-2 bg-red-500 hover:bg-red-700 rounded";

    removeButton.addEventListener("click", function () {
      chrome.runtime.sendMessage({
        action: "remove",
        title: title,
      });
    });

    div.appendChild(li);
    div.appendChild(removeButton);
    div.appendChild(a);

    document.getElementById("timestamps").appendChild(div);
  });
});
