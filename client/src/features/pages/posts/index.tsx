import { useEffect, useState } from 'react';
import { PostsContent } from './view';
import { Singleton as Authorization } from '../../../auth';

export const Posts = () => {
  const auth = Authorization.getInstance();
  const [htmlInputValue, setHtmlInputValue] = useState('<h1>hello</h1>')
  const [postsData, setPostsData] = useState([])

  useEffect(() => {
    handleGetPosts();
  }, []);

  const handlePostPost = async () => {
    const access_token = auth.getProp('token');
    const email = auth.getProp('email');
    let defaultHeaders = {
      'Content-Type': 'application/json',
    };
    let URL = `${process.env.REACT_APP_SERVER_DOMAIN}/api/posts/post-post`;
    let options = {
      method: 'POST',
      headers: {
        ...defaultHeaders,
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({email, html: htmlInputValue})
    };
    try {
      const response = await fetch(URL, options);

      const json = await response.json();

      return handleGetPosts()

    } catch (error) {
      console.error(error);
    }
  };

  const handleGetPosts = async () => {
    const access_token = auth.getProp('token');
    let defaultHeaders = {
      'Content-Type': 'application/json',
    };
    let URL = `${process.env.REACT_APP_SERVER_DOMAIN}/api/posts/get-posts`;
    let options = {
      method: 'GET',
      headers: {
        ...defaultHeaders,
        Authorization: `Bearer ${access_token}`,
      },
    };
    try {
      const response = await fetch(URL, options);

      const posts = await response.json();

      const ids = Object.keys(posts);

      const postsArray: any = [];

      ids.forEach((id) => {
        postsArray.push({ id: id, html: posts[id] });
      });

      setPostsData(postsArray)

    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (html: string) => {
    console.log({ html });
    setHtmlInputValue(html)
  };

  return (
    <PostsContent
      handleInputChange={handleInputChange}
      handlePostPost={handlePostPost}
      htmlInputValue={htmlInputValue}
      postsData={postsData}
    />
  );
};
