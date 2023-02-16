export function userEntityId() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.user?.entity && Object.hasOwn(user?.user?.entity, '$id')) {
    return user?.user?.entity['$id'];
  }
  return null;
}
