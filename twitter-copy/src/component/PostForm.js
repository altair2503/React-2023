import React, {useState} from 'react';

const PostForm = ({create}) => {

    const [post, setPost] = useState({
        id: '',
        title: '',
        description: ''
    })

    const addNewPost = (e) => {
        e.preventDefault() // Отключение стандартных операций

        const newPost = {
            ...post
        }
        // console.log(newPost)

        // setPosts([...posts,

        create(newPost)
        setPost({id: '', title: '', description: ''})
    }

    return (
        <form style={{marginBottom: '20px'}}>
            {/* Управляемый компонент */}
            <input type="text" value={post.id} onChange={e => setPost({...post, id: e.target.value})} placeholder="Post id"/>
            <input type="text" value={post.title} onChange={e => setPost({...post, title: e.target.value})} placeholder="Post name"/>
            <input type="text" value={post.description} onChange={e => setPost({...post, description: e.target.value})} placeholder="Post desc"/>
            <button onClick={addNewPost}>Create post</button>
        </form>
    );

};

export default PostForm;