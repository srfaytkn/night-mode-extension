chrome.extension.sendRequest(
  {nightModeStatus: null},
  function (response) {//sayfa yüklenince nightMode durumunu sorgula
    if (response.nightModeStatus) {
      document.head.parentElement.className += " night-mode-bg";
    }
  }
);