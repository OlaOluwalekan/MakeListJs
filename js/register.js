import { Footer, Header } from './components.js'
import { baseUrl, displayToast } from './main.js'

const name = document.querySelector('.name')
const email = document.querySelector('.email')
const password = document.querySelector('.password')
const rePassword = document.querySelector('.re-password')
const form = document.querySelector('form')
const checkbox = document.querySelector('#check')

// document.body.prepend(Header())
// document.body.append(Footer())

checkbox.onchange = () => {
  if (checkbox.checked) {
    password.type = 'text'
    rePassword.type = 'text'
  } else {
    password.type = 'password'
    rePassword.type = 'password'
  }
}

form.onsubmit = async (e) => {
  e.preventDefault()
  let opt = {
    name: name.value,
    email: email.value,
    password: password.value,
  }

  if (!email.value) {
    displayToast('email is required', 'danger')
    return
  }
  if (!password.value) {
    displayToast('password is required', 'danger')
    return
  }
  if (!rePassword.value) {
    displayToast('retype your password to confirm', 'danger')
    return
  }
  if (password.value !== rePassword.value) {
    displayToast('password must match', 'danger')
    return
  }

  try {
    const { data } = await axios.post(`${baseUrl}api/v1/auth/register`, opt, {
      withCredentials: true,
    })
    console.log(data)
    displayToast(data.message, 'success')
    if (data.newUser) {
      sessionStorage.setItem('currentUser', JSON.stringify(data.newUser))
      setTimeout(() => {
        location.href = 'dashboard.html'
      }, 2000)
    }
  } catch (error) {
    console.log(error)
    displayToast(error.response.data.message, 'danger')
  }
}
