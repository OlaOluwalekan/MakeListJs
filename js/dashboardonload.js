import {
  showAddTodo,
  showDialog,
  showTodoDetails,
} from './dashboardFunctions.js'
import { baseUrl } from './main.js'

const todoListContainer = document.querySelector('.todo-list-container')
const pagesContainer = document.querySelector('.pages-container')
const nextBtn = document.querySelector('.next-btn')
const prevBtn = document.querySelector('.prev-btn')
export let toDeleteId = ''

export const getUser = async (id, dashboard) => {
  try {
    const { data } = await axios(`${baseUrl}api/v1/users/dashboard/${id}`, {
      withCredentials: true,
    })
    console.log(data)

    dashboard.innerHTML = `Dashboard > <span>${data.name.toUpperCase()}</span>`
    document.title = `Dashboard | ${data.name.toUpperCase()}`
  } catch (error) {
    console.log(error)
    location.href = 'login.html'
  }
}

export const getAllTodos = async (id) => {
  let page = sessionStorage.getItem('page') || 1
  // if (page === null) {
  //   page = 1
  //   sessionStorage.setItem('page', 1)
  // }

  try {
    const { data } = await axios(
      `${baseUrl}api/v1/todos/${id}/query?page=${page}`,
      {
        withCredentials: true,
      }
    )
    console.log(data)
    sessionStorage.setItem('todoData', JSON.stringify(data))

    if (page == 1) {
      prevBtn.disabled = true
    } else {
      prevBtn.disabled = false
    }

    if (page == data.totalPage) {
      nextBtn.disabled = true
    } else {
      nextBtn.disabled = false
    }

    pagesContainer.innerHTML = ''
    for (let i = 1; i <= data.totalPage; i++) {
      pagesContainer.innerHTML += `<span data-identifier='page' class=${
        page == i ? 'current' : 'none'
      }>${i}</span>`
    }

    todoListContainer.innerHTML = ''
    if (data.todos.length === 0) {
      todoListContainer.innerHTML = `<h2>No todo list. Click the fab icon below to add</h2>`
      return
    }
    data.todos.forEach((todo) => {
      createTodoItems(
        todo.title,
        todo.completed,
        todo._id,
        todo.description,
        todo.createdAt,
        todo.updatedAt
      )
    })
  } catch (error) {
    console.log(error)
  }
}

export const createTodoItems = (
  title,
  completed,
  _id,
  description,
  createdAt,
  UpdatedAt
) => {
  const artticle = document.createElement('article')
  artticle.dataset.identifier = 'main'
  artticle.id = _id
  const h3 = document.createElement('h3')
  h3.dataset.identifier = 'title'
  h3.innerHTML = `${completed ? '<span></span>' : ''} ${title}`
  const check = document.createElement('input')
  check.dataset.identifier = 'check'
  check.type = 'checkbox'
  check.value = completed
  if (completed) {
    check.checked = true
  } else {
    check.checked = false
  }
  check.id = _id
  const checkLabel = document.createElement('label')
  checkLabel.dataset.identifier = 'check'
  checkLabel.setAttribute('for', check.id)
  checkLabel.innerHTML = 'completed'
  checkLabel.id = _id

  const deleteSpan = document.createElement('span')
  deleteSpan.innerHTML = `<i class="fas fa-trash" data-identifier="delete"></i>`
  deleteSpan.classList.add('delete')
  const editSpan = document.createElement('span')
  editSpan.innerHTML = `<i class="fas fa-pen-to-square"></i>`
  editSpan.classList.add('edit')

  deleteSpan.onclick = () => {
    showDialog(title)
    toDeleteId = _id
  }

  editSpan.onclick = () => {
    showAddTodo('edit', title, description)
    toDeleteId = _id
  }

  artticle.onclick = (e) => {
    if (
      e.target.dataset.identifier === 'main' ||
      e.target.dataset.identifier === 'title'
    ) {
      showTodoDetails(title, description, completed, createdAt, UpdatedAt)
    }
  }

  artticle.appendChild(h3)
  artticle.appendChild(check)
  artticle.appendChild(checkLabel)
  artticle.appendChild(deleteSpan)
  artticle.appendChild(editSpan)

  todoListContainer.appendChild(artticle)
}

nextBtn.onclick = () => {
  const user = JSON.parse(sessionStorage.getItem('currentUser'))
  let page = sessionStorage.getItem('page') || 1
  page++
  sessionStorage.setItem('page', page)
  getAllTodos(user._id)
}

prevBtn.onclick = () => {
  const user = JSON.parse(sessionStorage.getItem('currentUser'))
  let page = sessionStorage.getItem('page') || 1
  page--
  sessionStorage.setItem('page', page)
  getAllTodos(user._id)
}

pagesContainer.onclick = (e) => {
  if (e.target.dataset.identifier == 'page') {
    console.log(e.target.textContent)
    const user = JSON.parse(sessionStorage.getItem('currentUser'))
    let page = e.target.textContent
    sessionStorage.setItem('page', page)
    getAllTodos(user._id)
  }
}
