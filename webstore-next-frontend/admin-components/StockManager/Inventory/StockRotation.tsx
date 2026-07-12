"use client"
import { client } from '@/lib/apolloClient';
import { gql } from '@apollo/client'
import { Box, Card, CardActionArea, CardContent, IconButton, Stack, Typography } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function StockRotation() {

    useEffect(() => {
        getCategories();
    },[])

    const [categories, setCategories] = React.useState<Category[]>([]);
    const router = useRouter();
    const location = usePathname();

    async function getCategories() {
        await client.query({
            query: gql`
            query allCat{
            allCategories{
            id
            name
            }
            }
            `,fetchPolicy:'network-only' // refresh graphql cache -> fetch new data
        }).then(resp => setCategories(resp.data.allCategories))
        .catch(err => console.log(err))
    }

  return (
    <>
    <Box sx={{ width:"100%" }}>
      <Box sx={{ gridColumn: "span 2" , mb: 5}}> 
        <Typography variant='h3' >Stock Categories</Typography>
        <Typography variant='h5' fontSize={17} >Click To Add Stock...</Typography>
      </Box>
      <Box> 
        <Stack direction={{ md: 'row' }} justifyContent={{ sm: 'space-between' }} gap={3.75}>
        <Card 
            sx={(theme) => ({
            boxShadow: theme.shadows[4],
            width: 1,
            height: 'auto',
            borderRadius: "1rem",
            borderWidth: "2.5px",
            borderColor: "royalblue",
            borderStyle: "dashed",
            display:"flex"
            })}
        >
            <CardActionArea onClick={() => router.push(`${location}/0`)}>
            <CardContent
            sx={{
                flex: '1 1 auto',
                padding: 1,
                ':last-child': {
                paddingBottom: 0,
                }, textAlign: "center",
            }}
            >
                <IconButton size="large" color="inherit" //onClick={newFilterSlot}
                  sx={{ p: 0, transition: 'transform 0.2s', '&:hover': {transform: 'scale(1.2)'} }}>
                <svg fill="none" width={30} height={30} viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg"><path d="m.959867 10.5185c.154133 1.4407 1.312833 2.5994 2.752793 2.7599 1.06955.1192 2.16771.2216 3.28734.2216s2.21779-.1024 3.2873-.2216c1.44-.1605 2.5987-1.3192 2.7528-2.7599.1138-1.06348.2099-2.15535.2099-3.2685 0-1.11316-.0961-2.20502-.2099-3.26853-.1541-1.44065-1.3128-2.59936-2.7528-2.75986-1.06951-.11922-2.16767-.22161-3.2873-.22161s-2.21779.10239-3.28734.22161c-1.43996.1605-2.59866 1.31921-2.752793 2.75986-.113784 1.06351-.209867 2.15537-.209867 3.26853 0 1.11315.096084 2.20502.209867 3.2685z" fill="#d7e0ff"/><g fill="#4147d5"><path d="m10.2873 13.2784-.083-.7454zm-6.57464-12.05679.08308.74538zm3.28734 11.52839c-1.0766 0-2.14116-.0985-3.20426-.217l-.16617 1.4908c1.076.1199 2.20777.2262 3.37043.2262zm3.2043-.217c-1.06314.1185-2.12769.217-3.2043.217v1.5c1.16266 0 2.29443-.1063 3.3704-.2262zm3.5816-1.9347c.1145-1.07069.2141-2.19435.2141-3.3483h-1.5c0 1.07236-.0926 2.13242-.2056 3.1887zm.2141-3.3483c0-1.15395-.0996-2.27761-.2141-3.34832l-1.4915.15958c.113 1.05631.2056 2.11638.2056 3.18874zm-7-5.5c1.07661 0 2.14116.09849 3.2043.21699l.1661-1.490765c-1.07597-.119935-2.20774-.226225-3.3704-.226225zm-3.20426.21699c1.0631-.1185 2.12766-.21699 3.20426-.21699v-1.5c-1.16266 0-2.29443.10629-3.37043.226225zm-3.581617 1.93469c-.114553 1.07071-.214123 2.19436-.214123 3.34832h1.5c0-1.07236.0926-2.13243.20561-3.18874zm-.214123 3.34832c0 1.15395.0995702 2.27761.214123 3.3483l1.491487-.1596c-.11301-1.05628-.20561-2.11634-.20561-3.1887zm13.7859-3.34832c-.1918-1.79214-1.6275-3.226163-3.4155-3.425455l-.1661 1.490765c1.0919.12172 1.9736 1.00512 2.0901 2.09427zm-3.4155 10.12212c1.788-.1993 3.2237-1.6333 3.4155-3.4255l-1.4915-.1596c-.1165 1.0892-.9982 1.9726-2.0901 2.0943zm-6.74083-13.547575c-1.78794.199292-3.223709 1.633315-3.415447 3.425455l1.491487.15958c.11653-1.08916.99817-1.97255 2.09013-2.09427zm.16617 12.056775c-1.09196-.1217-1.9736-1.0051-2.09013-2.0943l-1.491487.1596c.191739 1.7922 1.627507 3.2262 3.415447 3.4255z"/><path d="m7.75 4.75c0-.41421-.33579-.75-.75-.75s-.75.33579-.75.75zm-1.5 5c0 .4142.33579.75.75.75s.75-.3358.75-.75zm0-5v5h1.5v-5z"/><path d="m9.5 8c.41421 0 .75-.33579.75-.75s-.33579-.75-.75-.75zm-5-1.5c-.41421 0-.75.33579-.75.75s.33579.75.75.75zm5 0h-5v1.5h5z"/></g></svg>                
                </IconButton>
                <Typography variant='subtitle1'>Add New Category.</Typography>
            </CardContent>
            </CardActionArea>
        </Card>
            {categories?.map((category) => (
                <Card key={category.id} 
                sx={(theme) => ({
                boxShadow: theme.shadows[4],
                width: 1,
                height: 'auto',
                borderRadius: "1rem",
                display:"flex"
                })}
            >
                <CardActionArea onClick={() => router.push(`${location}/${category.id}`)}>
                <CardContent
                sx={{
                    flex: '1 1 auto',
                    padding: 1,
                    ':last-child': {
                    paddingBottom: 0,
                    },
                }}
                >
                <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap">
                    <Typography variant="subtitle1" component="p" minWidth={100} color="text.primary">
                    {category.name}
                    </Typography>
                    <Typography variant="body2" component="p" color="text.secondary">
                    125 pcs.
                    </Typography>
                </Stack>
                <Typography variant="body1" component="p" color="text.secondary">
                    345,000 yen
                </Typography>
                <Typography
                    variant="body2"
                    color="primary.main"
                    display="flex"
                    alignItems="center"
                    gap={1}
                    whiteSpace={'nowrap'}
                >
                    {/* <TrendingUpRounded/>
                    {`+${increment}%`} last month */}
                </Typography>
                </CardContent>
                </CardActionArea>
                </Card>
                ))}
        </Stack>
      </Box>
    </Box>
    
    
    </>
    
  )
}
