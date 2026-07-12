"use client";
import ImageUploader from '@/base-components/uploader/ImageUploader';
import { client } from '@/lib/apolloClient';
import NotiAlert from '@/system-animators/NotiAlert';
import { gql } from '@apollo/client';
import { SaveAsRounded } from '@mui/icons-material';
import { Autocomplete, Box, Button, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

type ProductUploadDTO = {
  id: number
  code: string
  name: string
  imageUrl: string
  price: number
  quantity: number
  discount: number
  genre_id: number
  validated: boolean
}

export default function page() {
    const params = useParams<{category: string}>();
    const [availableCategories,setAvailableCategories] = React.useState<Category[]>([]);
    const [availableGenres,setAvailableGenres] = React.useState<Genre[]>([]);
    const [activeCtg, setActiveCtg] = React.useState<number | null>(parseInt(params.category));
    const [activeGrn, setActiveGrn] = React.useState<number | null>(null);
    const [notibox, setNotibox] = React.useState({status:"error", show:false, timeout:1000, message: "Alert Message!"});

    useEffect(() => {
      getAllCategoriesGenres();
    },[])

    const [product, setProduct] = React.useState<ProductUploadDTO>({
      imageUrl:"",
      code:"",
      discount:0,
      price:0,
      quantity:0,
      genre_id:1,
      name:"",
      id:0,
      validated:false
    });

    const handleFormValue = (e : React.ChangeEvent<HTMLInputElement>) => {
      setProduct({
        ...product, 
        [e.target.name] : e.target.value
      })
    }

    const openNoti = (status: string) => {
      setNotibox({
        status: status,
        show: true, 
        timeout: 3000, 
        message: status == "success" ? "Product Uploaded Successfully!" : "Failed To Upload Product!"
      })
    };

    const uploadProduct = () => {
      if (product.validated) return;
      setProduct({
        ...product, 
        validated : true,
      });
    }

    // This callback will be triggered after upload is complete
    const handleImageUploaded = async (url: string) => {
      setProduct(prev => ({ ...prev, 
        imageUrl: url,
        genre_id: activeGrn!
      }));
      await saveProduct(url);
    }

    async function saveProduct(url:string){
      console.log("genre-id:"+product);
      await client.mutate({
          mutation: gql`
          mutation upload{
            uploadProduct(product : {
              imageUrl: "${url}",
              code: "${product.code}",
              name: "${product.name}",
              price: ${product.price},
              quantity: ${product.quantity},
              genre_id: ${product.genre_id}
            })
          }
          `}
      ).then(resp => openNoti("success")
      ).catch(err => openNoti("error"))
    }

    async function getAllCategoriesGenres () {
      await client.query<AllCategoriesResponse>({
        query: gql`
        query {
          allCategories {
            id,
            name,
            genres {name}
          }
        }
        `
      }).then(resp => {
          setAvailableCategories(resp.data.allCategories);
      })
    }

    const responsiveSize = { xs: 12, sm: 12, md: 6, lg: 6 }

    const onChangeCategory = (event: React.SyntheticEvent<Element, Event>,
      newSelection: { id: number; name: string } | null
    ) => {
      if (!newSelection) return;
      setActiveCtg(newSelection.id);
      const found = availableCategories.find(c => c.id === newSelection.id);
      setAvailableGenres(found?.genres ?? []);
      setActiveGrn(found?.genres?.at(0)?.id!);
    };

    const onChangeGenre = (event : React.SyntheticEvent<Element, Event>, 
      newSelection : {id: number; name: string;} | null) => {
        setActiveGrn(newSelection?.id!);
    }
  return (
    <Box sx={{display: {xs: "inline", sm: "flex"}}}>

    <ImageUploader formValidated={product.validated} 
    folderPath={`${activeCtg}/${product.genre_id}`}
    setImageUrl={handleImageUploaded}/>

    <Box sx={{display: 'flex', flexDirection: "column", mx:5}}>
      <Grid container spacing={2} sx={{my:3}}>
        <Grid size={responsiveSize} >
          <Autocomplete
            disablePortal 
            options={availableCategories}
            getOptionLabel={(option) => option.name}
            value={availableCategories.find(c => c.id === activeCtg) ?? null}
            onChange={onChangeCategory}
            isOptionEqualToValue={(option, value) => option.id === value.id} 
            renderInput={(params) => 
            <TextField {...params} label="Choose a Category" required/>}
          />
        </Grid>
        <Grid size={responsiveSize}>
          <Autocomplete
            disablePortal
            options={availableGenres}
            getOptionLabel={(option) => option.name}
            value={availableGenres.find(g => g.id === activeGrn) ?? null}
            onChange={onChangeGenre}
            isOptionEqualToValue={(option, value) => option.id === value.id} 
            renderInput={(params) => 
            <TextField {...params} label="Choose a Genre" required/>}
          />
        </Grid>
        <Grid size={responsiveSize}>
          <TextField
            required fullWidth 
            id="pname" label="Product Name" 
            name='name' onChange={handleFormValue} value={product?.name}
          />
        </Grid>
        <Grid size={responsiveSize}>
          <TextField
            required fullWidth 
            id="pcode" label="Product Code"
            name='code' onChange={handleFormValue} value={product?.code}
          />
        </Grid>
        <Grid size={responsiveSize}>
          <FormControl fullWidth>
          <InputLabel htmlFor="outlined-adornment-price">Price</InputLabel>
          <OutlinedInput
            name='price' onChange={handleFormValue} value={product?.price}
            id="outlined-adornment-price" 
            startAdornment={<InputAdornment position="start">MMK</InputAdornment>}
            label="Price" required
          />
          </FormControl>
        </Grid>
        <Grid size={responsiveSize}>
          <FormControl fullWidth>
          <InputLabel htmlFor="outlined-adornment-quantity">Quantity</InputLabel>
          <OutlinedInput
            name='quantity' onChange={handleFormValue} value={product?.quantity}
            id="outlined-adornment-quantity"
            endAdornment={<InputAdornment position="end">pcs</InputAdornment>}
            label="Quantity" required 
          />
        </FormControl>
        </Grid>
      </Grid>
      <Button variant="contained" endIcon={<SaveAsRounded />} sx={{mt:"auto", mx: 5, mb: 2}}
       onClick={uploadProduct}>Save</Button>
    </Box>
    <NotiAlert notibox={notibox} setNotibox={setNotibox}/>
  

    </Box>

    
  )
}
