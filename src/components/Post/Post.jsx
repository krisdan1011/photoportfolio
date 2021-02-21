/****************
* Post component displays one individual Post in a modal
****************/

import React, { useEffect } from "react";
import { reaction } from 'mobx';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { 
  getPostInfo,
  getNextPost,
  getPreviousPost,
  setPostRect 
} from '../../utils/PostHelper';
import PostTitlebar from '../PostTitlebar/PostTitlebar.jsx';
import PostImage from '../PostImage/PostImage.jsx';
import PostFooter from '../PostFooter/PostFooter.jsx';
import './Post.css';

const Post = observer(({ stateStore, api }) => {
  const { postId } = useParams();
  const parsedPostId = parseInt(postId);

  useEffect(() => {
    getPostInfo(postId, api);

  }, [postId]);

  useEffect(() => {
    const image = document.createElement('img');
    image.onload = () => {
      setPostRect(image, stateStore.screenInfo.width, stateStore.screenInfo.height, stateStore);
    }
    if (stateStore.visiblePost.fullImageUrl !== null && stateStore.visiblePost.fullImageUrl !== undefined) {
      image.src = stateStore.visiblePost.fullImageUrl;
    }

    const disposer = reaction(
      () => [stateStore.screenInfo.width, stateStore.screenInfo.height],
      () => setPostRect(image, stateStore.screenInfo.width, stateStore.screenInfo.height, stateStore)
    );

    return () => {
      disposer();
    }
  }, [stateStore.visiblePost.fullImageUrl]);
    
  return (
    <div className="post-background">
      <div className="post">
        <PostTitlebar postTitle={stateStore.visiblePost.title && stateStore.visiblePost.title.rendered}></PostTitlebar>
        <PostImage 
          stateStore={stateStore} 
          previousPost={getPreviousPost(parsedPostId, stateStore.currentCategoryPosts)} 
          nextPost={getNextPost(parsedPostId, stateStore.currentCategoryPosts)}
          api={api}>
        </PostImage>
        <PostFooter stateStore={stateStore}></PostFooter>
      </div>
    </div>
  );
});

Post.displayName = 'Post';

export default Post;