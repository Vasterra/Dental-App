import {useState, useEffect} from 'react'
import {Auth, Hub} from 'aws-amplify'
import Header from "../components/Header";
import Drawer from "../components/Drawer";
import {Grid} from "@material-ui/core";
import styled from "styled-components";

const CardWrapper = styled("div")`
  max-width: 100%;
`;

export default function Home() {
  // const [posts, setPosts] = useState([])
  // useEffect(() => {
  //   fetchPosts()
  // }, [])
  // async function fetchPosts() {
  //   const postData = await API.graphql({
  //     query: listPosts
  //   })
  //   const { items } = postData.data.listPosts
  //
  //   // Fetch images from S3 for posts that contain a cover image
  //   const postsWithImages = await Promise.all(items.map(async post => {
  //     if (post.coverImage) {
  //       post.coverImage = await Storage.get(post.coverImage)
  //     }
  //
  //     return post
  //   }))
  //   setPosts(postsWithImages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)))
  // }


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
      setSignedInUser(true)
    } catch (err) {
    }
  }

  return (
    <>
      <Header/>
      <Grid container justify="space-between">
        <Grid item xs={12} sm={2} lg={2} spacing={10}>
          {
            signedInUser && <Drawer />
          }
        </Grid>
        <Grid item xs={12} sm={10} lg={10}>
          {/*<Search />*/}
          Hello World
        </Grid>
      </Grid>
    </>
    // </>
    // <>
    //   <Search />
    //   <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-8">Posts</h1>
    //   {
    //     posts.map((post, index) => (
    //     <Link key={index} href={`/posts/${post.id}`}>
    //       <div className="my-6 pb-6 border-b border-gray-300	">
    //         {
    //           post.coverImage && <img src={post.coverImage} className="w-56" />
    //         }
    //         <div className="cursor-pointer mt-2">
    //           <h2 className="text-xl font-semibold">{post.title}</h2>
    //           <p className="text-gray-500 mt-2">Author: {post.username}</p>
    //         </div>
    //       </div>
    //     </Link>)
    //     )
    //   }
    // </>
  )
}