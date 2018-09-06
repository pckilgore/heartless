/*global getAccessToken*/
/*global getUserInfo*/

/**
 *  Cross Browser compatability...namespace webextension API to browser.XXXX
 */
window.browser = (() => window.msBrowser || window.browser || window.chrome)()

function logError(error) {
  console.error('there was an error')
  console.error(`Error: ${error}`)
}

let needToLogin = true

function login(tab) {
  setHeartless(tab)
}

function hideTron(tab) {
  browser.tabs.sendMessage(tab.id, {action: 'HEARTLESS_HIDE'}).then(() => {
    /*
    *  Once the content script responds with the current height,
    *  wait 20 seconds to reset with new data.  So also a reset button.
    */
    setTimeout(() => {
      setHeartless(tab)
    }, 20000)
  })
}

/*
* When the browseraction button is pressed, it fires this event.
*/
function actionListener(tab) {
  if (needToLogin) {
    login(tab)
  } else {
    hideTron(tab)
  }
}

const parseSessionData = sessionData => {
  // Reduces exercise time from multiple sessions returned by API into a single
  // time, which is used to set the TRON div height in the browser window.

  // Development helpers.  Uncomment if you need to debug the Fitness API.
  // console.groupCollapsed('Heartless: Remote Data')
  // console.log(sessionData)
  // console.groupEnd()
  const MILLIS_IN_SECOND = 1000
  const SECONDS_IN_MINUTES = 60
  const goalTime = 180 // TODO: add to settings page / read from storage.
  const minTime = 75

  // These are 'sleep' activies as defined by the Google Fitness API.
  // They shouldn't count.
  const EXCLUDED_ACTIVITIES = [72, 109, 110, 111, 112]
  const sumValid = (sum, val) =>
    EXCLUDED_ACTIVITIES.includes(val.activityType)
      ? sum
      : sum + (val.endTimeMillis - val.startTimeMillis)

  const minutes =
    sessionData.session.reduce(sumValid, 0) /
    MILLIS_IN_SECOND /
    SECONDS_IN_MINUTES

  return Math.ceil(minTime - minutes / goalTime * minTime)
}

browser.browserAction.onClicked.addListener(actionListener)

browser.runtime.onMessage.addListener(message => {
  browser.tabs
    .query({currentWindow: true, active: true})
    .then(([tab]) => {
      if (message.action === 'HEARTLESS_BG_LOAD' && !needToLogin) {
        setHeartless(tab)
      } else if (needToLogin) {
        // User isn't logged in, do nothing.
        return true
      }
    })
    .catch(logError)
})

function setHeartless(tab) {
  getAccessToken()
    .then(getUserInfo)
    .then(response => fitResponsHandler(response, tab))
    .catch(logError)
}

function fitResponsHandler(response, tab) {
  needToLogin = false
  browser.tabs
    .sendMessage(tab.id, {
      action: 'HEARTLESS_SET_HEIGHT',
      height: parseSessionData(response)
    })
    .catch(logError)
}
