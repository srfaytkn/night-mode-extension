var nightModeIsEnabled = false;
var rootElement = 'document.head.parentElement';

chrome.extension.onRequest.addListener(
  function (request, sender, sendResponse) {//popup switch eventlarını dinliyor
    switch (request.nightModeStatus) {
      case true:
        nightModeIsEnabled = true;
        changeNightMode();
        break;
      case false:
        nightModeIsEnabled = false;
        changeNightMode();
        break;
      default:
        sendResponse({nightModeStatus: nightModeIsEnabled});
        break
    }
  }
);

chrome.webRequest.onBeforeRequest.addListener(//sayfa değişme eventı
  function (details) {
    changeNightMode();
  }, {
    urls: [
      "*://*/*"
    ]
  }
);

chrome.tabs.onActivated.addListener(//sekme değişme eventı
  function (tabId, changeInfo, tab) {
    changeNightMode();
  }
);

var changeNightMode = function () {
  if (nightModeIsEnabled) {//nightMode aktifse biz birde html tagına bakalım var mı yok mu
    chrome.tabs.executeScript(null, {
      code: rootElement + '.classList.value.split(" ").indexOf("night-mode-bg") > -1'//html tagında nightMode eklimi bakıyor
    }, function (nightModeStatus) {
      if (String(nightModeStatus) !== "true") {//nightMode etkin ancak html tagında yoksa ekleyelim hemen
        chrome.tabs.executeScript({
          code: rootElement + '.className += " night-mode-bg";'
        });
      }
    });
  } else {//nightMode aktif değilse classı kaldır
    chrome.tabs.executeScript({
      code: rootElement + '.classList.remove("night-mode-bg");'
    });
  }
};