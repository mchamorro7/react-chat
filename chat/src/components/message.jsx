import React from 'react';
import ReactEmoji from 'react-emoji';

import { makeStyles, Grid, Paper } from '@material-ui/core';

// Definitions
const useStyles = makeStyles({
    messageContainer: {
        margin: '0.5em 0.5em',
        padding: '0.5em 0.5em',
        flexDirection: 'row'
    },
    ownMessage: {
        background: '#3f51b5',
        color: 'white'
    },
    otherMessage: {
        background: '#F3F3F3'
    },
    userName: {
        margin: 0,
        fontWeight: 'bold',
        textDecoration: 'underline'
    },
    textMessage: {
        margin: 0,
        flex: 1,
        flexWrap: 'wrap'
    }
});

// Component
const Message = ({ message: { text, user }, name }) => {
    const classes = useStyles();

    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();

    if (user === trimmedName) {
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser
            ? (
                <div>
                    <Grid container direction="row" justify="flex-end" alignItems="center">
                        <Paper variant="outlined" className={`${classes.messageContainer} ${classes.ownMessage}`}>
                            <p className={classes.userName}>{trimmedName}</p>
                            <p className={classes.textMessage}>{ReactEmoji.emojify(text)}</p>
                        </Paper>
                    </Grid>
                </div>
            )
            : (
                <div>
                    <Grid container direction="row" justify="flex-start" alignItems="center">
                        <Paper variant="outlined" className={`${classes.messageContainer} ${classes.otherMessage}`}>
                            <p className={classes.userName}>{user}</p>
                            <p className={classes.textMessage}>{ReactEmoji.emojify(text)}</p>
                        </Paper>
                    </Grid>
                </div>
            )
    );
}

export default Message;