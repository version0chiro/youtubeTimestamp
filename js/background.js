// save window videos to local storage

window.videos = JSON.parse(localStorage.getItem("videos")) || {};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "save") {
    window.videos[request.videoTitle] = {
      url: request["url"],
      currentTime: request["currentTime"],
      searchURL: request["searchURL"],
    };

    localStorage.setItem("videos", JSON.stringify(window.videos));
  } else if (request.action === "remove") {
    delete window.videos[request.title];

    localStorage.setItem("videos", JSON.stringify(window.videos));
  }

  //   chrome.browserAction.onClicked.addListener(function (tab) {
  //     chrome.tabs.create({ url: "../popup.html" });
  //   });
});
