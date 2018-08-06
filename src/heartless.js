;(function() {
  /*
  *  Prevent this from being injected more than once.  Tab warming problems.
  */
  if (window.heartlessRun) return
  window.heartlessRun = true

  const heartless = 'heartless-annoy-o-tron'
  /*
  *  Basic setup.
  */
  const div = document.createElement('div')
  div.setAttribute('id', heartless)
  div.innerHTML = `<div id='heartless-taunt' class='hide'>Wow. <i>Much sitting.</i> So lazy.</div>`
  document.body.appendChild(div)

  /*
 *  Setup extension state.
 */
  let tron, taunt, vh

  window.addEventListener('load', () => {
    if (window.location.hostname !== 'accounts.google.com') {
      console.log('heartless...initial load')
      browser.runtime.sendMessage({action: 'HEARTLESS_BG_LOAD'})
      /*
    *  And every 5 minutes after that...
    */
      setInterval(() => {
        console.log('heartless....tick')
        browser.runtime.sendMessage({action: 'HEARTLESS_BG_LOAD'})
      }, 300000)
    }
  })

  /*
  *   Listen for messages from the background script
  *   and adjust the annoy-o-tron div accordingly
  */
  browser.runtime.onMessage.addListener(message => {
    tron = document.getElementById(heartless)

    switch (message.action) {
      case 'HEARTLESS_SET_HEIGHT':
        window.loggedIn = true

        console.log('heartless: setting height to ', message.height)

        vh = message.height + 'vh'
        tron = document.getElementById(heartless)
        taunt = document.getElementById('heartless-taunt')

        tron.style.height = message.height ? vh : tron.style.height

        if (message.height < 25) {
          taunt.classList.add('hide')
        } else taunt.classList.remove('hide')

        break
      case 'HEARTLESS_HIDE':
        tron.style.height = '0vh'
        break
      default:
        console.log('heartless: Content script got event but no action taken.')
        break
    }
  })
})()
