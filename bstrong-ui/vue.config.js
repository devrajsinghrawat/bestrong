// vue.config.js
module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: 'http://backend-bs-vps:9000/',
  }
}

