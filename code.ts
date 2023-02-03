// This plugin will check all layers named with the right convention,
// check against the corresponding keys on the Lokalise API,
// and then update the text in Figma with the correct translations.

/////////////////////////
// TYPES
/////////////////////////

const types = [
  "PAGE",
  "TEXT"
];

/////////////////////////
// VARIABLE DECLARATION
/////////////////////////

const projectID = "";
const APItoken = "";

let translatableLayersArray = {};

/////////////////////////
// FIGMA PLUGIN INIT
/////////////////////////

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// Enable Figma color tokens
figma.showUI(__html__, { themeColors: true, /* other options */ });

// Resize the UI modal
figma.ui.resize(360, 560)

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === 'update') {
    // Get the Lokalise project ID from the input

    // Get the Lokalise API token from the input

    // Finds all text layers with our naming convention in the current page
    translatableLayersArray = figma.currentPage.findAll(node => {
      return node.type === "TEXT" && node.name.includes("}}+{")
    });
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  // figma.closePlugin();
};

/////////////////////////
// FUNCTIONS
/////////////////////////