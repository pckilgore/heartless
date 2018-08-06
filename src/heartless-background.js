browser.tabs
  .executeScript({file: './heartless.js'})
  // .then(listenForClicks)
  .catch(reportErr)

browser.tabs.insertCSS({file: './base.css'}).catch(reportErr)

function reportErr(error) {
  console.groupCollapsed('Heartless Error Report')
  console.error(`Failed to inject content.`)
  console.groupCollapsed('Error Message:')
  console.error(`${error.message}`)
  console.groupEnd()
  console.groupEnd()
}
