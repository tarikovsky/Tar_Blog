import React from 'react'
import PostContainer from './components/PostContainer/PostContainer'
import styles from './App.module.scss'
import AddForm from './components/AddForm/AddForm'
const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <div className={styles.content}>
        <AddForm />
        <PostContainer />
      </div>
    </div >
  )
}

export default App