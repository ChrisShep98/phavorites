export async function loginUser(usernameOrEmail: string, password: string) {
  const response = await fetch(`https://phavorites-express.vercel.app/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ usernameOrEmail, password }),
  });
  const user = await response.json();
  return user;
}

export async function getUserByUsername(username: string) {
  const response = await fetch(`http://localhost:8000/user/${username}`);
  const user = await response.json();

  return user.data;
}

export async function getProfilePicture(id: string) {
  const response = await fetch(`http://localhost:8000/getProfilePicture/${id}`);
  const profilePicture = await response.json();
  return profilePicture.data;
}
