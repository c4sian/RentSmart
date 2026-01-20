import { Avatar, Box, Button, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import { Logout, Person, Apartment } from '@mui/icons-material';
import { Link } from "react-router";
import { useAccount } from "../../lib/hooks/useAccount";

type Props = {
    user: LoginResponse
};

export default function UserMenu({ user }: Props) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);

    const handleClose = () => setAnchorEl(null);

    const { logoutUser } = useAccount();
    const handleLogout = async () => {
        await logoutUser.mutateAsync();
    }

    return (
        <>
            <Button onClick={handleClick}>
                <Box display={"flex"} sx={{ alignItems: "center", gap: 'clamp(0.25rem, 0.75vw, 1rem)' }}>
                    <Avatar />
                    <Typography variant="body2" color="grey.800">{user.displayName}</Typography>
                </Box>
            </Button>

            <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
                <MenuItem component={Link} to={'my-profile'} onClick={handleClose}>
                    <ListItemIcon>
                        <Person />
                    </ListItemIcon>
                    <ListItemText>My profile</ListItemText>
                </MenuItem>

                <MenuItem component={Link} to={'/create-accommodation'} onClick={handleClose}>
                    <ListItemIcon>
                        <Apartment />
                    </ListItemIcon>
                    <ListItemText>Register property</ListItemText>
                </MenuItem>

                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </MenuItem>
            </Menu>
        </>
    )
}