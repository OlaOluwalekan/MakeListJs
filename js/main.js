import { Footer, Header, Toast } from './components.js'

export const baseUrl = 'https://ola-todo-app.cyclic.app/'

const user = JSON.parse(sessionStorage.getItem('currentUser'))

document.body.prepend(Header(user))
document.body.append(Footer())

export const displayToast = (message, type) => {
  const elem = document.body.appendChild(Toast(message, type))
  setTimeout(() => {
    elem.remove()
  }, 3000)
}
