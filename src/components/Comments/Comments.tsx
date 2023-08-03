import React from 'react'
import { IComment, IPost } from '../../models/Types'
import styles from '../PostItem/PostItem.module.scss'
interface ICommentsProps {
    comment: IComment;
}


const Comments: React.FC<ICommentsProps> = ({ comment }) => {


    //красивая дата, добавление нуля вначало
    const niceDate = (date: string) => {
        return date.length > 1 ? date : `0${date}`
    }

    //перевод из Date в string
    const stringifyCreatedAt = (date: Date) => {
        const createdAt = new Date(date);
        return `${createdAt.getFullYear()}.${niceDate(createdAt.getMonth().toString())}`
    }


    return (
        <li key={comment.id}>
            <p className={styles.date}>{stringifyCreatedAt(comment.createdAt)}</p>
            <p className={styles.body}>{comment.body}</p>
        </li>
    )
}

export default Comments