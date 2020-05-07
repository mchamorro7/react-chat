import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { makeStyles, Paper, Backdrop, CircularProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import { getFromStorage, removeFromStorage } from '../utils/storage';
import { showError } from '../utils/notification';
import { joinToRoom } from '../redux/actions/joinToRoom';

import ChatBar from './chatBar';
import Messages from './messages';
import ChatInput from './chatInput';

// Definitions
const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    root: {
        height: '100vh'
    },
    chatContainer: {
        position: 'relative',
        maxWidth: 600,
        maxHeight: 600,
        width: '100%',
        height: '100%',
        margin: '0 15px'
    },
    toolBar: {
        padding: '0 15px'
    },
    fullWidth: {
        width: '100%'
    },
    margin_0: {
        margin: '0 0'
    }
}));

let socket;

// Component
const Chat = (props) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const classes = useStyles();

    const endpoint = 'localhost:5000';

    useEffect(() => {
        const user = getFromStorage('currentUser');

        const name = user ? user.name : props.name;
        const room = user ? user.room : props.room;

        if (!name || !room) {
            props.history.push('/');
        }

        setName(name);
        setRoom(room);

        socket = io(endpoint);

        socket.emit('join', { name: name, room: room }, (error) => {
            if (error) {
                props.history.push('/');
                showError(error);
                return;
            }

        });

    }, [endpoint, props]);

    useEffect(() => {

        socket.on('message', message => {
            setMessages(messages => [...messages, message]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });

        return () => {
            socket.removeListener('message');
            socket.removeListener('roomData');
        }

    }, []);

    /**
     * Send messages to the room that the user joined
     * @param {*} event 
     */
    const sendMessage = (event) => {
        // Should not refresh the page
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    /**
     * Disconnect from the room
     * @param {*} event 
     */
    const closeChat = (event) => {
        event.preventDefault();
        socket.disconnect();
        removeFromStorage('currentUser');
        props.history.push('/');
    }

    return (
        <div>
            {users.length === 0 ?
                <Backdrop className={classes.backdrop} open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                :
                null}
            <Grid container direction="row" justify="center" alignItems="center" className={classes.root}>
                <Paper elevation={3} className={classes.chatContainer}>
                    <ChatBar room={room} users={users} classes={classes} onCloseChat={(event) => closeChat(event)} />
                    <Grid container direction="row" justify="center" alignItems="center" style={{ width: '100%' }}>
                        <Grid container item xs={12}>
                            <Messages messages={messages} name={name} />
                            <ChatInput message={message}
                                onMessageChange={(event) => setMessage(event.target.value)}
                                onSendMessage={(event) => sendMessage(event)} />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    );

};

const mapStateToProps = (state) => ({
    name: state.name,
    room: state.room
});
const mapDispatchToProps = dispatch => {
    return {
        joinToRoom: (user) => dispatch(joinToRoom(user))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat);
