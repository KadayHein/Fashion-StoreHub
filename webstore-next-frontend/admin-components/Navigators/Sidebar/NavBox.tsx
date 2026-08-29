import { NavItem } from '@/admin-components/data/admin_panel/nav-items';
import { ArrowDropDownRounded, ArrowDropUpRounded, ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Chip, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useRouter } from '@/i18n/navigation';
import React, { useState } from 'react'
import { URL_ADMIN_PANEL, URL_BETA } from '@/service/routeHandler';

interface NavBoxProps {

  navItem: NavItem;
  handleDrawerClose?: () => void;

  isSelected: (title: string) => boolean
  checked: boolean;

  onToggle: () => void;
  setSelectedNavItems: React.Dispatch<React.SetStateAction<string[]>>
}

export default function NavBox({
  navItem,
  handleDrawerClose,
  isSelected,
  checked,
  onToggle,
  setSelectedNavItems
}: NavBoxProps) {

  const router = useRouter();

  const redirect2beta = () => router.push(URL_BETA);
  const urlActivate = (url: string) => router.push(url);

  const [nestedChecked, setNestedChecked] = useState<boolean[]>([]);

  const handleNestedChecked = (index: any, value: boolean) => {
    const updatedBooleanArray = [...nestedChecked];
    updatedBooleanArray[index] = value;
    setNestedChecked(updatedBooleanArray);
  };

  const selectedUI = (navItem: NavItem) => {
    return {
      borderRadius: "1em",
      backgroundColor: isSelected(navItem.title)
        ? "black"
        : "transparent",
      color: isSelected(navItem.title)
        ? "white"
        : "inherit",

      "&:hover": {
        backgroundColor: isSelected(navItem.title)
          ? "black"
          : "action.focus"
      },

      "& .MuiListItemIcon-root": {
        color: "inherit"
      }
    }
  }

  const betaBadge = (
    <Chip
      label="Beta"
      size="small"
      color="warning"
      sx={{
        ml: 1,
        height: 20,
        fontSize: "0.65rem",
        fontWeight: 700
      }}
    />
  )

  return (
    <>
      {
        navItem.collapsible ?
          <Box sx={{ borderRadius: "1em", "&:hover": { backgroundColor: "action.focus" } }}>
            <ListItemButton onClick={onToggle} sx={{ borderRadius: "1em" }}>
              <ListItemIcon>
                {navItem.icon && <navItem.icon />}
              </ListItemIcon>
              <ListItemText primary={navItem.title} />
              {checked ? <ArrowDropUpRounded sx={{ fontSize: "2rem", pl: 0.5 }} /> : <ArrowDropDownRounded sx={{ fontSize: "2rem", pl: 0.5 }} />}
            </ListItemButton>
            <Collapse in={checked} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {navItem.sublist?.map((subListItem: NavItem, idx: number) => (
                  subListItem.collapsible ?
                    <Box key={idx} sx={{ borderRadius: "1em", "&:hover": { backgroundColor: "action.focus" } }}>
                      <ListItemButton onClick={() => handleNestedChecked(idx, !nestedChecked[idx])} sx={{ pl: 8, borderRadius: "1em" }}>
                        <ListItemText primary={subListItem.title} />
                        {nestedChecked[idx] ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={nestedChecked[idx]} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {subListItem?.sublist?.map(
                            (nestedSubListItem: NavItem, nestedIdx: number) => (
                              <ListItem key={nestedIdx} disablePadding sx={{ m: 0 }}>
                                <ListItemButton key={nestedIdx}
                                  sx={{
                                    pl: 8, borderRadius: "1em",
                                    ...selectedUI(nestedSubListItem)
                                  }}
                                  onClick={() => {
                                    setSelectedNavItems([navItem.title, subListItem.title, nestedSubListItem.title])
                                    nestedSubListItem.path === "_beta" ? redirect2beta()
                                      : urlActivate(`${URL_ADMIN_PANEL}/${navItem.path}/${subListItem.path}/${nestedSubListItem.path}`)
                                    handleDrawerClose && handleDrawerClose()
                                  }}>
                                  <ListItemText primary={nestedSubListItem.title} />
                                  {nestedSubListItem.path === "_beta" && betaBadge}
                                </ListItemButton>
                              </ListItem>
                            ),
                          )}
                        </List>
                      </Collapse>
                    </Box>
                    :
                    <ListItemButton key={idx} onClick={() => {
                      setSelectedNavItems([navItem.title, subListItem.title])
                      subListItem.path === "_beta" ? redirect2beta()
                        : urlActivate(`${URL_ADMIN_PANEL}/${navItem.path}/${subListItem.path}`)
                      handleDrawerClose && handleDrawerClose()
                    }}
                      sx={{
                        pl: 8, borderRadius: "1em",
                        ...selectedUI(subListItem)
                      }}
                    >
                      <ListItemText primary={subListItem.title} />
                      {subListItem.path === "_beta" && betaBadge}
                    </ListItemButton>
                ))}
              </List>
            </Collapse>
          </Box>

          : <ListItemButton onClick={() => {
            setSelectedNavItems([navItem.title])
            navItem.path === "_beta" ? redirect2beta()
              : urlActivate(`${URL_ADMIN_PANEL}/${navItem.path}`)
            handleDrawerClose()
          }}
            sx={{
              borderRadius: "1em", "&:hover": { backgroundColor: "action.focus" },
              ...selectedUI
            }}>
            <ListItemIcon>
              {navItem.icon && <navItem.icon />}
            </ListItemIcon>
            <ListItemText primary={navItem.title} />
            {navItem.path === "_beta" && betaBadge}
          </ListItemButton>
      }
    </>

    /*<>
      {
        navItem.collapsible ?
          <Box sx={{ borderRadius: "1em", "&:hover": { backgroundColor: "action.focus" } }}>
            <ListItemButton onClick={() => setChecked(!checked)} sx={{ borderRadius: "1em" }}>
              <ListItemIcon>
                {navItem.icon && <navItem.icon />}
              </ListItemIcon>
              <ListItemText primary={navItem.title} />
              {checked ? <ArrowDropUpRounded sx={{ fontSize: "2rem", pl: 0.5 }} /> : <ArrowDropDownRounded sx={{ fontSize: "2rem", pl: 0.5 }} />}
            </ListItemButton>
            <Collapse in={checked} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {navItem.sublist?.map((subListItem: NavItem, idx: number) => (
                  subListItem.collapsible ?
                    <Box key={idx} sx={{ borderRadius: "1em", "&:hover": { backgroundColor: "action.focus" } }}>
                      <ListItemButton onClick={() => handleNestedChecked(idx, !nestedChecked[idx])} sx={{ pl: 8, borderRadius: "1em" }}>
                        <ListItemText primary={subListItem.title} />
                        {nestedChecked[idx] ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={nestedChecked[idx]} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {subListItem?.sublist?.map(
                            (nestedSubListItem: NavItem, nestedIdx: number) => (
                              <ListItem key={nestedIdx} disablePadding sx={{ m: 0 }}>
                                <ListItemButton key={nestedIdx}
                                  sx={{
                                    pl: 8, borderRadius: "1em",
                                    ...selectedUI(nestedSubListItem)
                                  }}
                                  onClick={() => {
                                    setSelectedNavItems([navItem.title, subListItem.title, nestedSubListItem.title])
                                    nestedSubListItem.path === "_beta" ? redirect2beta()
                                      : urlActivate(`${URL_ADMIN_PANEL}/${navItem.path}/${subListItem.path}/${nestedSubListItem.path}`)
                                    handleDrawerClose && handleDrawerClose()
                                  }}>
                                  <ListItemText primary={nestedSubListItem.title} />
                                  {nestedSubListItem.path === "_beta" && betaBadge}
                                </ListItemButton>
                              </ListItem>
                            ),
                          )}
                        </List>
                      </Collapse>
                    </Box>
                    :
                    <ListItemButton key={idx} onClick={() => {
                      setSelectedNavItems([navItem.title, subListItem.title])
                      subListItem.path === "_beta" ? redirect2beta()
                        : urlActivate(`${URL_ADMIN_PANEL}/${navItem.path}/${subListItem.path}`)
                      handleDrawerClose && handleDrawerClose()
                    }}
                      sx={{
                        pl: 8, borderRadius: "1em",
                        ...selectedUI(subListItem)
                      }}
                    >
                      <ListItemText primary={subListItem.title} />
                      {subListItem.path === "_beta" && betaBadge}
                    </ListItemButton>
                ))}
              </List>
            </Collapse>
          </Box>

          : <ListItemButton onClick={() => {
            setSelectedNavItems([navItem.title])
            navItem.path === "_beta" ? redirect2beta()
              : urlActivate(`${URL_ADMIN_PANEL}/${navItem.path}`)
            handleDrawerClose()
          }}
            sx={{
              borderRadius: "1em", "&:hover": { backgroundColor: "action.focus" },
              ...selectedUI
            }}>
            <ListItemIcon>
              {navItem.icon && <navItem.icon />}
            </ListItemIcon>
            <ListItemText primary={navItem.title} />
            {navItem.path === "_beta" && betaBadge}
          </ListItemButton>
      }
    </>*/
  )
}
