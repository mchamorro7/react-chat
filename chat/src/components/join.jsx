import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';

// Custom Styles
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

const Join = () => {
    const [user, setUser] = useState('');
    const [room, setRoom] = useState('');
    const classes = useStyles();
    return (
        <div>
            <Grid className={classes.root}
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Card className={classes.card} >
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
                            <Link className={classes.itemCard} onClick={e => (!user || !room) ? e.preventDefault() : null} to={`/chat?name=${user}&room=${room}`}>
                                <Button className={classes.fullWidth} variant="contained" color="primary" type="submit">Sign In</Button>
                            </Link>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
        </div>
    );
}

export default Join;