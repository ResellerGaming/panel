let users = [];

export async function saveUser(user) {
  users.push(user);
  console.log('User saved:', user);
}
