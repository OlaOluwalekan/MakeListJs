// const feBase = 'http://localhost:5500/'
const feBase = 'https://app-makelist.netlify.app/'

export const Header = (user) => {
  const header = document.createElement('header')
  header.innerHTML = `<div>
  <h1 class="logo">Make<span>List</span></h1>
      <nav>
        <a href="${feBase}index.html">Home</a>
        <a href="${feBase}pages/login.html">Login</a>
        <a href="${feBase}pages/register.html">Register</a>
        ${
          document.title.includes('Dashboard')
            ? `<a href="${feBase}pages/logout.html">Logout</a>`
            : ''
        }
        ${
          document.title.includes('Home') && user
            ? `<a href="${feBase}pages/dashboard.html">Dashboard</a>`
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
