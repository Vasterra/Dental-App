import { useRouter } from 'next/router'
import {useEffect} from 'react'

const RedirectTo = () => {
  const router = useRouter()
  const { website } = router.query

  useEffect(() => {
    window.location.assign(`https://${website}`)
  })
  return <></>
}


export default RedirectTo