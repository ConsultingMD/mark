function getSelection(selector) {
  return document.querySelectorAll(selector)[0];
}


function getHtml(selector) {
  const selection = getSelection(selector);
  return selection.outerHTML;
}

function setPageHtml(html, selector) {
  const selection = getSelection(selector);
  selection.outerHTML = html;
}

function onMessage(request, _sender, sendResponse) {
  const { html, selector, type } = JSON.parse(request);
  let response = { type: `${type}Response` };

  if (type === 'checkScript') {

  } else if (type === 'requestHtml') {
    response.html = getHtml(selector);
  } else if (type === 'setPageHtml') {
    setPageHtml(html, selector);
  }

  sendResponse(JSON.stringify(response));
}

chrome.runtime.onMessage.addListener(onMessage);
