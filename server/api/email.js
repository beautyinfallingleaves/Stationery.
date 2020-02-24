const router = require('express').Router()
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
module.exports = router

router.post('/', async (req, res, next) => {
  const { recipient, frontImageFirebaseUrl, backImageFirebaseUrl } = req.body

  try {
    if (
      !recipient
      || !frontImageFirebaseUrl
      || !backImageFirebaseUrl
    ) throw new Error(
      'Sending email requires a recipient email address, as well as front and back image.'
    )

    const msg = {
      to: recipient,
      from: 'no-reply@stationery.com',
      subject: 'You\'ve received Stationery!',
      text: 'Must have HTML enabled to view the postcard :(',
      html: `<html><body><img src="${frontImageFirebaseUrl}" /><div/><img src="${backImageFirebaseUrl}" /></body></html>`,
    }
    await sgMail.send(msg)
    res.sendStatus(202)
  } catch (err) {
    res.sendStatus(500)
  }
})
