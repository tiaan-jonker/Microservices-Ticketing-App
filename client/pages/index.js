import buildClient from '../api/buildClient'

// Not using useRequest here because it is a React component
// getInitialProps is not a React component so it is not used here
// it is a plain function

const LandingPage = ({ currentUser }) => {
  console.log(currentUser)
  return <h1>Landing Page</h1>
}

LandingPage.getInitialProps = async (context) => {
  const { data } = await buildClient(context).get('/api/v1/users/currentuser')
  return data
}

export default LandingPage

// Deciding which page to render (with server side rendering process)
// Inspect URL of incoming req. Determine set of components to show
// Call those components with 'getInitialProps' static method
// Render each component with data from 'getInitialProps' one time
// Assemble HTML from all components, send back response

// When is getInitialProps called?
// Is the req form the browser?
// If yes then configure axios to use a baseURL of ""
// But if there is a SSR then reach out to ingress-nginx directly
// Req from component -> then always issued form browser
// Req from GIP -> executed from client or browser
