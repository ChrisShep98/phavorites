export async function loginUser(usernameOrEmail: string, password: string) {
  const response = await fetch(`${process.env.PHAVORITES_EXPRESS}/login`, {
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
  const response = await fetch(`${process.env.PHAVORITES_EXPRESS}/user/${username}`);
  const user = await response.json();

  return user.data;
}

export async function getProfilePicture(id: string) {
  const response = await fetch(
    `${process.env.PHAVORITES_EXPRESS}/getProfilePicture/${id}`
  );
  const profilePicture = await response.json();
  return profilePicture.data;
}
