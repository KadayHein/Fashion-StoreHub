import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { URL_ABOUT, URL_AUTH, URL_CATEGORIES, URL_HOME, URL_WEBLOGO } from '@/service/routeHandler';
import { HomeRounded, InfoRounded, LoginRounded, Notifications, StorefrontRounded } from '@mui/icons-material';
import { Avatar, IconButton, Typography } from '@mui/material';
import { useRouter } from '@/i18n/navigation';
import { useAppTranslation } from '@/service/customHooks/useAppTranslation';

export default function MenuSidebar({ toggleMenuSide, menuOpen }: any) {

  const router = useRouter()
  const { nav } = useAppTranslation()

  const menuList = [
    {
      label: nav("home"),
      icon: <HomeRounded />,
      route2: URL_HOME
    },
    {
      label: nav("about"),
      icon: <InfoRounded />,
      route2: URL_ABOUT
    },
    {
      label: nav("showroom"),
      icon: <StorefrontRounded />,
      route2: URL_CATEGORIES
    },
    {
      label: nav("noti"),
      icon: <Notifications />,
      route2: "/"
    },
    {
      label: nav("login"),
      icon: <LoginRounded />,
      route2: URL_AUTH
    },
  ]

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleMenuSide(false)}>
      <Box className="flex items-center">
        <IconButton >
          <Avatar alt="Store Logo" src={URL_WEBLOGO} />
        </IconButton>
        <Typography
          variant="subtitle1"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'black',
            textDecoration: 'none',
          }}
        >
          GD-StoreHub.
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuList.map((menu, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => router.push(menu.route2)}>
              <ListItemIcon>
                {menu.icon}
              </ListItemIcon>
              <ListItemText primary={menu.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer open={menuOpen} onClose={toggleMenuSide(false)} anchor='left'>
      {DrawerList}
    </Drawer>
  );
}