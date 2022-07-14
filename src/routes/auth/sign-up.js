import * as cookie from 'cookie'
import api from '../../services/api'
import jwt_decode from 'jwt-decode'

export const post = async (event) => {
  const data = await event.request.formData()

  const password = data.get('password')
  const confirm_password = data.get('confirm_password')
  const email = data.get('email')
  const name = data.get('name')

  console.log(0)

  try {
    await api.post('/auth/users/', {
      password,
      confirm_password,
      email,
      name,
    })
  } catch (e) {
    console.log(e)
  }

  const {
    data: { access, refresh },
  } = await api.post('/auth/login/', {
    username: email,
    password,
  })

  console.log(2)

  const { user_id } = jwt_decode(access)

  const {
    data: { user },
  } = await api.get(`/auth/users/${String(user_id)}/`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  })

  console.log(3)

  const access_cookie = cookie.serialize('access', access, {
    path: '/',
    httpOnly: true,
  })

  const refresh_cookie = cookie.serialize('refresh', refresh, {
    path: '/',
    httpOnly: true,
  })

  const user_cookie = cookie.serialize('user', user, {
    path: '/',
    httpOnly: true,
  })

  return {
    headers: {
      location: '/dashboard',
      'set-cookie': [access_cookie, refresh_cookie, user_cookie],
    },
    status: 302,
  }
}

