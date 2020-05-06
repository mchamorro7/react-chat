import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './message';
import { makeStyles } from '@material-ui/core';

// Definitions
const useStyles = makeStyles({
    messagesContainer: {
        position: 'absolute',
        width: '100%',
        height: '80%',
        padding: '0 0',
        overflow: 'auto',
        flex: 'auto',
    },
});

// Component
const Messages = ({ messages, name }) => {
    const classes = useStyles();

    return (
        // To scroll to bottom when enter the view
        <ScrollToBottom className={classes.messagesContainer}>
            {messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)}
        </ScrollToBottom>
    );
}

export default Messages;