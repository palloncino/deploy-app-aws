import { useEffect, useState } from 'react';
import { PostsContent } from './view';
import { Singleton as Authorization } from '../../../auth';
import { useDispatch } from 'react-redux';
import { getPosts } from './postsSLice';

export const Posts = () => {
  const auth = Authorization.getInstance();
  const dispatch = useDispatch();
  const [inputsValue, setInputsValue] = useState({
    title: '',
    description: '',
    // image_url: '',
    html: '',
  });

  useEffect(() => {
    dispatch(getPosts());
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
        // image_url: inputsValue.image_url,
        html: inputsValue.html,
      }),
    };
    try {
      await fetch(URL, options);

      dispatch(getPosts());

      return;
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
    />
  );
};
