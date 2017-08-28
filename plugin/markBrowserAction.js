function initializeMark(filteredTabs) {
  activeTab = filteredTabs[0];
  const message = JSON.stringify({ type: 'checkScript' });
  sendMessage(message);
}

function onMessage(response) {
  if (response === undefined) {
    startContentScript();
  } else {
    const { html, type } = JSON.parse(response);

    if (type === 'checkScriptResponse') {

    } else if (type === 'requestHtmlResponse') {
      setHtml(html);
    }
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

function startContentScript() {
  chrome.tabs.executeScript(activeTab.id, { file: "markContentScript.js" });
}

let activeTab = null;
const getHtmlButton = document.getElementById('action-get-html');
const selctorInput = document.getElementById('m-selector');
const htmlInput = document.getElementById('m-html');

chrome.tabs.query({ active: true, currentWindow: true }, initializeMark);

getHtmlButton.addEventListener('click', requestHtml)
