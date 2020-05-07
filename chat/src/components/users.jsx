import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {
    Dialog,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles,
    Avatar,
    DialogTitle,
    Divider,
    Button,
    DialogActions
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

// Definitions
const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600]
    },
    userList: {
        maxHeight: '100%',
        maxWidth: '100%',
        height: 300,
        width: 300,
        overflowY: 'auto',
        overflowX: 'hidden'
    }
});

// Component
const Users = (props) => {
    const classes = useStyles();
    return (
        <Dialog aria-labelledby="dialog for show users" open={props.openDialog} onBackdropClick={props.closeDialog}>
            <DialogTitle id="simple-dialog-title">Users online</DialogTitle>
            <Divider orientation="horizontal" />
            <List className={classes.userList}>
                {props.users.map((user, i) => (
                    <ListItem key={i}>
                        <ListItemAvatar>
                            <Avatar className={classes.avatar}>
                                <AccountCircleIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={user.name} />
                    </ListItem>
                ))}
            </List>
            <Divider orientation="horizontal" />
            <DialogActions>
                <Button size="small" variant="outlined" color="primary" onClick={props.closeDialog}>
                    CLOSE
			</Button>
            </DialogActions>
        </Dialog>
    );
};

export default Users;
