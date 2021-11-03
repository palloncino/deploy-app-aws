import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '../../button';
import { IPostsProps } from './posts-interfaces';
import { selectPosts } from './postsSLice';
import { selectFocusedItem } from '../../routes';
import { Singleton as Authorization } from '../../../auth';
import { Spinner } from '../../spinner';
import Typewriter from 'typewriter-effect';

export const PostsContent = ({
  handleInputChange,
  handlePostPost,
  inputsValue,
}: IPostsProps) => {
  const data = useSelector(selectPosts);
  const focusedElement = useSelector(selectFocusedItem);
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    setPostsData(data);

    const postId = document.querySelector(`.selector-${focusedElement}`);
    if (postId) {
      setTimeout(() => {
        const postElement = document.querySelector(
          `.selector-${focusedElement} .posts-output-wrapper`
        );
        postId?.scrollIntoView({ behavior: 'smooth' });
        postElement?.classList.toggle('is-open');
      }, 0);
    }
  }, [data]);

  const auth = Authorization.getInstance();

  const clientId = auth.getProp('email');

  const isAdmin = () =>
    clientId === process.env.REACT_APP_ADMIN_EMAIL ? true : false;

  const handleTogglePost = (id: string) => {
    const post = document.querySelector(
      `.selector-${id} .posts-output-wrapper`
    );

    post?.classList.toggle('is-open');
  };

  const renderPostsData = () => {
    return (
      <div>
        {postsData.map((post: any, index: number) => {
          return (
            <div
              id={post.id}
              key={index}
              className={`post-container selector-${post.id}`}
            >
              <div className="post-container-data-cell-container-info">
                <div className="post-container-data-cell-container post-container-data-cell-container--title">
                  <div className="post-container-data-cell-value post-container-data-cell-value--title">
                    {post.title}
                  </div>
                </div>
                <div className="post-container-data-cell-container post-container-data-cell-container--description">
                  <div className="post-container-data-cell-value post-container-data-cell-value--description">
                    {post.description}
                  </div>
                </div>

                <div className="post-container-data-cell-container post-container-data-cell-container--date">
                  <div className="post-container-data-cell-value post-container-data-cell-value--date">
                    {post.date}
                  </div>
                </div>

                <div className="post-container-data-cell-container post-container-data-cell-container--see-more">
                  <div className="post-container-data-cell-value post-container-data-cell-value--see-more">
                    <Button
                      customStyle={{
                        width: '150px',
                      }}
                      handleClick={() => handleTogglePost(post.id)}
                      label={'👁 Toggle Post'}
                    />
                  </div>
                </div>
              </div>
              <div className="posts-output-wrapper">
                <div
                  className="posts-output-container"
                  dangerouslySetInnerHTML={{ __html: post.html }}
                ></div>
              </div>

              {/* {isAdmin() && (
                <div className="post-container-buttons-group">
                  <Button
                    customStyle={{
                      width: '150px',
                    }}
                    handleClick={() => {}}
                    label="❌ DELETE POST"
                  />
                  <Button
                    customStyle={{
                      width: '150px',
                    }}
                    disabled
                    handleClick={() => {}}
                    label="✏️ EDIT POST"
                  />
                </div>
              )} */}
            </div>
          );
        })}
      </div>
    );
  };

  const renderSpinner = () => {
    return (
      <div className="spinner-container" style={{ minHeight: '200px' }}>
        <Spinner />
      </div>
    );
  };

  return (
    <>
      <div className="posts-page-description-container">
        <Typewriter
          options={{
            delay: 20,
            wrapperClassName: 'homepage-typewriter-wrapper',
          }}
          onInit={(typewriter) => {
            typewriter
              .typeString(
                `These are a list of articles that I write every once in a while ... `
              )
              .pauseFor(3000)
              .typeString(
                `They are about various topics, programming, life experience and more.`
              )
              .pauseFor(3000)
              .start();
          }}
        />
      </div>
      <div className="posts-wrapper">
        {isAdmin() && (
          <div className="posts-form-container">
            <div className="posts-form-input-container">
              <label
                className="posts-form-input-container-input-label"
                htmlFor="title"
              >
                Title
              </label>
              <input
                value={inputsValue?.title}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                name="title"
                type="text"
                className="posts-form-input-container-input"
              />
            </div>

            <div className="posts-form-input-container">
              <label
                className="posts-form-input-container-input-label"
                htmlFor="description"
              >
                Description
              </label>
              <input
                value={inputsValue?.description}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                name="description"
                type="text"
                className="posts-form-input-container-input"
              />
            </div>

            <div className="posts-form-input-container">
              <label
                className="posts-form-input-container-input-label"
                htmlFor="html"
              >
                HTML
              </label>
              <textarea
                name="html"
                className="posts-editable-html posts-form-input-container-input posts-form-input-container-input--textarea"
                placeholder="Content of your post in HTML code"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                id="posts-editable-html-input"
                value={inputsValue?.html}
              />
            </div>

            <Button handleClick={handlePostPost} label="⚡️ SAVE" />
          </div>
        )}
        <div className="posts-output-container">
          {postsData.length > 0 ? renderPostsData() : renderSpinner()}
        </div>
      </div>
    </>
  );
};
