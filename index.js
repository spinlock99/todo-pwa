import React from "react";
import { render } from "react-dom";
import { App } from "./src/app";
import { initializeMaterialUI, initializeServiceWorker } from "./src/initializers";
import OfflinePluginRuntime from "offline-plugin/runtime";
OfflinePluginRuntime.install();

initializeMaterialUI();

if (navigator.standalone) {
  gtag('event', 'load', { 'event_category': 'application', 'event_label': 'homescreen', 'value': 'yay' })
} else {
  gtag('event', 'load', { 'event_category': 'application', 'event_label': 'web', 'value': 'boo' })
}

const containerEl = document.getElementById("container");
render(<App />, containerEl);
