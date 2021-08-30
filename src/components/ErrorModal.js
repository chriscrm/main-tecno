import React from 'react';
import Wrapper from '../helpers/Wrapper';
import styles from './ErrorModal.module.css';
import Card from './Card';
import Button from './Button';

const ErrorModal = (props) => {
    return (
        <Wrapper>
            <div className={styles.backdrop} onClick={props.onConfirm} />
            <Card className={styles.modal}>
                <header className={styles.header}>
                    <h3>{props.title}</h3>
                </header>
                <div className={styles.content}>
                    <p>{props.message}</p>
                </div>
                <footer className={styles.actions}>
                    <Button onClick={props.onConfirm}>Close</Button>
                </footer>
            </Card>
        </Wrapper>
    )
}

export default ErrorModal;