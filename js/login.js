import { Footer, Header } from './components.js'
import { baseUrl, displayToast } from './main.js'

const email = document.querySelector('.email')
const password = document.querySelector('.password')
const checkbox = document.querySelector('#check')

const form = document.querySelector('form')

// document.body.prepend(Header())
// document.body.append(Footer())

checkbox.onchange = () => {
  if (checkbox.checked) {
    password.type = 'text'
  } else {
    password.type = 'password'
  }
}

form.onsubmit = async (e) => {
  e.preventDefault()
  let opt = {
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

  try {
    const { data } = await axios.post(`${baseUrl}api/v1/auth/login`, opt, {
      withCredentials: true,
    })

    if (data.user) {
      sessionStorage.setItem('currentUser', JSON.stringify(data.user))
      displayToast(data.message, 'success')
      setTimeout(() => {
        location.href = 'dashboard.html'
      }, 2000)
    }

    console.log(data)
  } catch (error) {
    console.log(error)
    displayToast(error.response.data.message, 'danger')
  }
}
