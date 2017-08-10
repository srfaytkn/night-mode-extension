chrome.extension.sendRequest({nightModeStatus: null},
  function (response) {//popup açılınca switcher için durumu sorgula
    document.getElementById('modeSwitcher').checked = response.nightModeStatus;
  }
);

document.getElementById('modeSwitcher').addEventListener('change',
  function (e) {//switch değişince background.js tetikle
    chrome.extension.sendRequest({nightModeStatus: e.currentTarget.checked});
  }
);