import { AppBar, Badge, Box, Breadcrumbs, IconButton, Link, Stack, Toolbar, Tooltip, Typography } from '@mui/material';
import React, { MouseEventHandler } from 'react'
import inputstyle from './../../../service-module/global-util/form-input.module.css';
import AccountDropdown from './AccountDropdown';
import LanguageDropdown from './LanguageDropdown';
import { CloseIcon, MenuIcon, NotiBellIcon, SearchIcon } from '@/service/svgIconUtils';
import { URL_ADMIN_PANEL, URL_WEBLOGO } from '@/service/routeHandler';
import { NavigateNextRounded } from '@mui/icons-material';

interface TopbarProps {
  selectedNavItems: string[]
  handleDrawerToggle: MouseEventHandler;
}

export default function Topbar({ selectedNavItems, handleDrawerToggle }: TopbarProps) {

  const drawerWidth = "350";
  const [searchText, setSearchText] = React.useState<string>('')
  const resetSearch = () => {
    setSearchText('');
  }

  return (
    <AppBar
      sx={{
        width: {
          lg: `calc(100% - ${drawerWidth}px + 24px)`
        },
        ml: {
          lg: `${drawerWidth}px`
        },
        backgroundColor: "rgba(255, 255, 255, 0.65)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
        color: 'black'
      }}
    >
      <Toolbar
        sx={{
          p: { md: 1, lg: 3.75 }
        }}
      >
        <Stack direction="row" gap={1}>
          <Link href={URL_ADMIN_PANEL} width={40} height={40} display={{ xs: 'block', lg: 'none' }}>
            <IconButton color="inherit" sx={{ p: 0.75, bgcolor: 'inherit' }}>
              <img src={URL_WEBLOGO} width={30} height={30} />
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
              display: { lg: 'none' },
              bgcolor: 'inherit',
            }}
          >
            <MenuIcon width={64} height={64} />
          </IconButton>
        </Stack>

        <Stack
          direction="row"
          gap={{ lg: 6.25 }}
          flex={'1 1 auto'} // flex-grow=1, flex-shrink=1, flex-basis=auto 
          alignItems="center"
          justifyContent="space-around"
        >
          <Breadcrumbs separator={<NavigateNextRounded fontSize="small" />}
            aria-label="breadcrumb" sx={{ color: "text.primary", pl: 2, fontSize: 20, letterSpacing: 1, 
            display: { xs: 'none', lg: 'flex' } }}>
            {selectedNavItems.length == 0 ?
              <Typography sx={{ fontSize: 20, letterSpacing: 1 }}>Dashboard</Typography>
              :
              selectedNavItems.map(navItem => <Typography sx={{ fontSize: 20, letterSpacing: 1 }}>{navItem}</Typography>)
            }
          </Breadcrumbs>

          <Box className={`${inputstyle.form} ${inputstyle.searchborder}`}>
            <SearchIcon />
            <input className={inputstyle.input} value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search" type="text" required ></input>
            <Tooltip title="reset">
              <IconButton className={inputstyle.reset} type="reset" onClick={resetSearch} size="large" color="inherit" sx={{ p: 0 }}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Box>

        </Stack>
        <Stack direction="row" alignItems="center" gap={{ xs: 1, sm: 1.75 }}>

          <LanguageDropdown />

          <Tooltip title="Notifications">
            <IconButton size="large" color="inherit">
              <Badge badgeContent={9} color="error">
                <NotiBellIcon width={25} height={25} />
              </Badge>
            </IconButton>
          </Tooltip>

          <AccountDropdown />

        </Stack>
      </Toolbar>
    </AppBar>
  )
}
