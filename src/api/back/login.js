import instance from '../fetch'

export const backLogin = function (form) {
  return instance.post('/admin/user/login', form)
}