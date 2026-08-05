"use client";
import { client } from '@/lib/apolloClient';
import { gql } from '@apollo/client'
import { AutoAwesome, Checkroom} from '@mui/icons-material';
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React, { useState,useEffect} from 'react'

export default function CategorySidebar({toggleCatSide}:any) {

    const [categories,setCategories] = useState<Category[]>([])

    useEffect(() => {
        getAllCategories()
    },[])

    async function getAllCategories() {
        await client.query<AllCategoriesResponse>({
            query: gql`
            query all{
            allCategories{
            id
            name
            }
            }
            `
        }).then(resp => {
            console.log('Categories',resp.data.allCategories)
            setCategories(resp.data.allCategories)
        }).catch(err => console.log(err))
    }

    function formatText(str:string) {
        return str.split('').join(' ');
    }

    return (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleCatSide(false)}>
        <List>
          {categories.map((category, index) => (
            <ListItem key={category.id} disablePadding>
              <ListItemButton href={"/fashion/clientstore/categories/"+category.id}>
                <ListItemIcon>
                  {index % 2 === 0 ? <AutoAwesome /> : <Checkroom />}
                </ListItemIcon>
                <ListItemText primary={formatText(category.name)} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {categories.map((category, index) => (
              <ListItem key={category.id} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <AutoAwesome /> : <Checkroom />}
                  </ListItemIcon>
                  <ListItemText primary={formatText(category.name)} />
                </ListItemButton>
              </ListItem>
          ))}
        </List>
      </Box>
    );
}
