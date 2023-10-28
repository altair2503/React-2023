import React, {useState} from "react";
import {Outlet} from "react-router-dom";
import PostList from "../post-list";
import PostForm from "../PostForm";

const HomePage = () => {

    const [posts, setPosts] = useState([
        {id: 1, title: 'JavaScript', description: 'JavaScript is the programming language'},
        {id: 2, title: 'Python', description: 'Python is the programming language'},
        {id: 3, title: 'Kotlin', description: 'Kotlin is the programming language'},
        {id: 4, title: 'Java', description: 'Java is the programming language'},
        {id: 5, title: 'C++', description: 'C++ is the programming language'}
    ])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const [searchQuery, setSearchQuery] = useState('')
    const searchInPosts = (query) => {
        setPosts(posts.filter(p => p.title === query))
    }

    return (
        <div className="App">
            {/*<Counter></Counter>*/}
            {/*<ClassCounter></ClassCounter>*/}
            <PostForm create={createPost}></PostForm>
            <hr style={{margin: '10px 0 18px'}} />
            <div style={{marginBottom: '25px'}}>
                <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} type="text" placeholder="Search..." />
                <button onClick={() => searchInPosts(searchQuery)}>Search</button>
            </div>
            {
                posts.length !== 0
                    ? <PostList remove={removePost} posts={posts} title={"List of Posts"}></PostList>
                    : <div style={{fontSize: '20px', textAlign: 'center'}}>You do not have any posts now!</div>
            }
        </div>
    );

    // const [posts, setPosts] = useState(postsArr);
    // const [searchText, setSearchText] = useState("");
    //
    // const typingSearch = (text) => {
    //     setSearchText(text)
    // }
    //
    // const searching = (text) => {
    //     console.log(text)
    //     posts.filter((post) => {
    //         setPosts(post.title.includes(text))
    //     })
    // }
    //
    // return <div>
    //     <div className={"search"} style={{}}>
    //         <input placeholder={"Search..."} className={"search_input"} onChange={(e) => typingSearch(e.target.value)}/>
    //         <button type="submit" onClick={() => searching(searchText)}>Search</button>
    //     </div>
    //     <form className={"add_post"}>
    //         <input placeholder={"Title..."}/>
    //         <textarea placeholder={"Description..."}/>
    //         <button type="submit">Add</button>
    //     </form>
    //     <PostList posts={posts}/>
    // </div>
}

export default HomePage;