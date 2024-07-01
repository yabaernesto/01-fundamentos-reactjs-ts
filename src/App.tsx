import './global.css';
import styles from './App.module.css';

import { Header } from './components/Header.tsx';
import { Sidebar } from './components/Sidebar.tsx';
import { Post } from './components/Post.tsx';

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/yabaernesto.png',
      name: 'Yaba Ernesto',
      role: 'Web Developer'
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa' },
      { 
        type: 'paragraph',
        content: 'Acabei de subir mais um projeto no meu portfolio. E um projeto que fiz no NLW Return, evento da Rocketseat'
      },
      { type: 'link', content: 'jane.design/doctorcare'},
    ],
    publishedAt: new Date('2022-05-03 20:00:00'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/JoilsonCapemba.png',
      name: 'Joao Capemba',
      role: 'Dev Mobile'
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa' },
      { 
        type: 'paragraph',
        content: 'Acabei de subir mais um projeto no meu portfolio. E um projeto que fiz no NLW Return, evento da Rocketseat'
      },
      { type: 'link', content: 'jane.design/doctorcare'},
    ],
    publishedAt: new Date('2023-5-29 16:41:00'),
  },
];

export function App() {  
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            )
          })}
        </main>
      </div>
    </div>
  );
}
