import React from "react";
import PostItem from "./post-item/post-item";

const PostList = ({posts}) => {
    return <div>
        <PostItem post={posts} />
    </div>
}

export default PostList;