// const axios = require('axios')

/*
* When the browseraction button is pressed, it fires this event.
*/

function hideListener(tab) {
  browser.tabs.sendMessage(tab.id, {action: 'HEARTLESS_HIDE'}).then(() => {
    /*
      *  Once the content script responds with the current height,
      *  wait 60 seconds then reset to whatever state is.
      */
    setTimeout(() => {
      browser.tabs.sendMessage(tab.id, {
        action: 'HEARTLESS_RESET'
      })
    }, 60000)
  })
}

browser.browserAction.onClicked.addListener(hideListener)

function reportErr(error) {
  console.groupCollapsed('Heartless Error.')
  console.groupCollapsed('Error Message:')
  console.error(`${error.message}`)
  console.groupEnd()
  console.groupEnd()
}
