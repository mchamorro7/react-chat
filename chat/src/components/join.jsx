import React from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

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
        width: '100%',
        margin: '0 15px'
    },
    margin_0: {
        margin: '0 0'
    }
});

const Join = () => {
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
                            <h1 className={classes.margin_0}>Join</h1>
                            <TextField
                                className={classes.fullWidth}
                                id="input-user"
                                label="User"
                            />
                            <TextField
                                className={classes.fullWidth}
                                id="input-room"
                                label="Room"
                            />
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Button className={classes.fullWidth} variant="contained" color="primary" >Sign In</Button>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
        </div>
    );
}

export default Join;