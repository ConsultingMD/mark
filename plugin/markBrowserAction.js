function initializeMark(tabs) {
  activeTab = tabs[0];
  chrome.tabs.executeScript(activeTab.id, { file: "markContentScript.js" });
}

function onMessage(response) {
  const parsedReponse = JSON.parse(response);

  if (parsedReponse.type === 'requestHtmlResponse') {
    setHtml(parsedReponse.html);
  }
}

function requestHtml() {
  const selector = selctorInput.value;
  if (selector === '') return;
  const request = {
    selector,
    type: 'requestHtml',
  };
  const message = JSON.stringify(request);
  sendMessage(message);
}

function sendMessage(message) {
  chrome.tabs.sendMessage(activeTab.id, message, onMessage);
}

function setHtml(html) {
  htmlInput.value = html;
}

let activeTab = null;
const getHtmlButton = document.getElementById('action-get-html');
const selctorInput = document.getElementById('m-selector');
const htmlInput = document.getElementById('m-html');

chrome.tabs.query({ active: true, currentWindow: true }, initializeMark);

getHtmlButton.addEventListener('click', requestHtml)
