import { PostsContent } from './view'

const handlePostPost = () => {
  console.log('posting')
}

export const Posts = () => {
  return <PostsContent handlePostPost={handlePostPost}/>
}