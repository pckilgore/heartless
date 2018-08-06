// Create a div
;(function() {
  /*
  *  Prevent this from being injected more than once.
  */
  if (window.heartlessRun) return
  window.heartlessRun = true

  const heartless = 'heartless-anny-o-tron'
  /*
  *  Basic setup.
  */
  const result = document.createElement('div')
  result.setAttribute('id', heartless)
  document.body.appendChild(result)
  const tron = document.getElementById(heartless)

  /*
  *   Listen for messages from the background script
  *   and adjust the annoy-o-tron div accordingly
  */
  browser.runtime.onMessage.addListener(message => {
    switch (message.action) {
      case 'HEARTLESS_SET_HEIGHT':
        tron.style.height = message.height || 0
        break
      case 'HEARTLESS_GET_HEIGHT':
        break
      default:
        break
    }
  })
})()
