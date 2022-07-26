export function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.accessToken) {
    return { 'Authorization': 'Bearer ' + user.accessToken };
  }
  return {};
}
