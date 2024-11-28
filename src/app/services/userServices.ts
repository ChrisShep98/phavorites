export async function loginUser(username: string, password: string) {
  const response = await fetch(`https://phavorites-express.vercel.app/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const user = await response.json();
  return user;
}

export async function getUserByUsername(username: string) {
  const response = await fetch(`https://phavorites-express.vercel.app/user/${username}`);
  const user = await response.json();

  return user.data;
}

export async function getProfilePicture(id: string) {
  const response = await fetch(
    `https://phavorites-express.vercel.app/getProfilePicture/${id}`
  );
  const profilePicture = await response.json();
  return profilePicture.data;
}
