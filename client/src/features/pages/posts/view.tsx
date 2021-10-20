import { useSelector } from 'react-redux';
import { Button } from '../../button';
import { IPostsProps } from './posts-interfaces';
import { selectPosts } from './postsSLice';

export const PostsContent = ({
  handleInputChange,
  handlePostPost,
  inputsValue,
}: IPostsProps) => {

  const data = useSelector(selectPosts);

  console.log({data})
  
  return (
    <div className="posts-wrapper">
      <div className="posts-form-container">
        
        <div className="posts-form-input-container">
          <label htmlFor="title">Title</label>
          <input value={inputsValue?.title} onChange={(e) => handleInputChange(e.target.name, e.target.value)} name="title" type="text" />
        </div>

        <div className="posts-form-input-container">
          <label htmlFor="description">Description</label>
          <input value={inputsValue?.description} onChange={(e) => handleInputChange(e.target.name, e.target.value)} name="description" type="text" />
        </div>

        <div className="posts-form-input-container">
          <label htmlFor="image_url">Image URL</label>
          <input value={inputsValue?.image_url} onChange={(e) => handleInputChange(e.target.name, e.target.value)} name="image_url" type="text" placeholder="https:// MUST BE VALID ⚠️" />
        </div>

        <div className="posts-form-input-container">
          <label htmlFor="html">HTML</label>
          <textarea
            name="html"
            className="posts-editable-html"
            placeholder="write HTML code"
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            id="posts-editable-html-input"
            value={inputsValue?.html}
          />
        </div>

        <Button handleClick={handlePostPost} label="⚡️ SAVE" />
      </div>
      <div className="posts-output-container">
        {data.length > 0 && data.map((post: any, index: number) => {
          return (
            <div key={index} className="post-container">
              <div>ID: {post.id}</div>
              <div>TITLE: {post.title}</div>
              <div>DESCRIPTION: {post.description}</div>
              <div>
                <img src={post.image_url} alt="post image" />
              </div>
              <hr />
              <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
              <Button handleClick={() => {}} label="❌ DELETE POST" />
              <Button disabled handleClick={() => {}} label="❌ EDIT POST" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
