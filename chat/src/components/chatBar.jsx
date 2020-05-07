import React, { useState } from 'react';

import Users from './users';

import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Grid, Box } from '@material-ui/core';

const ChatBar = (props) => {
    const [openDialog, setOpenDialog] = useState(false);

    const openUsersDialog = (event) => {
        event.preventDefault();
        setOpenDialog(true);
    }

    const closeUsersDialog = (event) => {
        event.preventDefault();
        setOpenDialog(false);
    }

    return (
        <div>
            <Users users={props.users} openDialog={openDialog} closeDialog={closeUsersDialog}></Users>
            <AppBar position="static" className={props.classes.fullWidth}>
                <Toolbar className={props.classes.toolBar}>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid container item xs={6} direction="row" justify="flex-start" alignItems="center">
                            <Typography variant="h5">"{props.room}"</Typography>
                        </Grid>
                        <Grid container item xs={6} direction="row" justify="flex-end" alignItems="center">
                            <Grid item xs={"auto"}>
                                <Box>
                                    <Typography variant="h6" style={{ marginRight: '0.5em' }}>
                                        <IconButton aria-label="send" onClick={(e) => openUsersDialog(e)}>
                                            <Icon style={{ fontSize: 30, color: 'white' }}>person</Icon>
                                        </IconButton>
                                        {props.users.length}
                                    </Typography>
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
