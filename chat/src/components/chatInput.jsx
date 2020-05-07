import React from 'react';

import Icon from '@material-ui/core/Icon';
import { makeStyles, Paper } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';

// Definitions
const useStyles = makeStyles((theme) => ({
    fullWidth: {
        width: '100%'
    },
    chatInput: {
        position: 'absolute',
        width: '100%',
        height: '10%',
        top: 'auto',
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
    },
    chatTextField: {
        height: '100%',
        width: '90%',
        paddingLeft: '10px'
    },
    sendIcon: {
        paddingLeft: '6px'
    }

}));

// Component
const ChatInput = (props) => {
    const classes = useStyles();

    return (
        <Paper elevation={2} className={classes.chatInput}>
            <InputBase
                className={classes.chatTextField}
                placeholder="Message"
                inputProps={{ 'aria-label': 'send message' }}
                value={props.message}
                onChange={(event) => props.onMessageChange(event)}
                onKeyPress={(event) => (event.key === 'Enter' ? props.onSendMessage(event) : null)}
            />
            <Divider orientation="vertical" />
            <IconButton aria-label="send" onClick={(event) => props.onSendMessage(event)}>
                <Icon className={classes.sendIcon}>send</Icon>
            </IconButton>
        </Paper>
    );
};

export default ChatInput;
