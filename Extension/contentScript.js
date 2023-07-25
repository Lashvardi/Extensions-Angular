if (!window.contentScriptListenerAdded) {
  // Function to handle the response from the background script
  function handleResponseFromBackground(response) {
    console.log('Response from background script:', response);

    // For testing purposes, always return "Hello, World!" as the response
    const helloWorldResponse = { message: 'Connection Estabilished' };

    // Send the response to the content script only once
    window.postMessage({
      type: 'SCREENSHOT_URL',
      url: helloWorldResponse
    }, '*');

    // Remove the event listener to prevent multiple responses
    window.removeEventListener('message', handleResponseFromBackground);
  }

  // Add an event listener for messages from the background script
  window.addEventListener('message', (event) => {
    // We only accept messages from ourselves
    if (event.source != window)
      return;

    if (event.data.type && event.data.type === 'CAPTURE_SCREENSHOT') {
      // Send a message to the background script in response to a user gesture
      chrome.runtime.sendMessage({ action: 'capture' }, handleResponseFromBackground);
    }
  });

  // Set a flag to indicate that the event listener has been added
  window.contentScriptListenerAdded = true;
}
