// Create a div
;(function() {
  /*
  *  Prevent this from being injected more than once.
  */
  if (window.heartlessRun) return
  window.heartlessRun = true

  const heartless = 'heartless-annoy-o-tron'
  /*
  *  Basic setup.
  */
  const div = document.createElement('div')
  div.setAttribute('id', heartless)
  div.innerHTML = `<span class='message'>Wow. <i>Much sitting.</i> So lazy.</span>`
  document.body.appendChild(div)

  /*
  *  Setup extension state.
  */
  let tron,
    state = {height: '10vh'} // TODO: init to zero

  /*
  *   Listen for messages from the background script
  *   and adjust the annoy-o-tron div accordingly
  */
  browser.runtime.onMessage.addListener(message => {
    tron = document.getElementById(heartless)

    console.log('got message:', message)

    switch (message.action) {
      case 'HEARTLESS_SET_HEIGHT':
        tron = document.getElementById(heartless)
        tron.style.height = message.height || tron.style.height
        state.height = message.height || tron.style.height
        return Promise.resolve({success: true, height: state.height, message})
      case 'HEARTLESS_RESET':
        tron.style.height = state.height
        return Promise.resolve({success: true, message})
      case 'HEARTLESS_HIDE':
        tron.style.height = '0vh'
        return Promise.resolve({success: true, height: state.height, message})
      default:
        return Promise.resolve({success: false, message})
    }
  })
})()
