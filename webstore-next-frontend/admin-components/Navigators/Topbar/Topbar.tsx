import { AppBar, Badge, Box, IconButton, InputAdornment, Link, Stack, TextField, Toolbar, Tooltip, Typography } from '@mui/material';
// import Image from 'next/image';
// import Link from 'next/link';
import React, { MouseEventHandler } from 'react'
import inputstyle from './../../../service-module/global-util/form-input.module.css';
import { MenuRounded, Notifications } from '@mui/icons-material';
import AccountDropdown from './AccountDropdown';
import LanguageDropdown from './LanguageDropdown';

interface TopbarProps {
  handleDrawerToggle: MouseEventHandler;
}

export default function Topbar({ handleDrawerToggle }: TopbarProps) {

    const drawerWidth = "350";
    const pathname = "/";
    const title = "title";
    const [searchText,setSearchText] = React.useState<string>('')
    const resetSearch = () => {
      setSearchText('');
  }
  //   const { pathname } = useLocation();
  // const title = capitalizePathname(pathname);

  return (
    <AppBar
      sx={{
        width: { lg: `calc(100% - ${drawerWidth}px + 24px)` },
        ml: { lg: `${drawerWidth}px` },
        backgroundColor:"transparent", color: "black",
        boxShadow: 0
      }}
    >
      <Toolbar
        sx={{
          p: 3.75,
        }}
      >
        <Stack direction="row" gap={1}>
          <Link href="/" width={40} height={40} display={{ xs: 'block', lg: 'none' }}>
            <IconButton color="inherit" sx={{ p: 0.75, bgcolor: 'inherit' }}>
              <img src={"/images/cclogo.png"} width={1} height={1} />
            </IconButton>
          </Link>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              width: 40,
              height: 40,
              m: 0,
              p: 0.75,
              display: { lg: 'none' },
              bgcolor: 'inherit',
            }}
          >
            <svg height="64" viewBox="0 0 64 64" width="64" xmlns="http://www.w3.org/2000/svg"><g fill="#5ea7ff" fillRule="evenodd"><rect height="7" rx="2" width="50" x="7" y="11"/><rect height="7" rx="2" width="50" x="7" y="29"/><rect height="7" rx="2" width="50" x="7" y="47"/></g></svg>
          </IconButton>
          <IconButton
            color="inherit"
            sx={{
              width: 40,
              height: 40,
              p: 1,
              display: { xs: 'flex', lg: 'none' },
              mr: 'auto',
              bgcolor: 'inherit',
            }}
          >
            <svg enableBackground="new 0 0 501.944 501.944" viewBox="0 0 501.944 501.944" xmlns="http://www.w3.org/2000/svg"><path d="m377.275 343.903-33.437 33.436-34.481-34.481 33.436-33.437z" fill="#334a5e"/><path d="m486.989 487.054c-19.853 19.853-52.245 19.853-72.098 0l-98.22-98.22 72.098-72.098 98.22 98.22c19.853 19.853 19.853 52.245 0 72.098z" fill="#ffd15c"/><path d="m337.569 57.601c-77.322-76.278-201.665-77.322-278.988 0s-78.367 200.62-1.045 277.943c76.278 77.322 201.665 77.322 278.988 1.045s77.323-201.666 1.045-278.988z" fill="#40596b"/><path d="m306.222 306.286c-60.604 59.559-158.824 59.559-218.384-1.045-60.604-59.559-59.559-157.78 1.045-217.339s158.824-59.559 218.384 1.045c59.559 59.56 59.559 157.78-1.045 217.339z" fill="#f2f2f2"/><path d="m275.92 275.984c-43.886 42.841-114.939 42.841-157.78 0-43.886-43.886-42.841-113.894 0-157.78 43.886-42.841 114.939-42.841 157.78 0 43.886 43.886 43.886 113.895 0 157.78z" fill="#84dbff"/><path d="m251.887 251.952c-30.302 30.302-79.412 30.302-109.714 0s-30.302-79.412 0-109.714 79.412-30.302 109.714 0c30.302 30.301 30.302 79.412 0 109.714z" fill="#54c0eb"/><ellipse cx="135.138" cy="159.887" fill="#fff" rx="16.718" ry="16.718"/><ellipse cx="159.992" cy="175.957" fill="#fff" rx="8.359" ry="8.359"/><path d="m388.769 316.735-73.143 71.053 30.302 30.302 72.098-72.098z" fill="#f8b64c"/></svg>                            
          </IconButton>
        </Stack>
        <Stack
          display={{ xs: 'none', lg: 'flex' }}
          direction="row"
          gap={{ lg: 6.25 }}
          alignItems="center"
          flex={'1 1 auto'}
        >
          <Typography variant="h5" component="h5">
            {pathname === '/' ? 'Dashboard' : title}
          </Typography>
          <Box className={`${inputstyle.form} ${inputstyle.searchborder}`}>
              <button>
                  <svg enableBackground="new 0 0 501.944 501.944" viewBox="0 0 501.944 501.944" xmlns="http://www.w3.org/2000/svg"><path d="m377.275 343.903-33.437 33.436-34.481-34.481 33.436-33.437z" fill="#334a5e"/><path d="m486.989 487.054c-19.853 19.853-52.245 19.853-72.098 0l-98.22-98.22 72.098-72.098 98.22 98.22c19.853 19.853 19.853 52.245 0 72.098z" fill="#ffd15c"/><path d="m337.569 57.601c-77.322-76.278-201.665-77.322-278.988 0s-78.367 200.62-1.045 277.943c76.278 77.322 201.665 77.322 278.988 1.045s77.323-201.666 1.045-278.988z" fill="#40596b"/><path d="m306.222 306.286c-60.604 59.559-158.824 59.559-218.384-1.045-60.604-59.559-59.559-157.78 1.045-217.339s158.824-59.559 218.384 1.045c59.559 59.56 59.559 157.78-1.045 217.339z" fill="#f2f2f2"/><path d="m275.92 275.984c-43.886 42.841-114.939 42.841-157.78 0-43.886-43.886-42.841-113.894 0-157.78 43.886-42.841 114.939-42.841 157.78 0 43.886 43.886 43.886 113.895 0 157.78z" fill="#84dbff"/><path d="m251.887 251.952c-30.302 30.302-79.412 30.302-109.714 0s-30.302-79.412 0-109.714 79.412-30.302 109.714 0c30.302 30.301 30.302 79.412 0 109.714z" fill="#54c0eb"/><ellipse cx="135.138" cy="159.887" fill="#fff" rx="16.718" ry="16.718"/><ellipse cx="159.992" cy="175.957" fill="#fff" rx="8.359" ry="8.359"/><path d="m388.769 316.735-73.143 71.053 30.302 30.302 72.098-72.098z" fill="#f8b64c"/></svg>                            
              </button>
              <input className={inputstyle.input} value={searchText} 
                  onChange={(e) => setSearchText(e.target.value)} 
                  placeholder="Search" type="text" required ></input>
              <Tooltip title="reset">
              <IconButton className={inputstyle.reset} type="reset" onClick={resetSearch} size="large" color="inherit" sx={{ p: 0 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
              </IconButton>
              </Tooltip>
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center" gap={{ xs: 1, sm: 1.75 }}>
          <LanguageDropdown />
          <Tooltip title="Notifications">
          <IconButton size="large" color="inherit" sx={{ p: 0, mx: 2}}>
            <Badge badgeContent={9} color="error">
              <svg fill="none" className="h-6 w-6" viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg"><g stroke="#4147d5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="m2.74773 1.00281c-.76522.76522-1.3018 1.71633-1.56578 2.7472m10.02905-2.7472c.7652.76522 1.3018 1.71633 1.5658 2.7472"/><path d="m4.53615 2.77056c.65345-.65345 1.53973-1.02056 2.46385-1.02056.92413 0 1.8104.36711 2.46385 1.02056.65345.65346 1.02055 1.53973 1.02055 2.46386 0 .79667.1408 1.42298.349 1.91258.2089.49119.7838.65876 1.2128.97634.6403.47405.5165 1.48837-.0161 1.88216 0 0-.8599.7445-5.0301.7445-4.17018 0-5.03011-.7445-5.03011-.7445-.53261-.39379-.65641-1.40811-.01607-1.88216.42898-.31758 1.0039-.48515 1.21276-.97634.20819-.4896.34901-1.11591.34901-1.91258 0-.92413.3671-1.8104 1.02056-2.46386z" fill="#d7e0ff"/><path d="m5.76562 12.708c.25285.4714.75037.7921 1.32276.7921.5724 0 1.06991-.3207 1.32276-.7921"/></g></svg>          
            </Badge>
          </IconButton>
          </Tooltip>
          <AccountDropdown /> 
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
