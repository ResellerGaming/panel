import { createUserAndServer } from '../../lib/pterodactyl';
import { saveUser } from '../../lib/store';
import { sendEmail } from '../../lib/email';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, username, server_name } = req.body;

  try {
    const { userId, serverId } = await createUserAndServer({ email, username, server_name });
    await saveUser({ email, username, server_name, userId, serverId });
    await sendEmail(email, username);

    res.status(200).send('✅ Akun dan server bot berhasil dibuat!');
  } catch (err) {
    console.error(err);
    res.status(500).send('❌ Gagal membuat akun atau server.');
  }
}
