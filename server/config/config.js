const config = {
  production: {
    SECRET: process.env.SECRET,
    DATABASE: process.env.DATABASE
  },
  default: {
    SECRET: 'A1X9WjIOT5oMKUxC',
    DATABASE: 'mongodb://localhost:27017/FruityFarm'
  }
}

exports.get = function get (env) {
  return config[env] || config.default
}
