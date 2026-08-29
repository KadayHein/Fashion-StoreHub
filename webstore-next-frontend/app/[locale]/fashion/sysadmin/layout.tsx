"use client";
import Sidebar from '@/admin-components/Navigators/Sidebar/Sidebar';
import Topbar from '@/admin-components/Navigators/Topbar/Topbar'
import { Box, Drawer, Stack } from '@mui/material';
import React, { useState } from 'react'

interface AdminContextType {
    selectedNavItems : string[]
    setSelectedNavItems : React.Dispatch<React.SetStateAction<string[]>>
}

export const AdminContext = React.createContext<AdminContextType | undefined>(undefined);

export const useAdminContext = () => {
    const context = React.useContext(AdminContext);
    if (!context) {
      throw new Error("useAdminContext must be used in component within AdminContext.Provider");
    }
    return context;
  };

export default function AdminLayout({ children }:LayoutProps<'/[locale]/fashion/sysadmin'>) {

  const [selectedNavItems, setSelectedNavItems] = useState<string[]>([])
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
    <AdminContext.Provider value={{selectedNavItems, setSelectedNavItems}}>
      <Stack direction="row" minHeight="100vh" bgcolor="background.default">
        <Topbar selectedNavItems={selectedNavItems} handleDrawerToggle={handleDrawerToggle} />
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
            <Sidebar handleDrawerClose={handleDrawerClose}/>
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
            mt: { xs: 8, lg : 13 },
            p: 4,
            width: 1
          }}
        >
          {children}
        </Box>
      </Stack>
      {/* <Footer /> */}
    </AdminContext.Provider>
  )
}
