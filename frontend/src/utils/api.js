// simple wrapper around fetch that injects Authorization header
export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  const res = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
    ...options,
    headers,
  })
  return res
}
