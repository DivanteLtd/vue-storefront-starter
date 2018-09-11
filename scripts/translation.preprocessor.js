const path = require('path')
const config = require('../config/local.json')

const translationPreprocessor = require('@vue-storefront/i18n/scripts/translation.preprocessor.js')
translationPreprocessor([
  path.resolve(__dirname, '../node_modules/@vue-storefront/i18n/resource/i18n/'),
  path.resolve(__dirname, '../src/themes/' + config.theme + '/resource/i18n/')
], config)