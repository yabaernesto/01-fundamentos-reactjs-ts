import { format, formatDistanceToNow } from 'date-fns';
import ptBR  from 'date-fns/locale/pt-BR';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

import styles from './Post.module.css';
import { Comment } from './Comment';
import { Avatar } from './Avatar';

interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

interface Content {
    type: 'paragraph' | 'link';
    content: string;
}

interface PostProps {
    author: Author;
    publishedAt: Date;
    content: Content[];
}

export function Post({ author, publishedAt, content }: PostProps) {
    const [comments, setComments] = useState([
        'Post muito bacana ein!'
    ]);

    const [newCommentText, setNewCommentText] = useState(''); 

    // data que foi publicada
    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'as' HH:mm'h'", {
        locale: ptBR,
    });

    // tempo feito apos a publicacao
    const publishedDateRealaiteveToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true,
    });

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault();

        setComments([...comments, newCommentText]);
        // limpar o textare apos o click no button
        setNewCommentText('');
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        // limpando a configuracao de sms caso o textarea esteja preenchido e o button foi clicado
        event.target.setCustomValidity('');
        // pegar o valor do elemento textarea: event.target.value;
        setNewCommentText(event.target.value);
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        // configurando a sms de exibicao caso o campo nao for preenchido
        event.target.setCustomValidity('Esse campo eh obrigatorio!');
    }

    function deleteComment(commentToDelete: string) {
        const commentsWithoutDeletedOne = comments.filter(comment => {
            // retorne apenas os comment diferente de commentToDelete
            return comment !== commentToDelete;
        });

        setComments(commentsWithoutDeletedOne);
    }

    const isNewCommentEmpty = newCommentText.length === 0;

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar hasBorder={true} src={author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
                    {publishedDateRealaiteveToNow}
                </time>
            </header>

            <div className={styles.content}>
                {content.map(line => {
                    if (line.type === 'paragraph') {
                        return <p key={line.content}>{line.content}</p>
                    } else if (line.type === 'link') {
                        return <p key={line.content}><a href="#">{line.content}</a></p>
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea 
                    name='comment'
                    placeholder='Deixe seu comentario'
                    value={newCommentText}
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommentInvalid}
                    required
                />

                <footer>
                    <button type="submit" disabled={isNewCommentEmpty}>
                        Publicar
                    </button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return (
                        <Comment 
                            key={comment} 
                            content={comment} 
                            onDeleteComment={deleteComment} 
                        />
                    );
                })}
            </div>
        </article>
    );
}
