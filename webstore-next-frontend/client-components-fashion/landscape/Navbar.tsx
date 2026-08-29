import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Badge, Drawer } from '@mui/material';
import { LocalMall, LoginRounded, MenuRounded, Notifications, RoomPreferencesRounded } from '@mui/icons-material';
import { useClientContext } from '@/app/[locale]/fashion/clientstore/layout';
import CartSidebar from '../store-display/CartSidebar';
import { isUserLoggedIn, logoutUser } from '@/service/authHandler';
import { enqueueSnackbar } from 'notistack';
import { useRouter } from '@/i18n/navigation';
import { URL_ABOUT, URL_ADMIN_PANEL, URL_AUTH, URL_CATEGORIES, URL_HOME, URL_WEBLOGO } from '@/service/routeHandler';
import MenuSidebar from '../store-display/MenuSidebar';
import { useAppTranslation } from '@/service/customHooks/useAppTranslation';
import LanguageSwitcher from '@/base-components/globalization/LanguageSwitcher';

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const { cartSize } = useClientContext();
  const { nav, noti } = useAppTranslation();
  const router = useRouter();
  const route2 = (url: string) => router.push(url)

  const settings = [
    {
      key: 1,
      title: nav("profile"),
      func: () => {
        route2('/fashion/clientstore/profile4/kadayhein')
        handleCloseUserMenu()
      },
    },
    {
      key: 2,
      title: nav("lang"),
      func: () => { },
    },
    {
      key: 3,
      title: nav("darkmode"),
      func: () => { },
    },
    {
      key: 4,
      title: nav("logout"),
      func: () => {
        logoutUser()
        window.location.reload();
        enqueueSnackbar(noti("logoutsuccess"), { variant: "success" });
        route2("/")
      },
    }
  ];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [menuOpen, setMenuOpen] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);

  const toggleMenuSide = (newOpen: boolean) => () => {
    setMenuOpen(newOpen);
  };
  const toggleCartSide = (newOpen: boolean) => () => {
    setCartOpen(newOpen);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Tooltip title="Menu" >
            <IconButton onClick={toggleMenuSide(true)} size="large" color="inherit" sx={{ p: 0, mx: 2 }}>
              <MenuRounded sx={{ color: 'black', display: { xs: 'flex', md: 'none' } }} />
            </IconButton>
          </Tooltip>
          <MenuSidebar menuOpen={menuOpen} toggleMenuSide={toggleMenuSide} />

          <IconButton sx={{ marginRight: 2 }}>
            <Avatar alt="Store Logo" src={URL_WEBLOGO} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => route2('/')}
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


          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button onClick={() => route2(URL_HOME)} sx={{
              position: 'relative', display: 'block', color: 'black', py: 2,
              '&::after': {
                content: '""', position: 'absolute', width: 0, height: '2px',
                backgroundColor: 'rgb(87, 87, 87)', bottom: '10px', right: 0, transition: 'width 0.3s ease-in-out'
              },
              '&:hover::after': { width: '100%', left: 0, right: 'auto' }
            }}>
              {nav("home")}
            </Button>
            <Button onClick={() => route2(URL_ABOUT)} sx={{
              position: 'relative', display: 'block', color: 'black', py: 2,
              '&::after': {
                content: '""', position: 'absolute', width: '0', height: '2px',
                backgroundColor: 'rgb(87, 87, 87)', bottom: '10px', right: 0, transition: 'width 0.3s ease-in-out'
              },
              '&:hover::after': { width: '100%', left: 0, right: 'auto' }
            }}>
              {nav("about")}
            </Button>
            <Button onClick={() => route2(URL_CATEGORIES)} sx={{
              position: 'relative', display: 'block', color: 'black', py: 2,
              '&::after': {
                content: '""', position: 'absolute', width: '0', height: '2px',
                backgroundColor: 'rgb(87, 87, 87)', bottom: '10px', right: 0, transition: 'width 0.3s ease-in-out'
              },
              '&:hover::after': { width: '100%', left: 0, right: 'auto' }
            }}>
              {nav("showroom")}
            </Button>

            <Tooltip title={nav("cart")} >
              <IconButton onClick={toggleCartSide(true)} size="large" color="inherit"
                sx={{ width: 55, height: 55, p: 0, borderRadius: 2 }}>
                <Badge badgeContent={cartSize} color="error">
                  <LocalMall sx={{ color: 'black', display: { xs: 'none', md: 'flex' } }} />
                </Badge>
              </IconButton>
            </Tooltip>
            <CartSidebar cartOpen={cartOpen} toggleCartSide={toggleCartSide} />

            <Tooltip title={nav("noti")}>
              <IconButton size="large" color="inherit"
                sx={{ width: 55, height: 55, p: 0, borderRadius: 2 }}>
                <Badge badgeContent={9} color="error">
                  <Notifications sx={{ color: 'black', display: { xs: 'none', md: 'flex' } }} />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title={nav("admin_panel")} >
              <IconButton onClick={() => route2(URL_ADMIN_PANEL)} size="large" color="inherit"
                sx={{ width: 55, height: 55, p: 0, borderRadius: 2 }}>
                <Badge badgeContent={"beta"} color="error">
                  <RoomPreferencesRounded sx={{ color: 'black', display: { xs: 'none', md: 'flex' } }} />
                </Badge>
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ ml: "auto" }}>
            <LanguageSwitcher />
          </Box>
          {
            !isUserLoggedIn() &&
            <Button onClick={() => route2(URL_AUTH)} variant="outlined" endIcon={<LoginRounded />}
              sx={{
                bgcolor: "black", color: "white", borderColor: "#9CA3AF", borderRadius: "999px",
                transition: "background-color 0.2s", "&:hover": { backgroundColor: "white", color: "black" }, 
                textTransform: "none", display: { xs: "none", lg: "flex"}
              }}>
              {nav("login")}
            </Button>
          }
          {
            !isUserLoggedIn() &&
            <Tooltip title={nav("login")}>
              <IconButton size="large" color="inherit"
                sx={{ width: 55, height: 55, p: 0, borderRadius: 2, display: { xs: 'flex', lg: 'none' } }}>
                  <LoginRounded sx={{ color: 'black' }} />
              </IconButton>
            </Tooltip>
          }
          {
            isUserLoggedIn() &&
            <Box sx={{ ml: "auto" }}>
              <Tooltip title={nav("open_settings")}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Account Name" src="/images/avatar/character1.avif" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.key} onClick={setting.func}>
                    <Typography sx={{ textAlign: 'center' }}>{setting.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
