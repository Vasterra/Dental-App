import Link from 'next/link'
import {Auth} from "aws-amplify";
import {useEffect, useState} from "react";

export default function MenuComponent() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    checkUser()
  }, [])
  async function checkUser() {
    const user = await Auth.currentAuthenticatedUser()
    console.log(user)
    setUser(user)
  }
  if (!user) return null
  return (
    <div className="drawerMenu">
      <Link href={"../../dentist/account/"}>Account</Link>
      <Link href={"../../dentist/profile/"}><a>Profile</a></Link>
      <Link href={"../../dentist/gallery/"}><a>Gallery</a></Link>
      <Link href={"../../dentist/subscriptions/"}><a>Settings</a></Link>
    </div>
  );
}