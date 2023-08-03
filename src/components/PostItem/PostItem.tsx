import React, { useState, useRef } from 'react'
import { IComment, IPost } from '../../models/Types'
import styles from './PostItem.module.scss'
import { postAPI } from '../../store/reducers/postsSlice';
import { uid } from 'uid';
import Comments from '../Comments/Comments';
interface IPostItemProps {
    post: IPost;
}
export const PostItem: React.FC<IPostItemProps> = ({ post }) => {
    const [deletePost, { }] = postAPI.useDeletePostMutation();
    const [unpdatePost, { }] = postAPI.useUpdatePostMutation();
    const createdAt = new Date(post.createdAt);
    const date = [createdAt.getFullYear(), createdAt.getMonth(), createdAt.getDate(), createdAt.getHours(), createdAt.getMinutes()]
    const [comment, setComment] = useState('');
    const [isOpenComment, setIsOpenComment] = useState(false);
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    //функция удаления поста
    const handleDelete = async () => {
        try {
            const res = deletePost(post)
            return res;
        } catch (error) {
            console.log('Delete error');
        }
    }


    //функция красивой даты, добавляет нули, где надо
    const niceDate = (date: string) => {
        return date.length > 1 ? date : `0${date}`
    }

    //функция отправки комментария
    const sendComment = async () => {
        if (comment.trim() !== '') {
            const newComment = {
                createdAt: new Date(),
                body: comment,
                id: uid(),
            } as IComment;
            let newComments = JSON.parse(JSON.stringify(post.comments));
            newComments.push(newComment);
            console.log(newComments);
            let currentPost = JSON.parse(JSON.stringify(post));
            currentPost.comments = newComments;
            console.log(currentPost);
            try {
                unpdatePost(currentPost);
            }
            catch (error) {
                console.log("comment error")
            }
            setComment('');
        }
    }

    //при нажатия куда-либо вне поста (в пост входит комментарий) закрываются все менюшки
    const postRef = useRef<HTMLLIElement>(null);
    document.addEventListener('click', function (event) {
        if (!postRef.current?.contains(event.target as Node)) {
            isOpenComment && handleOpenComments();
            isOpenMenu && handleOpenMenu();
        };
    });


    //функция открытия/заркытия комментариев 
    const handleOpenComments = () => {
        setIsOpenComment(!isOpenComment);
    }

    //функция открытия/заркытия меню удаления поста 
    const handleOpenMenu = () => {
        setIsOpenMenu(!isOpenMenu);
    }

    return (
        <li ref={postRef} className={`${styles.post} ${isOpenComment ? styles.openComment : ''}`} key={post.id}>
            <div className={styles.contentBlock}>
                <div className={styles.headerPost}>
                    <p className={styles.title}>{post.title}</p>
                    <div className={styles.date}>
                        <span>{date[0]}.{niceDate(date[1].toString())}</span>
                    </div>
                </div>
                <div className={styles.content}>
                    <p className={styles.text}>
                        {post.body}
                    </p>
                </div>
                <div className={styles.commnetButtonDiv}>
                    <span>{post.comments.length > 0 && post.comments.length}</span>
                    <button onClick={handleOpenComments} className={styles.commentButton} />
                </div>
                <div className={styles.menu}>
                    <button onClick={handleOpenMenu} className={styles.openMenu} />
                    {
                        isOpenMenu &&
                        <div className={styles.openedMenu}>
                            <button onClick={handleDelete} className={styles.delete} />
                        </div>
                    }
                </div>
            </div>
            {isOpenComment && <div className={styles.commentBlock}>
                <div className={styles.sendBox}>
                    <input value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Enter a comment' />
                    <button onClick={sendComment} />
                </div>
                <div className={styles.bodyBox}>
                    {post.comments.length > 0 ? < ul className={styles.comments}>
                        {post.comments.map((comment) =>
                            <Comments comment={comment} />
                        )}
                    </ul> : <p className={styles.noComm}>No comments yet</p>}
                </div>
            </div>}
        </li >
    )
}
