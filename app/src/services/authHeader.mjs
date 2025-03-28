export default function authHeader() {
  var user = JSON.parse(localStorage.getItem('user'))

  if (user && user.accessToken) {
    return { 'x-access-token': user.accessToken }
  } else {
    return {}
  }
}
