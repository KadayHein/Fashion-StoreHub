import { Avatar, IconButton, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import React from 'react'
import navItems from '@/admin-components/data/Outfit-Hub/nav-items';
import NavBox from './NavBox';

export default function Sidebar() {
    const barwidth = 270;
    return (
        <Stack
          justifyContent="space-between"
          bgcolor="background.paper"
          height={1}
          boxShadow={(theme) => theme.shadows[4]}
          sx={{
            overflow: 'hidden',
            margin: { xs: 0, lg: 3.75 },
            borderRadius: { xs: 0, lg: 5 },
            '&:hover': {
              overflowY: 'auto',
            },
            width: barwidth,
          }}
        >
          <Link
            href="/fashion/sysadmin/dashboard"
            sx={{
              position: 'fixed',
              zIndex: 5,
              mt: 6.25,
              mx: 2,
              mb: 3.75,
              bgcolor: 'background.paper',
              textDecoration: "none", color: "inherit",
              borderRadius: 5,
            }}
          >
          <div className="flex justify-around items-center">
          <IconButton sx={{ marginRight: 1 }}>
            <Avatar alt="Store Logo" src="/images/cclogo.png" />
          </IconButton>
          <Typography variant="h5">Admin Hub.</Typography>
          </div>
          </Link>
          <Stack
            justifyContent="space-between"
            mt={16.25}
            height={1}
            sx={{
              overflow: 'hidden',
              '&:hover': {
                overflowY: 'auto',
              },
              width: barwidth,
            }}
          >
            <List
              sx={{
                mx: 2.5,
                py: 1.25,
                flex: '1 1 auto',
                width: 230,
              }}
            >
              {navItems.map((navItem, index) => (
                <NavBox key={index} navItem={navItem} />
              ))}
            </List>
            <List sx={{mx: 2.5}}>
              <ListItem
                sx={{
                  mx: 0,
                  my: 2.5,
                }}
              >
                <ListItemButton LinkComponent={Link} href="/" 
                sx={{borderRadius:"1em", "&:hover" : {backgroundColor : "action.focus"}}}>
                  <ListItemIcon>
                    <svg fill="none" height="30" viewBox="0 0 48 48" width="30" xmlns="http://www.w3.org/2000/svg"><path d="m6.70595 4.69844c-1.79894.21351-3.12126 1.50989-3.38007 3.30286-.38834 2.6904-.83369 7.6493-.83369 16.2438 0 7.7675.20209 12.5654.40025 15.4029.15694 2.2474 1.75885 3.9689 4.00032 4.1947 2.09609.2111 5.20724.4024 9.59944.4024s7.5033-.1913 9.5994-.4024c2.2415-.2258 3.8434-1.9473 4.0003-4.1947.1982-2.8375.4003-7.6354.4003-15.4029s-.2021-12.5654-.4003-15.40291c-.1569-2.24734-1.7588-3.96886-4.0003-4.19464-2.0961-.21113-5.2072-.40243-9.5994-.40243-4.7431 0-7.84643.22309-9.78625.45332z" fill="#a6cfff"/><path d="m37.8963 33.3948c-1.5092 1.2701-3.3735.4385-3.4835-1.5381-.0609-1.0945-.1141-2.4749-.146-4.2047-8.5544-.0865-15.2156-.2878-18.3328-.3961-1.0851-.0377-1.934-.9343-1.934-2.0269v-2.2444c0-1.0762.8242-1.9647 1.8922-2.0205 3.0992-.1619 9.7816-.4659 18.3742-.5963.0318-1.7388.0852-3.1255.1463-4.2241.11-1.977 1.9749-2.8087 3.4844-1.5383.8995.757 2.0084 1.7393 3.3435 3.0025 2.238 2.1175 3.5227 3.709 4.2488 4.7743.6809.9988.6808 2.2359-.0001 3.2347-.7262 1.0652-2.0109 2.6566-4.2487 4.7743-1.3355 1.2638-2.4447 2.2465-3.3443 3.0036z" fill="#1575e5"/></svg>
                  </ListItemIcon>
                  <ListItemText primary="Log out" />
                </ListItemButton>
                
              </ListItem>
            </List>
          </Stack>
        </Stack>
      );
}
