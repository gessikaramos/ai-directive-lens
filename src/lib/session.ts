export function getLabSessionId(): string {
  if (typeof window === 'undefined') return 'server';
  const KEY = 'lab_session_id';
  let id = sessionStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(KEY, id);
  }
  return id;
}

export function resetLabSessionId(): string {
  if (typeof window === 'undefined') return 'server';
  const KEY = 'lab_session_id';
  const id = crypto.randomUUID();
  sessionStorage.setItem(KEY, id);
  return id;
}
