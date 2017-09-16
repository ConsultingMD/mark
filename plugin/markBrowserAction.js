function beautifyHtml() {
  const html = htmlInput.value;
  if (html === '') return;
  const beautifiedHtml = html_beautify(html, { indent_size: 2 });
  setPopupHtml(beautifiedHtml);
  updateCache('stagingMarkup', beautifiedHtml);
}

function initializeBrowserAction(filteredTabs) {
  activeTab = filteredTabs[0];
  const message = JSON.stringify({ type: 'checkScript' });
  sendMessage(message);
}

function onChange(event) {
  const target = event.target.id === 'm-selector' ? 'selector' : 'stagingMarkup';
  const value = event.target.value;
  updateCache(target, value);
}

function onMessage(response) {
  if (response === undefined) {
    startContentScript();
  } else {
    const { html, selector, type } = JSON.parse(response);

    if (type === 'checkScriptResponse') {
      setPopupHtml(html);
      setSelector(selector);
    } else if (type === 'requestHtmlResponse') {
      setPopupHtml(html);
    } else if (type === 'setPageHtmlResponse') {

    } else if (type === 'updateCacheResponse') {

    }
  }
}

function requestHtml() {
  const selector = selectorInput.value;
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

function setPageHtml() {
  const html = htmlInput.value;
  const selector = selectorInput.value;
  if (html === '' || selector === '') return;
  const request = {
    html,
    selector,
    type: 'setPageHtml',
  };
  const message = JSON.stringify(request);
  sendMessage(message);
}

function setPopupHtml(html) {
  htmlInput.value = html;
}

function setSelector(selector) {
  selectorInput.value = selector;
}

function startContentScript() {
  chrome.tabs.executeScript(activeTab.id, { file: "markContentScript.js" });
}

function updateCache(target, value) {
  const request = {
    target,
    type: 'updateCache',
    value,
  };
  const message = JSON.stringify(request);
  sendMessage(message);
}

let activeTab = null;
const beautifyButton = document.getElementById('action-beautify-html');
const getHtmlButton = document.getElementById('action-get-html');
const setHtmlButton = document.getElementById('action-set-html');
const htmlInput = document.getElementById('m-html');
const selectorInput = document.getElementById('m-selector');

chrome.tabs.query({ active: true, currentWindow: true }, initializeBrowserAction);

beautifyButton.addEventListener('click', beautifyHtml);
getHtmlButton.addEventListener('click', requestHtml);
setHtmlButton.addEventListener('click', setPageHtml);
htmlInput.addEventListener('change', onChange);
selectorInput.addEventListener('change', onChange);
