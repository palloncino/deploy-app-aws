import { Button } from '../../button';
import { IPostsProps } from './posts-interfaces';

export const PostsContent = ({
  handleInputChange,
  handlePostPost,
  htmlInputValue,
  postsData,
}: IPostsProps) => {
  return (
    <div className="posts-wrapper">
      <div className="posts-form-container">
        <textarea
          className="posts-editable-html"
          placeholder="write HTML code"
          onChange={(e) => handleInputChange(e.target.value)}
          id="posts-editable-html-input"
          value={htmlInputValue}
        />
        <Button handleClick={handlePostPost} label="⚡️ SAVE" />
      </div>
      <div className="posts-output-container">
        {postsData.map((post: any) => {
          return (
            <div className="post-container">
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
