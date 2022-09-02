export function rolesUser() {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.user?.roles ?? {};
}

export function getUser() {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.user ?? {};
}

export function roleActivated() {
  return localStorage.getItem('roleActivated') ?? '';
}

