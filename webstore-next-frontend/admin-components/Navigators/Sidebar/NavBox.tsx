import { NavItem } from '@/admin-components/data/Outfit-Hub/nav-items';
import { ArrowDropDownRounded, ArrowDropUpRounded, ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Link from 'next/link';

interface NavItemProps {
  navItem: NavItem;
}

export default function NavBox({ navItem }: NavItemProps) {

    const router = useRouter();
    const pathname = usePathname();
    const system = "/fashion/sysadmin";
    const [checked, setChecked] = useState(false);
    const [nestedChecked, setNestedChecked] = useState<boolean[]>([]);
  
    const handleNestedChecked = (index: any, value: boolean) => {
      const updatedBooleanArray = [...nestedChecked];
      updatedBooleanArray[index] = value;
      setNestedChecked(updatedBooleanArray);
    };

    const urlActivate = (url : string) => router.push(url);

    const isCurrentPath = (componentPath : string) => {
      return pathname == componentPath;
    }

  return (
    <>
    {
      navItem.collapsible ?
      <Box sx={{borderRadius:"1em", "&:hover" : {backgroundColor : "action.focus"}}}>
      <ListItemButton onClick={() => setChecked(!checked)} sx={{borderRadius:"1em"}}>
        <ListItemIcon>
          {navItem.icon && <navItem.icon />}
        </ListItemIcon>
        <ListItemText primary={navItem.title} />
        {checked ? <ArrowDropUpRounded sx={{ fontSize : "2rem" , pl:0.5 }}/> : <ArrowDropDownRounded sx={{ fontSize : "2rem" , pl:0.5  }}/>}
      </ListItemButton>
      <Collapse in={checked} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        {navItem.sublist?.map((subListItem: NavItem, idx: number) => (
          subListItem.collapsible ?
          <Box key={idx} sx={{ borderRadius:"1em" , "&:hover" : {backgroundColor : "action.focus"}}}>
          <ListItemButton onClick={() => handleNestedChecked(idx, !nestedChecked[idx])} sx={{pl: 8 , borderRadius:"1em"}}>
            <ListItemText primary={subListItem.title} />
            {nestedChecked[idx] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={nestedChecked[idx]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subListItem?.sublist?.map(
              (nestedSubListItem: NavItem, nestedIdx: number) => (
                <ListItem key={nestedIdx} disablePadding sx={{m:0}}>
                  <ListItemButton key={nestedIdx} 
                  sx={{pl: 8 , borderRadius:"1em", 
                    // backgroundColor: isCurrentPath(`${system}/${navItem.path}/${subListItem.path}/${nestedSubListItem.path}`) ? "black" : "white",
                    // color: isCurrentPath(`${system}/${navItem.path}/${subListItem.path}/${nestedSubListItem.path}`) ? "white" : "black",
                  }}
                  onClick={() => urlActivate(`${system}/${navItem.path}/${subListItem.path}/${nestedSubListItem.path}`)}>
                    <ListItemText primary={nestedSubListItem.title} />
                  </ListItemButton>
                </ListItem>
              ),
            )}
          </List>
          </Collapse>
        </Box>
      :
        <ListItemButton key={idx} onClick={() => urlActivate(`${system}/${navItem.path}/${subListItem.path}`)}
          sx={{pl: 8 , borderRadius:"1em", 
            // backgroundColor: isCurrentPath(`${system}/${navItem.path}/${subListItem.path}`) ? "black" : "white",
            // color: isCurrentPath(`${system}/${navItem.path}/${subListItem.path}`) ? "white" : "black",
          }}
          >
        <ListItemText primary={subListItem.title} />
        </ListItemButton>
        ))}
        </List>
      </Collapse>
      </Box>

      :<ListItemButton onClick={()=> urlActivate(`${system}/${navItem.path}`)} sx={{borderRadius:"1em", "&:hover" : {backgroundColor : "action.focus"},
          // backgroundColor: isCurrentPath(`${system}/${navItem.path}`) ? "black" : "white",
          // color: isCurrentPath(`${system}/${navItem.path}`) ? "white" : "black"
        }}>
        <ListItemIcon>
          {navItem.icon && <navItem.icon />}
        </ListItemIcon>
        <ListItemText primary={navItem.title} />
      </ListItemButton>
    }
    </>
  )
}
