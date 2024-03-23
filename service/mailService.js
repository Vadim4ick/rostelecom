import nodemailer from 'nodemailer'

export async function sendMail(subject, toEmail, otpText) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODE_MAILER_EMAIL,
      pass: process.env.NODE_MAILER_PW,
    },
  })

  const mailOptions = {
    from: process.env.NODE_MAILER_EMAIL,
    to: toEmail,
    subject: subject,
    text: otpText,
  }

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, res) {
      if (error) {
        reject(error)
      } else {
        resolve(res)
      }
    })
  })
}
