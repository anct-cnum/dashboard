export function userEntityId() {
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.user.entity) {
    return user.user.entity['$id'];
  } else {
    return null;
  }
}
