import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { makeStyles, Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { getFromStorage } from '../utils/storage';
import { showError } from '../utils/notification';
import { joinToRoom } from '../redux/actions/joinToRoom';

import ChatBar from './chatBar';
import Messages from './messages';

// Definitions
const useStyles = makeStyles({
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
    fullWidth: {
        width: '100%'
    },
    chatInput: {
        position: 'absolute',
        width: '100%',
        top: 'auto',
        bottom: 0
    },
    margin_0: {
        margin: '0 0'
    }
});

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
                //remove user
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
            console.log(users);
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

    return (
        <div>
            <Grid container direction="row" justify="center" alignItems="center" className={classes.root}>
                <Paper elevation={3} className={classes.chatContainer}>
                    <ChatBar room={room} users={users} classes={classes} />
                    <Messages messages={messages} name={name} />
                    <TextField
                        id="input-message"
                        className={classes.chatInput}
                        label="Message"
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event) : null}
                        variant="filled"
                    />
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
