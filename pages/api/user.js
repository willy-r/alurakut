import jwt from 'jsonwebtoken';

export async function verifyUserHasAccess(token) {
  // Usuário não tem autorização (não possui um token na requisição).
  if (!token) {
    return false;
  }

  const { githubUser } = jwt.decode(token);
  const userData = await getUserData(githubUser);

  return !userData || userData.message === 'Not Found' ? false : true;
}

export async function getUserData(githubUser) {
  const userData = await fetch(`https://api.github.com/users/${githubUser}`)
    .then(response => response.json())

  return userData;
}

export default async function userRequestsHandler(req, res) {
  res.redirect('/');
}
