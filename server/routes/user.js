const express = require('express')
const router = express.Router()

const { User } = require('../models/user')

router.post('/register', (req, res) => {
  const user = new User(req.body)

  user.save((err, doc) => {
    if (err) return res.json({ success: false })
    res.status(200).json({
      success: true,
      user: doc
    })
  })
})

module.exports = router
