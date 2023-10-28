import React from "react";
import PostItem from "./post-item/post-item";

const PostList = ({posts, title, remove}) => {
    return <div style={{marginTop: '30px'}}>
        {posts.map((post, index) =>
            <PostItem remove={remove} number={index + 1} post={post} key={post.id}></PostItem>
        )}
    </div>
}

export default PostList;