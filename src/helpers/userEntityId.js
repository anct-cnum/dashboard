export function userEntityId() {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.user?.entity['$id'] ?? null;
}
