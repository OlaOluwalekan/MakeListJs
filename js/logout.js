import { Footer, Header } from './components.js'
import { baseUrl } from './main.js'

// document.body.prepend(Header())
// document.body.append(Footer())

window.onload = async () => {
  try {
    const { data } = await axios(`${baseUrl}api/v1/auth/logout`, {
      withCredentials: true,
    })
    sessionStorage.removeItem('currentUser')
    sessionStorage.removeItem('page')
    sessionStorage.removeItem('todoData')
    console.log(data)
    location.href = '/'
  } catch (error) {
    console.log(error)
  }
}
