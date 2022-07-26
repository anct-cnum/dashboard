export function rolesUser() {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.user?.roles ?? {};
}

export function roleActivated() {
  return localStorage.getItem('roleActivated') ?? '';
}

