function getHtml(selector) {
  const selection = document.querySelectorAll(selector)[0];
  return selection.outerHTML;
}

function onMessage(request, _sender, sendResponse) {
  const { selector, type } = JSON.parse(request);
  let response = { type: `${type}Response` };

  if (type === 'checkScript') {

  } else if (type === 'requestHtml') {
    response.html = getHtml(selector)
  }

  sendResponse(JSON.stringify(response));
}

chrome.runtime.onMessage.addListener(onMessage);
