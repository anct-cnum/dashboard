export function getUser() {
  const user = JSON.parse(localStorage.getItem('user'));
  return user;
}
