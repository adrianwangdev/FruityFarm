const express = require('express')
const router = express.Router()

/* Models */
const { User } = require('../models/user')

/* Routes */
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

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.send(err)
    if (!user) {
      return res.json({
        auth: false,
        message: 'Auth failes, email not found',
        userData: false
      })
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) return res.send(err)
      if (!isMatch) {
        return res.json({
          auth: false,
          message: 'Wrong password',
          userData: false
        })
      }

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err)
        res.cookie('auth', user.token).json({
          auth: true
        })
      })
    })
  })
})

module.exports = router
