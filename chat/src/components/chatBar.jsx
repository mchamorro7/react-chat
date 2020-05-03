import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

const ChatBar = ({ room, users, classes }) => {
    return (
        <div>
            <AppBar position="static" className={classes.fullWidth}>
                <Toolbar>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Typography variant="h5">
                            Room: "{room}"
					</Typography>
                        <Typography variant="h6">
                            Users: {users.length}
                        </Typography>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default ChatBar;
