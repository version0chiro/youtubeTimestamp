// check if there is a youtube video on the page

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "save") {
    if (
      document.getElementsByClassName("video-stream html5-main-video")[0] !=
        undefined ||
      document.getElementsByClassName("video-stream html5-main-video")[0] !=
        null
    ) {
      // get the video title
      var videoTitle = document
        .getElementsByClassName("ytp-title-text")[0]
        .innerText.replace(/\s+/g, " ");

      // pause video
      document.getElementsByClassName("ytp-play-button ytp-button")[0].click();

      // get the current time
      var currentTime =
        document.getElementsByClassName("ytp-time-current")[0].innerText;

      // play video
      document.getElementsByClassName("ytp-play-button ytp-button")[0].click();

      const searchURL = document.location.search;

      // send the data to the background script
      chrome.runtime.sendMessage({
        url: window.location.href,
        videoTitle: videoTitle,
        currentTime: currentTime,
        action: "save",
        searchURL: searchURL,
      });
    }
  } else if (request.action === "remove") {
    chrome.runtime.sendMessage({
      action: "remove",
      title: request.title,
    });
  }
});
