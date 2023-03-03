const baseUrl = 'https://ola-todo-app.cyclic.app/'

export const Header = (user) => {
  const header = document.createElement('header')
  header.innerHTML = `<div>
  <h1 class="logo">Make<span>List</span></h1>
      <nav>
        <a href="http://localhost:5500/index.html">Home</a>
        <a href="http://localhost:5500/pages/login.html">Login</a>
        <a href="http://localhost:5500/pages/register.html">Register</a>
        ${
          document.title.includes('Dashboard')
            ? `<a href="http://localhost:5500/pages/logout.html">Logout</a>`
            : ''
        }
        ${
          document.title.includes('Home') && user
            ? `<a href="http://localhost:5500/pages/dashboard.html">Dashboard</a>`
            : ''
        }
      </nav>
  </div>`
  header.classList.add('header')

  return header
}

export const Footer = () => {
  const footer = document.createElement('footer')

  footer.innerHTML = `<p>
  &copy; Imagine Media 2023
  </p>
  `

  footer.classList.add('footer')

  return footer
}

export const Toast = (message, type) => {
  const section = document.createElement('section')
  section.innerHTML = `<p>${message}</p>
  <div class=${type}></div>
  `
  section.classList.add('section')
  return section
}
