import {useState, useEffect} from 'react'
import {API, Auth, Hub} from 'aws-amplify'
import '../styles/globals.css'
import '../configureAmplify'
import {createDentist} from "../graphql/mutations";

function MyApp({Component, pageProps}) {
  const [signedInUser, setSignedInUser] = useState(false)

  useEffect(() => {
    authListener()
  })

  async function authListener() {
    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signIn':
          return setSignedInUser(true)
        case 'signOut':
          return setSignedInUser(false)
      }
    })
    try {
      await Auth.currentAuthenticatedUser()
      // console.log(user.attributes.email)
      setSignedInUser(true)
    } catch (err) {
    }
  }
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp