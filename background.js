browser.tabs
  .insertCSS()
  .executeScript({file: '/content_scripts/heartless.js'})
  .then(listenForClicks)
  .catch(reportExecuteScriptError)

function reportExecuteScriptError(error) {
  console.groupCollapsed('Heartless Error Report')
  console.error(`Failed to execute heartless content script.`)
  console.groupCollapsed('Error Message:')
  console.error(`${error.message}`)
  console.groupEnd()
  console.groupEnd()
}
