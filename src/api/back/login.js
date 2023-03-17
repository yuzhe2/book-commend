import instance from '../fetch'

export const backLogin = function (form) {
  return instance.post({
    url: '/admin/user/login',
    data: form
  })
}