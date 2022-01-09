window.videos = {};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "save") {
    window.videos[request.videoTitle] = {
      url: request["url"],
      currentTime: request["currentTime"],
      searchURL: request["searchURL"],
    };
  } else if (request.action === "remove") {
    delete window.videos[request.title];
  }

  //   chrome.browserAction.onClicked.addListener(function (tab) {
  //     chrome.tabs.create({ url: "../popup.html" });
  //   });
});
