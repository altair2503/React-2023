import React from "react";

const PostItem = ({post}) => {
    return <div className="post">
        <div className="post_content">
            {/*<strong>{post.number}. {post.post.title}</strong>*/}
            {/*<div>{post.post.description}</div>*/}
        </div>
        <div className="post_btn">
        </div>
    </div>
}

export default PostItem;