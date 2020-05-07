import React, { useState } from 'react';

import { showError } from '../utils/notification';
import { setInStorage } from '../utils/storage';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { makeStyles, Typography, Link } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { joinToRoom } from '../redux/actions/joinToRoom';
import { connect } from 'react-redux';

// Definitions
const useStyles = makeStyles({
    root: {
        height: '100vh'
    },
    card: {
        width: 350,
        padding: '15px 0',
        margin: '0 15px'
    },
    fullWidth: {
        width: '100%'
    },
    itemCard: {
        width: '100%',
        margin: '0 15px'
    },
    margin_0: {
        margin: '0 0'
    }
});

// Component
const Join = (props) => {
    const [user, setUser] = useState('');
    const [room, setRoom] = useState('');

    const classes = useStyles();

    const signIn = (event) => {
        event.preventDefault();

        if (!user || !room) {
            showError(`The user and room values mustn't be empty.`);
            return;
        }

        props.joinToRoom({ name: user, room: room });

        setInStorage('currentUser', { name: user, room: room });

        props.history.push('/chat');
    };

    return (
        <div>
            <Grid className={classes.root} container direction="row" justify="center" alignItems="center">
                <form onSubmit={signIn}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Grid container direction="row" justify="center" alignItems="center">
                                <h1 className={classes.margin_0}>Join Room</h1>
                                <TextField
                                    className={classes.itemCard}
                                    id="input-user"
                                    label="User"
                                    type="text"
                                    onChange={(event) => setUser(event.target.value)}
                                />
                                <TextField
                                    className={classes.itemCard}
                                    id="input-room"
                                    label="Room"
                                    type="text"
                                    onChange={(event) => setRoom(event.target.value)}
                                />
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Grid container direction="row" justify="center" alignItems="center">
                                <Grid container item xs={12} direction="row" justify="center" alignItems="center">
                                    <Button
                                        className={classes.fullWidth}
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        onClick={signIn}
                                    >
                                        Sign In
									</Button>
                                </Grid>
                                <Grid container item xs={12} direction="row" justify="center" alignItems="center" style={{ marginTop: '15px' }}>
                                    <Typography variant="caption" display="block">

                                        <Link href="https://www.linkedin.com/in/mateo-chamorro/" target="_blank" color="inherit">
                                            by: Mateo Chamorro
                                    </Link>
                                    </Typography>

                                </Grid>
                            </Grid>
                        </CardActions>
                    </Card>
                </form>
            </Grid>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        joinToRoom: (user) => dispatch(joinToRoom(user))
    };
};
export default connect(null, mapDispatchToProps)(Join);
