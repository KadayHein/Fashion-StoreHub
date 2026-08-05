"use client";
import { client } from '@/lib/apolloClient';
import { gql } from '@apollo/client';
import React, { useEffect } from 'react'
import ItemPopup from '../info-details/ItemPopup';
import boxstyle from '../../service-module/global-util/showroom-layout.module.css'
import inputstyle from '../../service-module/global-util/form-input.module.css'
import textstyle from '../../service-module/global-util/text-style.module.css'
import { IconButton, Tooltip, Typography } from '@mui/material';
import FilterOptionPopover from '@/base-components/filterset/FilterOptionPopover';
import FilterOptionDetailsList from '@/base-components/filterset/FilterOptionDetailsList';
import { DataType } from '@/types/enum';

export default function ShowRoom({catId}:any) {

    const [catName,setCatName] = React.useState<string>('')
    const [genreName,setGenreName] = React.useState<string>('')
    const [genres,setGenres] = React.useState<Genre[]>([])
    const [activeGenreId,setActiveGenreId] = React.useState<number>(0)
    const [onFilter,setOnFilter] = React.useState<boolean>(false)
    const [products,setProducts] = React.useState<Product[]>([])
    const [selectedProduct,setSelectedProduct] = React.useState<Product>()
    const [searchText,setSearchText] = React.useState<string>('')
    const [filterDataset,setFilterDataset] = React.useState<FilterDataset>({ filterList: [] })
    const [filterAnchor, setFilterAnchor] = React.useState<HTMLButtonElement | null>(null)

    const filterOptions : FilterOption[] = [
    { optionid: "1", caption: "Product Name", fieldname : "name", datatype: DataType.STRING },
    { optionid: "2", caption: "Price", fieldname : "price", datatype: DataType.NUMBER },
    ]   

    useEffect(() => {
        ShowCategoryAndGenres()
    },[])

    useEffect(() => {
        if(activeGenreId) ShowProductsByGenreId(activeGenreId)
    },[activeGenreId])

    useEffect(() => {
        if (genres.length > 0) setActiveGenreId(genres[0].id);
    },[genres]);

    async function ShowCategoryAndGenres(){
    await client.query<CategoryAndGenresResponse>({
        query: gql`
        query {
         categoryById(id: ${catId}){name}
         genresByCategoryId(id: ${catId}){id,name}
        }
        `
    }).then(resp => {
        setCatName(resp.data.categoryById.name)
        setGenres(resp.data.genresByCategoryId)
    })
    .catch(err => console.log(err))
    }

    async function ShowProductsByGenreId(id : number) {
        await client.query<ProductsByGenreIdResponse>({
            query: gql`
            query {
            productsByGenreId(id: ${id}){
                id
                name
                imageUrl
                price
            }
            }
            `
        }).then(resp => {
            setProducts(resp.data.productsByGenreId);
        })
    }

    const onchangeGenre = (id : number, name : string) => {
        setGenreName(name)
        setActiveGenreId(id);
    }

    const [open, setOpen] = React.useState<boolean>(false);
    const popupOpen = () => setOpen(true);
    const popupClose = () => setOpen(false);
    const showpopup = (product : Product) => {
        setSelectedProduct(product);
        popupOpen();
    }

    const openFilter = (event: React.MouseEvent<HTMLButtonElement>) => setFilterAnchor(event.currentTarget);
    const closeFilter = () => setFilterAnchor(null);

    const resetSearch = () => {
        setSearchText('');
    }

  return (
    <div className="w-full pt-4">
        <section className="mb-7 mt-5">
                <div className="sm:block md:flex justify-around">
                    <div className="md:w-1/2 text-center">
                        <h4 className={`${textstyle.maskedtext}`}>{catName.split('').join(' ').toUpperCase()}</h4>
                    </div>
                     <div className="hidden lg:block lg:w-1/3">
                        <FilterOptionDetailsList filterList={filterDataset.filterList}/>
                    </div>                        
                    <div className="flex lg:w-1/3 justify-center">
                        <div className={`${inputstyle.filter} ${inputstyle.searchborder} me-1`}>
                        <Tooltip title="Filter">
                        <IconButton onClick={openFilter} size="large" color="inherit" sx={{ p: 0 }}>
                            <svg fill="none" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><g fill="#1575e5"><path d="m9.05118 11.7492c.04676-.8619.60665-1.5264 1.46392-1.6273.5791-.0681 1.3847-.1219 2.4849-.1219s1.9058.0538 2.4849.1219c.8573.1009 1.4172.7654 1.4639 1.6273.0291.5365.0512 1.2675.0512 2.2508s-.0221 1.7143-.0512 2.2508c-.0467.8619-.6066 1.5264-1.4639 1.6273-.5791.0681-1.3847.1219-2.4849.1219s-1.9058-.0538-2.4849-.1219c-.85726-.1009-1.41716-.7654-1.46392-1.6273-.02911-.5365-.05118-1.2675-.05118-2.2508s.02207-1.7143.05118-2.2508z"/><path d="m31.0512 7.74922c.0467-.86192.6066-1.52642 1.4639-1.62729.5791-.06813 1.3847-.12193 2.4849-.12193s1.9058.0538 2.4849.12193c.8573.10087 1.4172.76537 1.4639 1.62729.0291.53652.0512 1.26751.0512 2.25078 0 .9833-.0221 1.7143-.0512 2.2508-.0467.8619-.6066 1.5264-1.4639 1.6273-.5791.0681-1.3847.1219-2.4849.1219s-1.9058-.0538-2.4849-.1219c-.8573-.1009-1.4172-.7654-1.4639-1.6273-.0291-.5365-.0512-1.2675-.0512-2.2508 0-.98327.0221-1.71426.0512-2.25078z"/><path d="m20.0512 3.74922c.0467-.86192.6066-1.52642 1.4639-1.62729.5791-.06813 1.3847-.12193 2.4849-.12193s1.9058.0538 2.4849.12193c.8573.10087 1.4172.76537 1.4639 1.62729.0291.53652.0512 1.26751.0512 2.25078s-.0221 1.71426-.0512 2.25078c-.0467.86192-.6066 1.52642-1.4639 1.62729-.5791.06813-1.3847.12193-2.4849.12193s-1.9058-.0538-2.4849-.12193c-.8573-.10087-1.4172-.76537-1.4639-1.62729-.0291-.53652-.0512-1.26751-.0512-2.25078s.0221-1.71426.0512-2.25078z"/></g><path d="m24 16c-10.4512 0-15.78231.196-18.22305.332-1.0147.0565-1.77695.8946-1.77695 1.9109l.00001 1.9827c-.00001 1.1133.46041 2.174 1.30214 2.9026 2.09507 1.8136 6.58385 5.5273 12.48125 9.437.5103.3383.843.8893.8998 1.4989.4753 5.1049.892 8.6375 1.1236 10.4711.1065.8439.825 1.4648 1.6756 1.4648.3375 0 .6674-.0999.9481-.2871l4.4275-2.9516c.7401-.4934 1.2811-1.2241 1.4534-2.0967.2277-1.1535.5613-3.176.9363-6.5202.0686-.6123.4136-1.1614.9336-1.4921 6.2272-3.9596 10.6288-7.7314 12.6212-9.549.7815-.7129 1.1975-1.7251 1.1975-2.7828v-2.0776c0-1.0163-.7623-1.8544-1.777-1.9109-2.4407-.136-7.7718-.332-18.223-.332z" fill="#a6cfff"/></svg>
                        </IconButton>
                        </Tooltip>
                        <FilterOptionPopover 
                            options={filterOptions} 
                            filterDataset={filterDataset} 
                            setFilterDataset={setFilterDataset}
                            anchor={filterAnchor} 
                            open={Boolean(filterAnchor)} 
                            close={closeFilter}
                        />
                        </div>
                        <div className={`${inputstyle.form} ${inputstyle.searchborder}`}>
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
                        </div>
                    </div>
                </div>
        </section>
        <section className="flex flex-wrap text-center justify-center">
            <div className="w-1/2 md:w-1/4">
            <Typography variant="h5">Genres.</Typography>
            <div className={boxstyle.gb}>
                    {
                        genres.length == 0 && 
                        <small className="text-center text-gray-400">No Genre Available!</small>
                    }
                    {
                        genres.length > 0 && genres.map(genre => (
                            <button key={genre.id} onClick={() => onchangeGenre(genre.id, genre.name)} 
                            className={`${boxstyle.gn} px-4 py-2 border rounded-md transition 
                                ${activeGenreId === genre.id ? 
                                "bg-gray-900 text-white border-gray-900" 
                                : "bg-transparent border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"}`}>{genre.name}</button>
                        ))
                    }
                </div>
            </div>
            <div className="w-1/2 md:w-2/3">
                <div className={boxstyle.db}>
                    <div className="flex flex-wrap m-2">
                        {
                            products.length == 0 &&
                            <div className="flex flex-col items-center text-gray-400 w-full">
                                <div className='block my-4'>
                                    <svg fill="none" height="30" viewBox="0 0 128 128" width="30" xmlns="http://www.w3.org/2000/svg"><filter id="a" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="128" width="128" x="0" y="0"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape"/><feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dx="-6" dy="-6"/><feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0"/><feBlend in2="shape" mode="normal" result="effect1_innerShadow_102_838"/></filter><filter id="b" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="36" width="47" x="9" y="56"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_102_838" stdDeviation="5"/></filter><filter id="c" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="36" width="47" x="71" y="56"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_102_838" stdDeviation="5"/></filter><g filter="url(#a)"><path d="m128 30.2436v67.4688c.004 3.9756-.776 7.9136-2.295 11.5886-1.519 3.674-3.747 7.013-6.557 9.826s-6.147 5.044-9.82 6.567c-3.673 1.522-7.61 2.306-11.5863 2.306h-67.4687c-8.0252-.004-15.7208-3.193-21.39677-8.866-5.67602-5.673-8.86844416-13.367-8.87621577-21.3923v-67.4688c-.00385629-3.9753.77605877-7.9124 2.29513577-11.5861 1.51907-3.6736 3.7475-7.0118 6.55782-9.82347 2.81033-2.81168 6.14733-5.04172 9.82033-6.56258 3.6729-1.520854 7.6096-2.30267622 11.585-2.30074644h67.4688c3.9739-.00192658 7.9089.77881944 11.5809 2.29765644 3.671 1.51885 7.008 3.74604 9.819 6.55442 2.811 2.80842 5.042 6.14292 6.564 9.81332 1.523 3.6704 2.307 7.6046 2.309 11.5782z" fill="#d9915b"/></g><path d="m64.3033 49.8949-3.4908 18.3486 3.4908 2.7868z" fill="#000" opacity=".4"/><g filter="url(#b)"><path d="m37.8885 66h-10.777c-4.4798 0-8.1115 3.5817-8.1115 8s3.6317 8 8.1115 8h10.777c4.4798 0 8.1115-3.5817 8.1115-8s-3.6317-8-8.1115-8z" fill="#c140a3"/></g><g filter="url(#c)"><path d="m99.9043 66h-10.8086c-4.4711 0-8.0957 3.5785-8.0957 7.9929v.0142c0 4.4144 3.6246 7.9929 8.0957 7.9929h10.8086c4.4707 0 8.0957-3.5785 8.0957-7.9929v-.0142c0-4.4144-3.625-7.9929-8.0957-7.9929z" fill="#c140a3"/></g><path d="m64.5423 83h-.7533c-9.7033.218-20.795 5.2904-23.7045 16.1473-.0667.1805-.0944.3727-.0814.5643.0131.1916.0666.3784.1572.5484s.2163.32.369.44c.1526.119.329.206.5178.255s.3858.058.5785.028c.1927-.031.3768-.101.5406-.205.1637-.105.3036-.241.4105-.402.107-.161.1787-.342.2106-.5311 2.555-9.4616 12.4208-13.8945 21.0608-14.0834 8.2412-.1599 19.0375 3.8408 22.4639 14.5665.1797.254.4368.444.734.544.2971.1.6189.104.9185.012.2996-.093.5616-.277.7478-.526.1862-.248.287-.549.2877-.858-3.1458-9.8105-12.7015-16.5-24.4577-16.5z" fill="#000"/><path d="m94 68c3.4478 0 6.754-1.3696 9.192-3.8076 2.438-2.4379 3.808-5.7445 3.808-9.1922v-.6588c0-10.4526-11.5507-17.216-18.9291-16.2498-6.5439.8344-7.0709 5.0213-7.0709 11.2431v5.6655c.0039 3.4465 1.3748 6.7509 3.8119 9.188s5.7415 3.8079 9.1881 3.8118z" fill="#000"/><path d="m89.8248 47.6694c1.2637 0 2.2881-1.0244 2.2881-2.2881 0-1.2636-1.0244-2.288-2.2881-2.288s-2.2881 1.0244-2.2881 2.288c0 1.2637 1.0244 2.2881 2.2881 2.2881z" fill="#fff"/><path d="m94.0636 56.4843c2.9405 0 5.3242-2.3837 5.3242-5.3241 0-2.9405-2.3837-5.3242-5.3242-5.3242-2.9404 0-5.3241 2.3837-5.3241 5.3242 0 2.9404 2.3837 5.3241 5.3241 5.3241z" fill="#fff" opacity=".1"/><path d="m32.9927 68c-3.4472-.0039-6.7519-1.3752-9.1881-3.8127-2.4362-2.4376-3.8046-5.7419-3.8046-9.1871v-.6588c0-10.4526 11.5425-17.216 18.9251-16.2498 6.5622.8344 7.0749 5.0213 7.0749 11.2431v5.6655c0 3.4477-1.3704 6.7543-3.8098 9.1922-2.4393 2.438-5.7478 3.8076-9.1975 3.8076z" fill="#000"/><g fill="#fff"><path d="m28.8395 47.6694c1.2636 0 2.288-1.0244 2.288-2.2881 0-1.2636-1.0244-2.288-2.288-2.288-1.2637 0-2.2881 1.0244-2.2881 2.288 0 1.2637 1.0244 2.2881 2.2881 2.2881z"/><path d="m33.0783 56.4843c2.9404 0 5.3241-2.3837 5.3241-5.3241 0-2.9405-2.3837-5.3242-5.3241-5.3242-2.9405 0-5.3242 2.3837-5.3242 5.3242 0 2.9404 2.3837 5.3241 5.3242 5.3241z" opacity=".1"/></g></svg>
                                </div>
                                <span className='block'>No Product Available!</span>
                            </div>
                        }
                        {
                            products.length > 0 && products.map(product => (
                                <div key={product.id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 flex flex-col items-center justify-center h-full"
                                onClick={() => showpopup(product)}>
                                <img src={'/images/'+product.imageUrl} alt={product.name} 
                                className="h-50 object-cover transition-transform duration-200 hover:scale-[1.2]"></img>
                                <span>{product.name}</span>
                                </div>
                            ))
                        }
                        {
                            selectedProduct &&
                            <ItemPopup product={selectedProduct} genrename={genreName} catname={catName}
                             open={open} popupClose={popupClose}/>
                        }
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}
