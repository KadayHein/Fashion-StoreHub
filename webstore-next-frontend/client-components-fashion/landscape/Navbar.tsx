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
import { LocalMall, Notifications, TranslateRounded } from '@mui/icons-material';
import CategorySidebar from '../CategorySidebar';
import { useClientContext } from '@/app/fashion/clientstore/layout';
import CartSidebar from '../CartSidebar';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const {cartSize} = useClientContext();

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

  const [catOpen, setCatOpen] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);

  const toggleCatSide = (newOpen: boolean) => () => {
    setCatOpen(newOpen);
  };

  const toggleCartSide = (newOpen: boolean) => () => {
    setCartOpen(newOpen);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "inherit" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton sx={{ marginRight: 2 }}>
            <Avatar alt="Store Logo" src="/images/cclogo.png" />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            CC-StoreHub.
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button href='/fashion/clientstore' sx={{ position: 'relative', display: 'block', color: 'black', py: 2,
                '&::after': { content: '""', position: 'absolute', width: 0, height: '2px',
                backgroundColor: 'rgb(87, 87, 87)', bottom: '10px', right: 0, transition: 'width 0.3s ease-in-out'},
                '&:hover::after': { width: '100%', left: 0, right: 'auto' } }}>
                Home
              </Button>
              <Button onClick={handleCloseNavMenu} sx={{ position: 'relative', display: 'block', color: 'black', py: 2,
                '&::after': { content: '""', position: 'absolute', width: '0', height: '2px',
                backgroundColor: 'rgb(87, 87, 87)', bottom: '10px', right: 0, transition: 'width 0.3s ease-in-out'},
                '&:hover::after': { width: '100%', left: 0, right: 'auto' } }}>
                About
              </Button>
              <Button onClick={toggleCatSide(true)} sx={{ position: 'relative', display: 'block', color: 'black', py: 2,
                '&::after': { content: '""', position: 'absolute', width: '0', height: '2px',
                backgroundColor: 'rgb(87, 87, 87)', bottom: '10px', right: 0, transition: 'width 0.3s ease-in-out'},
                '&:hover::after': { width: '100%', left: 0, right: 'auto' } }}>
                Showroom
              </Button>
              <Drawer open={catOpen} onClose={toggleCatSide(false)} anchor='left'>
                <CategorySidebar toggleCatSide={toggleCatSide}/>
              </Drawer>
              <Tooltip title="Cart View" >
                <IconButton onClick={toggleCartSide(true)} size="large" color="inherit" sx={{ p: 0, mx: 2}}>
                    <Badge badgeContent={cartSize} color="error">
                        <LocalMall sx={{color: 'black', display: { xs: 'none', md: 'flex' }}} />
                    </Badge>
                </IconButton>
              </Tooltip>
              <Drawer open={cartOpen} onClose={toggleCartSide(false)} anchor='right'>
                <CartSidebar toggleCartSide={toggleCartSide}/>
              </Drawer>
              <Tooltip title="Notifications">
              <IconButton size="large" color="inherit" sx={{ p: 0, mx: 2}}>
                <Badge badgeContent={9} color="error">
                    <Notifications sx={{color: 'black', display: { xs: 'none', md: 'flex' }}} />
                </Badge>
              </IconButton>
              </Tooltip>
              <Tooltip title="CC-JP Guide">
                <IconButton href="/jpguide/clientspace" size="large" color="inherit" sx={{ p: 0, mx: 2}}>
                    <Badge badgeContent={0} color="error">
                        <TranslateRounded sx={{color: 'black', display: { xs: 'none', md: 'flex' }}} />
                    </Badge>
                </IconButton>
              </Tooltip>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
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
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
