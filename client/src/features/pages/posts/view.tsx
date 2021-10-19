import { Button } from '../../button';
import { IPostsProps } from './posts-interfaces';

export const PostsContent = ({handlePostPost}: IPostsProps) => {
  return (
    <div className="posts-container">
      <textarea
        className="posts-editable-html"
        placeholder="write HTML code"
        onChange={() => {}}
        id="posts-editable-html-input"
        value={''}
      />
      <Button handleClick={handlePostPost} label="⚡️ SAVE"/>
    </div>
  );
};
