import React from "react";
import {Outlet} from "react-router-dom";

const PostItem = (props) => {
    return <div className="post" style={{display: 'flex', justifyContent: 'space-between', alignItems: "center", width: '100%', padding: '20px 30px', boxSizing: 'border-box', background: '#eeeeee', marginBottom: '10px', borderRadius: '15px'}}>
        <div className="post_content">
            <strong><a href={"posts/" + props.post.id}>{props.post.id}</a>. {props.post.title}</strong>
            <div>{props.post.description}</div>
        </div>
        <div className="post_btn">
            <button onClick={() => props.remove(props.post)}>Remove</button>
        </div>
        <Outlet/>
    </div>
}

export default PostItem;