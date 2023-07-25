chrome.runtime.onConnect.addListener((port) => {
    port.onMessage.addListener((message) => {
      if (message.type === 'CAPTURE_SCREENSHOT') {
        // Perform the screenshot capture
        chrome.tabs.captureVisibleTab(null, {}, (screenshotUrl) => {
          // Send the response back to the content script
          port.postMessage({ screenshotUrl: screenshotUrl });
        });
      }
    });
  });
  