import { ThumbsUp, Trash } from 'phosphor-react';
import styles from './Comment.module.css';
import { Avatar } from './Avatar';
import { useState } from 'react';

interface CommentProps {
    content: string;
    onDeleteComment: (comment: string) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {
    const [likeCount, setLikeCount] = useState(0);

    /**
     * chamar a funcao deleteComment a traves de outro componente como propriedade onDeleteComment
     * e deletar o content se a funcao handleDeleteComment for disparada.
     * A forma de conversar entre componentes eh apenas atraves de props, e uma props pode ser uma funcao
     */
    function handleDeleteComment() {
        onDeleteComment(content)
    }

    function handleLikeComment() {
        setLikeCount(state => {
            return state + 1;
        });
    }

    return (
        <div className={styles.comment}>
            <Avatar 
                hasBorder={false} 
                src='https://github.com/Miguel-Leite.png' 
                alt=""
            />

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Yaba Ernesto</strong>
                            <time title='11 de Maio as 08:13' dateTime='2022-05-11 08:13:30'>
                                Cerca de 1h a tras
                            </time>
                        </div>

                        <button onClick={handleDeleteComment} title="Deletar comentario">
                            <Trash size={24} />
                        </button>
                    </header>

                    <p>{content}</p>
                </div>

                <footer>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp size={20} />
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    );
}
