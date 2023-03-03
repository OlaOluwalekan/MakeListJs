import { Footer, Header } from './components.js'
import {
  addNewTodo,
  closeAddForm,
  postCompleted,
  showAddTodo,
  showTodoDetails,
} from './dashboardFunctions.js'
import { getAllTodos, getUser } from './dashboardonload.js'
const dashboard = document.querySelector('.dashboard h1')
const todoListContainer = document.querySelector('.todo-list-container')
const addFab = document.querySelector('.add-fab')
const addForm = document.querySelector('.overlay > form')
const closeForm = document.querySelector('.overlay > form > span')

// document.body.prepend(Header())
// document.body.append(Footer())

window.onload = async () => {
  const user = JSON.parse(sessionStorage.getItem('currentUser'))
  if (!user) {
    location.href = 'login.html'
  } else {
    await getUser(user._id, dashboard)
    await getAllTodos(user._id)
  }
}

todoListContainer.onclick = async (e) => {
  if (e.target.dataset.identifier === 'check') {
    postCompleted(e, getAllTodos)
  }
}

addFab.onclick = () => {
  showAddTodo('add')
}

closeForm.onclick = () => {
  closeAddForm()
}

addForm.onsubmit = async (e) => {
  e.preventDefault()
  addNewTodo()
}
