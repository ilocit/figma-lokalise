// This plugin will check all layers named with the right convention,
// check against the corresponding keys on the Lokalise API,
// and then update the text in Figma with the correct translations.

/////////////////////////////////
// VARIABLE DECLARATION
/////////////////////////////////

let translatableLayersArray = {};

/////////////////////////////////
// FIGMA PLUGIN INIT
/////////////////////////////////

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// Enable Figma color tokens
figma.showUI(__html__, { themeColors: true, /* other options */ });

// Resize the UI modal
figma.ui.resize(360, 560)

// If there is a project-id key on the clientStorage set it on the input 
figma.clientStorage.getAsync('project-id').then(result => {
  figma.ui.postMessage({
    type: "project",
    value: result
  });
});

// If there is a api-token key on the clientStorage set it on the input 
figma.clientStorage.getAsync('api-token').then(result => {
  figma.ui.postMessage({
    type: "token",
    value: result
  });
});

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
  if (msg.type === 'project') {
    figma.clientStorage.setAsync('project-id', msg.projectValue);
    // console.log(msg.projectValue);
  }

  if (msg.type === 'token') {
    figma.clientStorage.setAsync('api-token', msg.tokenValue);
    // console.log(msg.tokenValue);
  }

  if (msg.type === 'update') {
    // Finds all text layers with our naming convention in the current page
    translatableLayersArray = figma.currentPage.findAll(node => {
      return node.type === "TEXT" && node.name.includes('}}+{');
    });
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  // figma.closePlugin();
};

/////////////////////////////////
// FUNCTIONS
/////////////////////////////////



/////////////////////////////////
// FUNCTIONS
/////////////////////////////////