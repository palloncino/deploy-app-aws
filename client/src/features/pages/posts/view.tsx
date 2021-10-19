import { Button } from '../../button';
import { IPostsProps } from './posts-interfaces';

export const PostsContent = ({handleInputChange, handlePostPost, htmlInputValue}: IPostsProps) => {
  return (
    <div className="posts-container">
      <textarea
        className="posts-editable-html"
        placeholder="write HTML code"
        onChange={e => handleInputChange(e.target.value)}
        id="posts-editable-html-input"
        value={htmlInputValue}
      />
      <Button handleClick={handlePostPost} label="⚡️ SAVE"/>
    </div>
  );
};
