import nodemailer from 'nodemailer';

export async function sendEmail(to, username) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: \`Bot Hosting <\${process.env.EMAIL_SENDER}>`,
    to,
    subject: 'Akun Panel Bot Kamu',
    html: \`
      <h2>Halo \${username}!</h2>
      <p>Akun kamu sudah dibuat di panel hosting bot.</p>
      <p>Login di: <a href="\${process.env.PTERO_URL}">\${process.env.PTERO_URL}</a></p>
      <p>Email kamu: \${to}</p>
      <p>Silakan klik lupa password jika belum punya password.</p>
    \`
  });
}
