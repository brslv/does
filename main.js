#!/usr/bin/env node

const App = require('./App')
const config = require('./config.json')
const app = new App({ config, inputSource: process.argv }) // TODO: Provide app config from a json

global.VERSION = '1.0.0'

app.run()
