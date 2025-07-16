export async function createUserAndServer({ email, username, server_name }) {
  const PTERO_API = process.env.PTERO_URL + '/api/application';
  const API_KEY = process.env.PTERO_KEY;

  const headers = {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
  };

  const userRes = await fetch(PTERO_API + '/users', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      username,
      email,
      first_name: username,
      last_name: 'User'
    })
  });

  const userData = await userRes.json();
  const userId = userData.attributes.id;

  const serverRes = await fetch(PTERO_API + '/servers', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name: server_name,
      user: userId,
      egg: 1,
      docker_image: "ghcr.io/pterodactyl/yolks:nodejs_18",
      startup: "npm run start",
      environment: { USER_UPLOAD: "1" },
      limits: { memory: 512, swap: 0, disk: 500, io: 500, cpu: 50 },
      feature_limits: { databases: 0, allocations: 1, backups: 0 },
      allocation: { default: 1 },
      deploy: { locations: [1], dedicated_ip: false, port_range: ["3000-3010"] }
    })
  });

  const serverData = await serverRes.json();
  return { userId, serverId: serverData.attributes.id };
}
