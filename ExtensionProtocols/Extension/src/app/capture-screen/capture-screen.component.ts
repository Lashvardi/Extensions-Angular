import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-capture-screen',
  templateUrl: './capture-screen.component.html',
  styleUrls: ['./capture-screen.component.scss'],
})
export class CaptureScreenComponent implements OnDestroy {
  private captureIntervalId: any;
  private handleScreenshotURL: (event: MessageEvent) => void;
  helloWorldMessage: string = ''; // Property to store the received message

  constructor() {
    // Create an arrow function to correctly capture the 'this' context
    this.handleScreenshotURL = (event: MessageEvent) => {
      if (event.data.type && event.data.type === 'SCREENSHOT_URL') {
        const message = event.data.url.message;
        this.helloWorldMessage = message; // Update the property with the received message
      }
    };

    // Listen for the screenshot URLs only once in the constructor
    window.addEventListener('message', this.handleScreenshotURL, false);
  }

  ngOnDestroy() {
    // Remove the event listener when the component is destroyed to avoid memory leaks
    window.removeEventListener('message', this.handleScreenshotURL);
  }

  startCapturing() {
    window.postMessage({ type: 'CAPTURE_SCREENSHOT' }, '*');
  }

  stopCapturing() {
    const event = new CustomEvent('STOP_CAPTURE', {
      detail: { type: 'STOP_CAPTURE' },
    });
    // Dispatch the custom event
    window.dispatchEvent(event);
  }
}
