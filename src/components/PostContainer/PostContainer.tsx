import React, { useState } from 'react'
import { useEffect } from 'react';
import { PostItem } from '../PostItem/PostItem';
import styles from './PostContainer.module.scss'
import { IPost } from '../../models/Types';
import { postAPI } from '../../store/reducers/postsSlice';

const PostContainer: React.FC = (props) => {

  const [desc, setDesc] = useState<string>('asc'); //хранит порядок сортировки: desc - в обратном порядке, asc - в обычном порядке
  const [search, setSearch] = useState('');
  const [apiSearch, setApiSearch] = useState('');
  const { data: posts, error, isLoading, refetch } = postAPI.useFetchAllPostsQuery({ order: desc, search: apiSearch })
  
  
  //изменения стейта поиска с задержкой 300мс, если пользователь остановился печатать
  useEffect(() => {
    const temeoutId = setTimeout(() => {
      setApiSearch(search);
    }, 300)

    return () => clearTimeout(temeoutId);
  }, [search])

  //изменение стейта порядка сортировки
  const handleOrder = () => {
    desc === 'asc' ?
      setDesc('desc') : setDesc('asc');
  }

  //изменение управляемого инпута поиска
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  let currentName = '';
  let lastName: string = '';

  //рендер поста, чтобы не дублировалось имя пользователя на каждом посте с одинаковым именем
  const newItem = (item: IPost) => {
    currentName = item.userName;
    if (currentName !== lastName) {
      lastName = currentName;
      return <div className={styles.item}>
        <div className={styles.space}/>
        <p className={styles.userName}>{currentName}</p>
        <PostItem key={item.id} post={item} />
      </div>
    }
    else {
      lastName = currentName;
      return <PostItem key={item.id} post={item} />
    }
  }
  return (
    <div className={styles.postsBlock}>
      <div className={styles.sort}>
        <button className={desc !== 'asc' ? styles.active : ''} onClick={handleOrder}>{desc==='asc' ? 'Sort in reverse order' : 'Sort in order'}</button>
        <input value={search} onChange={(e) => handleSearch(e)} placeholder='Поиск...' />
      </div>
      <ul className={styles.postsList}>
        {isLoading ? <h1>Загрузка...</h1> :

          posts && posts?.map(item =>
            newItem(item)
          )
        }
      </ul>
    </div>
  );
}

export default PostContainer