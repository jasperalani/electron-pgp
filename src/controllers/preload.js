// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) {
      element.innerText = text;
    }
  };

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type]);
  }

  // // Head
  // (async () => {
  //   document.querySelector('head').innerHTML += `
  //   <meta charset="UTF-8">
  //   <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
  //   <meta http-equiv="X-Content-Security-Policy" content="default-src 'self'; script-src 'self'">
  //   <link rel="stylesheet" href="../css/halfmoon.min.css">
  //   <link rel="stylesheet" href="../css/halfmoon-variables.min.css">
  //   <link rel="stylesheet" href="../css/theme.css">
  // `;
  // })();
})


