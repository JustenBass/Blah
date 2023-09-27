import React, { useState, useContext } from 'react'
import { UserContext } from '../context/user';
import { useNavigate } from 'react-router-dom'

export default function PostBlog(){
    const navigate = useNavigate()
    const { isAuthenticated, addBlog, blogErrors } = useContext(UserContext)
    const [ blogData, setBlogData ] = useState( {
        title: '',
        image: '',
        blog: ''
    })

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        setBlogData({
            ...blogData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const add = {...blogData}
        addBlog(add)
        setBlogData({ title: '', image: '', blog: ''})
        navigate('/')
    }


if( isAuthenticated ){
    return (
        <div className='updateFormDivs'>
            <br/>
            <h1> POST A BLOG </h1>
            <hr/>

            <form onSubmit={handleSubmit}>
                <input
                className='updatePostFormInputs'
                type='text'
                name='title'
                placeholder='Title'
                value={blogData.title}
                onChange={handleChange}
                />

                <div>
                    <input
                    className='updatePostFormInputs'
                    type='text'
                    name='image'
                    placeholder='Image...'
                    value={blogData.image}
                    onChange={handleChange}
                    />
                </div>


                    <textarea
                    className='updatePostFormInputsTwo'
                    type='text'
                    name='blog'
                    placeholder='Write Blog Here...'
                    value={blogData.blog}
                    onChange={handleChange}
                    />
                <br/>

                <button className='updateFormInputButtons' type="submit"> SHOW THE WORLD! </button>
            </form>
            <br/>
        </div>
    );
} else {
    return (
        <div className='userErrorDiv'>
            <h3 className='userErrorFont'>{ blogErrors }</h3>
        </div>
    )
};
};
