import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Grid, Box } from '@material-ui/core';

const ChatBar = (props) => {
    return (
        <div>
            <AppBar position="static" className={props.classes.fullWidth}>
                <Toolbar className={props.classes.toolBar}>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid container item xs={8} direction="row" justify="flex-start" alignItems="center">
                            <Typography variant="h5">Room: "{props.room}"</Typography>
                        </Grid>
                        <Grid container item xs={4} direction="row" justify="flex-end" alignItems="center">
                            <Grid item xs={"auto"}>
                                <Box display={{ xs: 'none', md: 'block' }}>
                                    <Typography variant="h6">Users: {props.users.length}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={"auto"}>
                                <IconButton aria-label="send" onClick={(event) => props.onCloseChat(event)}>
                                    <Icon style={{ fontSize: 30, color: 'white' }}>close</Icon>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default ChatBar;
