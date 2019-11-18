const router = require('express').Router()
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const msg = {
      to: 'beautyinfallingleaves@gmail.com',
      from: 'no-reply@stationery.com',
      subject: `You've received Stationery!`,
      text:
        'Here is where the message body will one day go!'
    }
    await sgMail.send(msg)
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
  }
})
