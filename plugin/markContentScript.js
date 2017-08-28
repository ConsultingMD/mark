function getHtml(selector) {
  const selection = document.querySelectorAll(selector)[0];
  return selection.outerHTML;
}

function onMessage(request, _sender, sendResponse) {
  let response;
  const { selector, type } = JSON.parse(request);

  if (type === 'requestHtml') {
    response = {
      html: getHtml(selector),
      type: 'requestHtmlResponse'
    };
  }

  sendResponse(JSON.stringify(response));
}

chrome.runtime.onMessage.addListener(onMessage);
