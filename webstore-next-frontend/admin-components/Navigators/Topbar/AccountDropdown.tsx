import { AccountCircleRounded, ArrowDropDownRounded, Home, LogoutRounded, SettingsRounded } from '@mui/icons-material';
import {
  Avatar,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { MouseEvent, ReactElement, useState } from 'react';

const AccountDropdown = (): ReactElement => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        color="inherit"
        id="account-dropdown-button"
        aria-controls={open ? 'account-dropdown-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          borderRadius: 2,
          gap: 1.875,
          px: { xs: 0, sm: 0.625 },
          py: 0.625,
        }}
      >
        <Tooltip title="Gaday" placement="bottom" arrow enterDelay={0} leaveDelay={0}>
          <Avatar alt="Gaday" src={""} sx={{ width: 35, height: 35 }} /> 
        </Tooltip>
        <Typography
          variant="body1"
          component="p"
          color="text.primary"
          display={{ xs: 'none', sm: 'block' }}
        >
          Gaday
        </Typography>
        <ArrowDropDownRounded
          width={24}
          height={24}
          sx={{ xs: 'none', sm: 'block' }}
        />
      </Button>
      <Menu
        id="account-dropdown-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'account-dropdown-button',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText
            sx={(theme) => ({
              '& .MuiListItemText-primary': {
                fontSize: theme.typography.body1.fontSize,
                fontFamily: theme.typography.body1.fontFamily,
                fontWeight: theme.typography.body1.fontWeight,
              },
            })}
          >
            Home
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AccountCircleRounded />
          </ListItemIcon>
          <ListItemText
            sx={(theme) => ({
              '& .MuiListItemText-primary': {
                fontSize: theme.typography.body1.fontSize,
                fontFamily: theme.typography.body1.fontFamily,
                fontWeight: theme.typography.body1.fontWeight,
              },
            })}
          >
            Profile
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <SettingsRounded />
          </ListItemIcon>
          <ListItemText
            sx={(theme) => ({
              '& .MuiListItemText-primary': {
                fontSize: theme.typography.body1.fontSize,
                fontFamily: theme.typography.body1.fontFamily,
                fontWeight: theme.typography.body1.fontWeight,
              },
            })}
          >
            Settings
          </ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleClose}
          disableRipple
          disableTouchRipple
          sx={{ color: 'error.main' }}
        >
          <ListItemIcon>
            <LogoutRounded />
          </ListItemIcon>
          <ListItemText
            sx={(theme) => ({
              '& .MuiListItemText-primary': {
                fontSize: theme.typography.body1.fontSize,
                fontFamily: theme.typography.body1.fontFamily,
                fontWeight: theme.typography.body1.fontWeight,
              },
            })}
          >
            Logout
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountDropdown;
