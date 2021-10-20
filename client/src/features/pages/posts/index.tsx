import { useEffect, useState } from 'react';
import { PostsContent } from './view';
import { Singleton as Authorization } from '../../../auth';

export const Posts = () => {
  const auth = Authorization.getInstance();
  const [inputsValue, setInputsValue] = useState({
    title: '',
    description: '',
    image_url: '',
    html: '',
  });
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    handleGetPosts();
  }, []);

  const handlePostPost = async () => {
    const access_token = auth.getProp('token');
    const userEmail = auth.getProp('email');
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
      body: JSON.stringify({
        email: userEmail,
        title: inputsValue.title,
        description: inputsValue.description,
        image_url: inputsValue.image_url,
        html: inputsValue.html,
      }),
    };
    try {
      
      await fetch(URL, options);

      await handleGetPosts();

      return;

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

      setPostsData(posts);

    } catch (error) {

      console.error(error);

    }
  };

  const handleInputChange = (key: string, value: string) => {
    setInputsValue({ ...inputsValue, [key]: value });
  };

  return (
    <PostsContent
      handleInputChange={handleInputChange}
      handlePostPost={handlePostPost}
      inputsValue={inputsValue}
      postsData={postsData}
    />
  );
};
