const cache = {
  selector: '',
  stagingMarkup: '',
};

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
  const parsedRequest = JSON.parse(request);
  const { html, selector, type } = parsedRequest;
  let response = { type: `${type}Response` };

  if (type === 'checkScript') {
    response.html = cache.stagingMarkup;
    response.selector = cache.selector;
  } else if (type === 'requestHtml') {
    const pageHtml = getHtml(selector);
    response.html = pageHtml;
    cache.stagingMarkup = pageHtml;
  } else if (type === 'setPageHtml') {
    setPageHtml(html, selector);
  } else if (type === 'updateCache') {
    const { target, value } = parsedRequest;
    cache[target] = value;
  }

  sendResponse(JSON.stringify(response));
}

chrome.runtime.onMessage.addListener(onMessage);
