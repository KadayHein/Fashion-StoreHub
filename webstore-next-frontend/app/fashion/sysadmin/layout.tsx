"use client";
import Sidebar from '@/admin-components/Navigators/Sidebar/Sidebar';
import Topbar from '@/admin-components/Navigators/Topbar/Topbar'
import NotiAlert from '@/system-animators/NotiAlert';
import { Box, Drawer, Stack } from '@mui/material';
import React, { useState } from 'react'

interface AdminContextType {
    notibox : {status: string, show: boolean, timeout: number, message: string},
    setNotibox : React.Dispatch<React.SetStateAction<{status: string, show: boolean, timeout: number, message: string}>>
}

export const AdminContext = React.createContext<AdminContextType | undefined>(undefined);

export const useAdminContext = () => {
    const context = React.useContext(AdminContext);
    if (!context) {
      throw new Error("useAdminContext must be used in component within AdminContext.Provider");
    }
    return context;
  };

export default function AdminLayout({ children }:LayoutProps<'/fashion/sysadmin'>) {

  const [notibox, setNotibox] = React.useState({status:"error", show:false, timeout:1000, message: "Alert Message!"});
  const drawerWidth = 350;
  const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
  
    const handleDrawerClose = () => {
      setIsClosing(true);
      setMobileOpen(false);
    };
  
    const handleDrawerTransitionEnd = () => {
      setIsClosing(false);
    };

    const handleDrawerToggle = () => {
      if (!isClosing) {
        setMobileOpen(!mobileOpen);
      }
    };
    
    // async function getCartSize(){
    //     await client.query({
    //         query: gql`
    //         query {
    //         cartSize
    //         }
    //         `
    //     }).then(resp => setCartSize(resp.data.cartSize))
    // }

  return (
    <AdminContext.Provider value={{notibox, setNotibox}}>
      <Stack direction="row" minHeight="100vh" bgcolor="background.default">
        <Topbar handleDrawerToggle={handleDrawerToggle} />
        <Box
          component="nav"
          sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', lg: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                border: 0,
                backgroundColor: 'background.default',
              },
            }}
          >
            <Sidebar />
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', lg: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                border: 0,
                backgroundColor: 'background.default',
              },
            }}
            open
          >
            <Sidebar />
          </Drawer>
        </Box>
        <Box
          sx={{
            pt: 12, pr: 5,
            width: 1,
            pb: 0,
          }}
        >
          {children}
        </Box>
      </Stack>
      <NotiAlert notibox={notibox} setNotibox={setNotibox}/>
      {/* <Footer /> */}
    </AdminContext.Provider>
  )
}
