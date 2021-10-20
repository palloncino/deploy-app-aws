import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '../../button';
import { IPostsProps } from './posts-interfaces';
import { selectPosts } from './postsSLice';
import { selectFocusedItem } from '../../routes';
import { Singleton as Authorization } from '../../../auth';

export const PostsContent = ({
  handleInputChange,
  handlePostPost,
  inputsValue,
}: IPostsProps) => {
  const data = useSelector(selectPosts);
  const focusedElement = useSelector(selectFocusedItem);

  useEffect(() => {
    focusedElement && document.getElementById(focusedElement)?.scrollIntoView();
  }, []);

  const auth = Authorization.getInstance();

  const clientId = auth.getProp('email');

  const isAdmin = () =>
    clientId === process.env.REACT_APP_ADMIN_EMAIL ? true : false;

  return (
    <div className="posts-wrapper">
      {isAdmin() && (
        <div className="posts-form-container">
          <div className="posts-form-input-container">
            <label htmlFor="title">Title</label>
            <input
              value={inputsValue?.title}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              name="title"
              type="text"
            />
          </div>

          <div className="posts-form-input-container">
            <label htmlFor="description">Description</label>
            <input
              value={inputsValue?.description}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              name="description"
              type="text"
            />
          </div>

          {/* <div className="posts-form-input-container">
          <label htmlFor="image_url">Image URL</label>
          <input
            value={inputsValue?.image_url}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            name="image_url"
            type="text"
            placeholder="https:// MUST BE VALID ⚠️"
          />
        </div> */}

          <div className="posts-form-input-container">
            <label htmlFor="html">HTML</label>
            <textarea
              name="html"
              className="posts-editable-html"
              placeholder="Content of your post in HTML code"
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              id="posts-editable-html-input"
              value={inputsValue?.html}
            />
          </div>

          <Button handleClick={handlePostPost} label="⚡️ SAVE" />
        </div>
      )}
      <div className="posts-output-container">
        {data.length > 0 &&
          data.map((post: any, index: number) => {
            return (
              <div id={post.id} key={index} className="post-container">
                <div className="post-container-data-cell-container-info">
                  <div className="post-container-data-cell-container">
                    {/* <div className="post-container-data-cell-label">TITLE:</div> */}
                    <div className="post-container-data-cell-value post-container-data-cell-value--title">
                      {post.title}
                    </div>
                  </div>
                  <div className="post-container-data-cell-container">
                    {/* <div className="post-container-data-cell-label">
                    DESCRIPTION:
                  </div> */}
                    <div className="post-container-data-cell-value post-container-data-cell-value--description">
                      {post.description}
                    </div>
                  </div>
                  {/* <div className="post-container-data-cell-container">
                  <div className="post-container-data-cell-value post-container-data-cell-value--img">
                    <img src={post.image_url} alt="post image" />
                  </div>
                </div> */}
                </div>

                <div dangerouslySetInnerHTML={{ __html: post.html }}></div>

                <div className="post-container-buttons-group">
                  <Button
                    customStyle={{
                      width: '150px',
                      border: 'none',
                      background: 'transparent',
                    }}
                    handleClick={() => {}}
                    label="❌ DELETE POST"
                  />
                  <Button
                    customStyle={{
                      width: '150px',
                      border: 'none',
                      background: 'transparent',
                    }}
                    disabled
                    handleClick={() => {}}
                    label="✏️ EDIT POST"
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
