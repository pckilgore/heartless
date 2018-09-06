;(function() {
  /*
  *  Prevent this from being injected more than once.  Tab warming problems.
  */
  if (window.heartlessRun) return
  window.heartlessRun = true

  /**
   *  Cross Browser compatability...namespace webextension API to browser.XXXX
   */
  window.browser = (() => window.msBrowser || window.browser || window.chrome)()

  const heartless = 'heartless-annoy-o-tron'
  /*
  *  Basic setup.  We're hoping anyone with react et al does the right thing and
  *  uses an internal div rather than the body.  If that's true, we can
  *  avoid fudging with someone elses DOM diffs.
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
    // Don't inject if we are loading the google OAuth page.
    // That's just evil.
    if (window.location.hostname !== 'accounts.google.com') {
      browser.runtime.sendMessage({action: 'HEARTLESS_BG_LOAD'})
      /*
       *  And every 5 minutes after that...
       */
      setInterval(() => {
        browser.runtime.sendMessage({action: 'HEARTLESS_BG_LOAD'})
      }, 60000)
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
        vh = message.height + 'vh'

        // get EXTRA annoying when we're missing the goal by a lot.
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
        console.error(
          'heartless warning: Content script received unknown event.'
        )
        break
    }
  })
})()
