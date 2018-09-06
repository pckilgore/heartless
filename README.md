# Heartless

[![Build Status](https://travis-ci.com/pckilgore/heartless.svg?branch=master)](https://travis-ci.com/pckilgore/heartless)

#### A Bad day with heartless: Pretty annoying.

![Heartless, if you've been REALLY lazy](https://github.com/pckilgore/heartless/blob/master/dist/bad_day.png)

## Getting Started (Development)

(Requires firefox, tested on Ubuntu 18.04)

```bash
# install deps
npm install

# load extension for testing in firefox
# (see package.json.webExt for default config)
npm start
```

To load in chrome, go to: `chrome://extensions/` and enable developer mode (top right). The click `load unpacked` and point chrome to the `src/` folder. You'll have to manually reload after any changes to the code with this method. Blame Google for the inferior tooling.
