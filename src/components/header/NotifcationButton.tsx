
import { Badge, IconButton } from '@mui/material';
import { Notifications as NotificationsIcon } from "@mui/icons-material";


const NotificationButton: React.FC = () => {

    return (
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="Notifications"
        >
            <Badge badgeContent={4} color="warning">
                <NotificationsIcon />
            </Badge>
        </IconButton>
    )
};

export default NotificationButton;