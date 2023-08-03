import React, { useRef, useEffect, useState } from 'react'
import styles from './AddForm.module.scss'
import { IPost } from '../../models/Types'
import axios from 'axios';
import { BASE_URL } from '../../constants/BASE_URL';
import { postAPI } from '../../store/reducers/postsSlice';
import { onFocus } from '@reduxjs/toolkit/dist/query/core/setupListeners';


const AddForm: React.FC = () => {
    const [userName, setUserName] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [createPost, { }] = postAPI.useCreatePostMutation();
    const [errorAdd, setErrorAdd] = useState(false);
    const [inputsIsActive, setInputIsActive] = useState(false)


    //создания поста
    const handleSubmit = async () => {
        // e.preve
        if (userName && title && body) {
            const newPost = {
                title: title,
                createdAt: new Date(),
                userName: userName,
                body: body
            } as IPost;
            try {
                await createPost(newPost);
            } catch (error) {
                console.log('loading error');
            }
            setUserName('');
            setTitle('');
            setBody('');
            handle(false)
        }
        else {
            setErrorAdd(true);
        }
    }

    //первое поле инпута 
    const input1 = useRef<HTMLInputElement>(null);

    //функция фокуса на первом инпуте при открытие меню созданяи поста
    const openForm = () => {
        !inputsIsActive && input1.current?.focus()
    }

    //открытие закрытие меню создания поста
    const handle = (is: boolean) => {
        setInputIsActive(is);
        setErrorAdd(false);
    }

    return (
        <>
            <form onFocus={() => handle(true)} onBlur={() => handle(false)} className={`${styles.AddForm} ${inputsIsActive ? styles.active : ''}`} >
                <p onClick={() => openForm()} className={styles.create}>Create new post</p>
                <div className={styles.inputs}>
                    <input ref={input1} value={userName} onChange={e => setUserName(e.target.value)} type='text' className={styles.name} placeholder='Your name' />

                    <input value={title} onChange={e => setTitle(e.target.value)} type='text' className={styles.title} placeholder='Title' />
                    <input value={body} onChange={e => setBody(e.target.value)} className={styles.body} placeholder='Post content' />
                    <input className={styles.submit} type='button' onClick={handleSubmit} value="Create" />
                    {errorAdd && <p className={styles.error}>Fill in all the fields</p>}
                </div>
            </form>
        </>
    )
}

export default AddForm