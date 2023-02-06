// This plugin will check all layers named with the right convention,
// check against the corresponding keys on the Lokalise API,
// and then update the text in Figma with the correct translations.

/////////////////////////////////
// VARIABLE DECLARATION
/////////////////////////////////

// Lokalise global variables
let lokaliseProjectID = "";
let lokaliseAPIToken = "";

// The array of layers that are named to be translated
let translatableLayersArray = {};

/////////////////////////////////
// FIGMA PLUGIN INIT
/////////////////////////////////

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// Enable Figma color tokens
figma.showUI(__html__, { themeColors: true, /* other options */ });

// Resize the UI modal
figma.ui.resize(360, 560);

// If there is a project-id key on the clientStorage set it on the input 
figma.clientStorage.getAsync('project-id').then(result => {
  // Send the value to the plugin UI
  figma.ui.postMessage({
    type: "project",
    value: result
  });
});

// If there is a api-token key on the clientStorage set it on the input 
figma.clientStorage.getAsync('api-token').then(result => {
  // Send the value to the plugin UI
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
    // Save the project ID to the plugin local storage
    figma.clientStorage.setAsync('project-id', msg.projectValue);

    // Store it on the variable
    if (!lokaliseProjectID) {
      lokaliseProjectID = msg.projectValue;
    }
  }

  if (msg.type === 'token') {
    // Save the API token to the plugin local storage
    figma.clientStorage.setAsync('api-token', msg.tokenValue);

    // Store it on the variable
    if (!lokaliseAPIToken) {
      lokaliseAPIToken = msg.tokenValue;
    }
  }

  if (msg.type === 'update') {
    // Finds all text layers with our naming convention in the current page
    translatableLayersArray = figma.currentPage.findAll(node => {
      return node.type === "TEXT" && node.name.includes('}}+{');
    });

    // Get the translations from Lokalise
    lokaliseMagic();
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  // figma.closePlugin();
};

/////////////////////////////////
// LOKALISE STUFF
/////////////////////////////////

// const lokaliseFetchURL =`https://cors-anywhere.herokuapp.com/https://api.lokalise.com/api2/projects/${lokaliseProjectID}/keys?include_translations=1`;

// const lokaliseFetchOptions = {
//   method: "GET",
//   mode: "cors",
//   headers: {
//       accept: "application/json",
//       "X-Api-Token": `${lokaliseAPIToken}`
//   }
// };

const lokaliseMagic = () => {
  // console.log('lokaliseMagic has ran!')

  // fetch(lokaliseFetchURL, lokaliseFetchOptions)
  //       .then((response) => response.json())
  //       .then((response) => {
  //           // window.localStorage.setItem(
  //           //     "lokaliseKeyList",
  //           //     JSON.stringify(response)
  //           // );
  //           console.log(response)
  //       })
  //       .catch((err) => console.error(err));
};

/////////////////////////////////
// FUNCTIONS
/////////////////////////////////