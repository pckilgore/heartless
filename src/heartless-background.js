/*global getAccessToken*/
/*global getUserInfo*/

function logError(error) {
  console.error('there was an error')
  console.error(`Error: ${error}`)
}

// let needToLogin = true

/*
* When the browseraction button is pressed, it fires this event.
*/
function hideListener(tab) {
  // if (needToLogin) {
  //   console.log('Let us login then...')
  //   setHeartless(tab)
  //   needToLogin = false
  // }
  // console.log('skipping login')
  browser.tabs.sendMessage(tab.id, {action: 'HEARTLESS_HIDE'}).then(() => {
    /*
      *  Once the content script responds with the current height,
      *  wait 20 seconds to reset with new data.  So also a reset button.
      */
    setTimeout(() => {
      console.log("Heartless...and....we're back!")
      setHeartless(tab)
    }, 20000)
  })
}

const parseSessionData = sessionData => {
  console.groupCollapsed('Heartless: Remote Data')
  console.log(sessionData)
  console.groupEnd()
  const totalMillis = sessionData.session.reduce(
    (sum, val) =>
      [72, 109, 110, 111, 112].includes(val.activityType)
        ? sum
        : sum + (val.endTimeMillis - val.startTimeMillis),
    0
  )
  const minutes = totalMillis / 1000 / 60
  return Math.ceil(75 - minutes / 180 * 75)
}

browser.browserAction.onClicked.addListener(hideListener)

browser.runtime.onMessage.addListener(message => {
  browser.tabs.query({currentWindow: true, active: true}).then(([tab]) => {
    if (message.action === 'HEARTLESS_BG_LOAD') setHeartless(tab)
  })
})

function setHeartless(tab) {
  console.log('heartless: Pulling remote data...')
  getAccessToken()
    .then(getUserInfo)
    // .then(response => {
    //   return browser.tabs
    //     .sendMessage(tab.id, {action: 'HEARTLESS_LOGGED_IN'})
    //     .then(() => {
    //       return response
    //     })
    // })
    .then(response => fitResponsHandler(response, tab))
    .catch(logError)
}

function fitResponsHandler(response, tab) {
  browser.tabs
    .sendMessage(tab.id, {
      action: 'HEARTLESS_SET_HEIGHT',
      height: parseSessionData(response)
    })
    .catch(logError)
}
