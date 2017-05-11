export const persistSession = (session) => {
  localStorage.setItem('session', JSON.stringify(session));
}

export const loadSession = () => {
  let storedSession = localStorage.getItem('session');
  return storedSession == null ? null : JSON.parse(storedSession);
}
