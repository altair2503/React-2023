import React, {useState} from "react";
import {Outlet} from "react-router-dom";
import PostList from "../post-list";

const HomePage = () => {

    const [posts, setPosts] = useState();

    return <div>
        <PostList posts={posts}/>
    </div>
}

export default HomePage;