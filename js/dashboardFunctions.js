import { getAllTodos, toDeleteId } from './dashboardonload.js'
import { baseUrl, displayToast } from './main.js'

const deleteOverlay = document.querySelector('.delete-overlay')
const deleteForm = document.querySelector('.delete-overlay form')
const deleteFormText = document.querySelector('.delete-overlay form h4')
const addFab = document.querySelector('.add-fab')
const overlay = document.querySelector('.overlay')
const todoTitle = document.querySelector('.overlay > form > input')
const todoDesc = document.querySelector('.overlay > form > textarea')
const addTodoBtn = document.querySelector('.overlay > form > button')
const detailsContainer = document.querySelector('.details-overlay')

export const postCompleted = async (e, cb) => {
  let completed
  if (e.target.value == 'true') {
    completed = true
  } else {
    completed = false
  }
  const user = JSON.parse(sessionStorage.getItem('currentUser'))
  try {
    const { data } = await axios.put(
      `${baseUrl}api/v1/todos/${user._id}/${e.target.id}`,
      { completed: !completed },
      { withCredentials: true }
    )
    await cb(user._id)
    displayToast(data.message, 'success')
  } catch (error) {
    console.log(error)
    displayToast(error.response.data.message, 'danger')
  }
}

export const showDialog = (text) => {
  deleteOverlay.style.display = 'flex'
  deleteFormText.innerHTML = `Do you want to delete "<span>${text}</span>" ?`
}

deleteForm.onsubmit = async (e) => {
  e.preventDefault()
  const user = JSON.parse(sessionStorage.getItem('currentUser'))
  try {
    const { data } = await axios.delete(
      `${baseUrl}api/v1/todos/${user._id}/${toDeleteId}`,
      { withCredentials: true }
    )
    displayToast(data.message, 'danger')
    deleteOverlay.style.display = 'none'
    const { totalPage, itemsInTotal } = JSON.parse(
      sessionStorage.getItem('todoData')
    )
    if (itemsInTotal % 5 == 1) {
      sessionStorage.setItem('page', totalPage - 1)
    } else {
      sessionStorage.setItem('page', totalPage)
    }
    getAllTodos(user._id)
  } catch (error) {
    console.log(error)
    displayToast(error.response.data.message, 'danger')
  }
}

deleteForm.onreset = () => {
  deleteOverlay.style.display = 'none'
}

export const showAddTodo = async (type, titleValue, descValue) => {
  if (type === 'add') {
    todoTitle.value = ''
    todoDesc.value = ''
    addTodoBtn.textContent = 'Add'
  } else {
    todoTitle.value = titleValue
    todoDesc.value = descValue
    addTodoBtn.textContent = 'Update'
  }
  overlay.style.display = 'block'
  addFab.style.display = 'none'
}

export const closeAddForm = () => {
  overlay.style.display = 'none'
  addFab.style.display = 'flex'
}

export const addNewTodo = async () => {
  const user = JSON.parse(sessionStorage.getItem('currentUser'))
  const formOptions = {
    title: todoTitle.value,
    description: todoDesc.value,
  }
  if (addTodoBtn.textContent === 'Add') {
    try {
      const { data } = await axios.post(
        `${baseUrl}api/v1/todos/${user._id}`,
        formOptions,
        { withCredentials: true }
      )
      console.log(data)
      displayToast(data.message, 'success')
      overlay.style.display = 'none'
      addFab.style.display = 'flex'
      const { totalPage, itemsInTotal } = JSON.parse(
        sessionStorage.getItem('todoData')
      )
      if (itemsInTotal == 0) {
        sessionStorage.setItem('page', totalPage)
      } else {
        if (itemsInTotal % 5 == 0) {
          sessionStorage.setItem('page', totalPage + 1)
        } else {
          sessionStorage.setItem('page', totalPage)
        }
      }
      await getAllTodos(user._id)
    } catch (error) {
      console.log(error)
      displayToast(error.response.data.message, 'danger')
    }
  } else {
    try {
      const { data } = await axios.put(
        `${baseUrl}api/v1/todos/${user._id}/${toDeleteId}`,
        formOptions,
        { withCredentials: true }
      )
      console.log(data)
      displayToast(data.message, 'success')
      overlay.style.display = 'none'
      addFab.style.display = 'flex'
      await getAllTodos(user._id)
    } catch (error) {
      console.log(error)
      displayToast(error.response.data.message, 'danger')
    }
  }
}

export const showTodoDetails = (
  title,
  description,
  completed,
  dateCreated,
  dateUpdated
) => {
  detailsContainer.querySelector('section > h3').textContent = title
  detailsContainer.querySelector('section > .desc').textContent = description
  detailsContainer.querySelector('section > .completed').textContent = completed
    ? 'completed'
    : 'not completed'
  detailsContainer.querySelector(
    'section > article > .date-created'
  ).innerHTML = `Created At: <strong>${formatDate(dateCreated)}</strong>`
  detailsContainer.querySelector(
    'section > article > .date-updated'
  ).innerHTML = `Updated At: <strong>${formatDate(dateUpdated)}</strong>`
  detailsContainer.style.display = 'block'
}

detailsContainer.querySelector('section>span').onclick = () => {
  detailsContainer.style.display = 'none'
}

const formatDate = (res) => {
  const ans = new Date(res)
  let date = ans.getDate().toString()
  date = date.length === 1 ? `0${date}` : date
  let month = (ans.getMonth() + 1).toString()
  month = month.length === 1 ? `0${month}` : month
  let year = ans.getFullYear()
  let hr = ans.getHours()
  let period = 'am'
  period = hr > 12 ? 'pm' : 'am'
  hr = hr > 12 ? (hr - 12).toString() : hr.toString()
  hr = hr.length === 1 ? `0${hr}` : hr
  let min = ans.getMinutes()
  let secs = ans.getSeconds()

  const format = `${date}/${month}/${year} - <span>${hr}:${min}:${secs} ${period}</span>`

  return format
}
