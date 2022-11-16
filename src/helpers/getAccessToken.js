export function getAccessToken() {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.accessToken ?? {};
}
