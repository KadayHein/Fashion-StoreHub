"use client";
import { client } from '@/lib/apolloClient';
import { gql } from '@apollo/client';
import React, { useEffect } from 'react'
import ItemPopup from '../info-details/ItemPopup';
import boxstyle from '../../service-module/global-util/showroom-layout.module.css'
import inputstyle from '../../service-module/global-util/form-input.module.css'
import textstyle from '../../service-module/global-util/text-style.module.css'
import { Box, Breadcrumbs, Drawer, IconButton, Link, Stack, Tooltip, Typography } from '@mui/material';
import FilterOptionPopover from '@/base-components/filterset/FilterOptionPopover';
import FilterOptionDetailsList from '@/base-components/filterset/FilterOptionDetailsList';
import { DataType } from '@/types/enum';
import { enqueueSnackbar } from 'notistack';
import { ChecklistRounded, CreditCardRounded, LocalMallRounded, NavigateNextRounded } from '@mui/icons-material';
import { CloseIcon, FilterIcon, SearchIcon, Sorry4uIcon } from '@/service/svgIconUtils';
import { useRouter } from '@/i18n/navigation';
import CartSidebar from './CartSidebar';
import ButtonWhiteBlack from '@/base-components/showbutton/ButtonWhiteBlack';
import ButtonBlackWhite from '@/base-components/showbutton/ButtonBlackWhite';
import { useAppTranslation } from '@/service/customHooks/useAppTranslation';
import { URL_CATEGORIES } from '@/service/routeHandler';

export default function ShowRoom({ catId }: any) {

    const [catName, setCatName] = React.useState<string>('')
    const [genreName, setGenreName] = React.useState<string>('')
    const [genres, setGenres] = React.useState<Genre[]>([])
    const [activeGenreId, setActiveGenreId] = React.useState<number>(0)
    const [onFilter, setOnFilter] = React.useState<boolean>(false)
    const [onSearch, setOnSearch] = React.useState<boolean>(false)
    const [products, setProducts] = React.useState<Product[]>([])
    const [selectedProduct, setSelectedProduct] = React.useState<Product>()
    const [searchText, setSearchText] = React.useState<string>('')
    const [searchResults, setSearchResults] = React.useState<Product[]>([]);
    const [filterList, setFilterList] = React.useState<Filter[]>([])
    const [filterAnchor, setFilterAnchor] = React.useState<HTMLButtonElement | null>(null)
    const [cartOpen, setCartOpen] = React.useState(false);
    const { common, carts, noti } = useAppTranslation()

    const toggleCartSide = (newOpen: boolean) => () => {
        setCartOpen(newOpen);
    };

    const router = useRouter()

    const filterOptions: FilterOption[] = [
        { optionid: "1", caption: common("productName"), fieldname: "name", datatype: DataType.STRING },
        { optionid: "2", caption: common("price"), fieldname: "price", datatype: DataType.NUMBER },
    ]

    useEffect(() => {
        ShowCategoryAndGenres()
    }, [])

    useEffect(() => {
        if (activeGenreId) ShowProductsByGenreId(activeGenreId)
    }, [activeGenreId])

    useEffect(() => {
        if (genres.length > 0) setActiveGenreId(genres[0].id);
    }, [genres]);

    async function ShowCategoryAndGenres() {
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
            setGenreName(resp.data.genresByCategoryId.at(0).name)
        })
            .catch(() => enqueueSnackbar(noti("fail2loadCat&Gn"), { variant: "error" }))
    }

    async function ShowProductsByGenreId(id: number) {
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
        }).catch(() => enqueueSnackbar(noti("fail2loadProduct"), { variant: "error" }))
    }

    const onchangeGenre = (id: number, name: string) => {
        setGenreName(name)
        setActiveGenreId(id);
        setOnSearch(false)
    }

    const [open, setOpen] = React.useState<boolean>(false);
    const popupOpen = () => setOpen(true);
    const popupClose = () => setOpen(false);
    const showpopup = (product: Product) => {
        setSelectedProduct(product);
        popupOpen();
    }

    const openFilter = (event: React.MouseEvent<HTMLButtonElement>) => setFilterAnchor(event.currentTarget);
    const closeFilter = () => setFilterAnchor(null);

    const resetSearch = () => {
        setSearchText('');
        closeSearch()
    }

    const closeSearch = () => {
        setOnSearch(false)
        setActiveGenreId(genres?.at(0)?.id)
    }

    const PRODUCTS_BY_TEXT = gql`
    query ProductsByText(
        $searchText: String
        $categoryId: ID
    ) {
        productsByText(
            searchText: $searchText
            categoryId: $categoryId
        ) {
            id
            name
            imageUrl
            price
        }
      }
    `;

    async function Search4Products() {
        await client.query<ProductsByTextResponse>({
            query: PRODUCTS_BY_TEXT,
            variables: {
                searchText: searchText,
                categoryId: catId
            }
        }).then(resp => {
            setSearchResults(resp.data.productsByText);
            setActiveGenreId(0)
            setOnSearch(true)
        }).catch(error => enqueueSnackbar(noti("fail2searchProduct") + error, { variant: "error" }))
    }

    const FILTER_PRODUCTS = gql`
    query ProductsByText(
        $filterDataset: FilterDatasetInput!
        $categoryId: ID!
    ) {
        filterProducts(
            filterDataset: $filterDataset
            categoryId: $categoryId
        ) {
            id
            name
            imageUrl
            price
        }
      }
    `;

    async function Filter4Products(filters: Filter[]) {
        setOnSearch(false)
        if (filters.length > 0) {
            await client.query<ProductsFilterResponse>({
                query: FILTER_PRODUCTS,
                variables: {
                    filterDataset: { filterList: filters },
                    categoryId: catId
                }
            }).then(resp => {
                setSearchResults(resp.data.filterProducts);
                setActiveGenreId(0)
                setOnSearch(true)
            }).catch(error => enqueueSnackbar(noti("fail2filterProduct") + error, { variant: "error" }))
        }
    }

    return (
        <div className="w-full pt-4">
            <Breadcrumbs separator={<NavigateNextRounded fontSize="small" />}
                aria-label="breadcrumb" sx={{ pl: 4, fontSize: 20, letterSpacing: 3 }}>
                <Typography underline='hover' component={Link} onClick={() => router.push(URL_CATEGORIES)} sx={{ color: 'text.primary', fontSize: 20, letterSpacing: 3 }}>{common("category")}</Typography>
                <Link underline='none' color="inherit">{catName}</Link>
                <Typography sx={{ color: 'text.primary', fontSize: 20, letterSpacing: 3 }}>{genreName}</Typography>
            </Breadcrumbs>
            <section className="mb-7 mt-2">
                <div className="sm:block md:flex justify-around">
                    <div className="md:w-1/2 text-center">
                        <h4 className={`${textstyle.maskedtext}`}>{catName.split('').join(' ').toUpperCase()}</h4>
                    </div>
                    <div className="hidden lg:block lg:w-1/3">
                        <FilterOptionDetailsList
                            filterList={filterList}
                            setFilterList={setFilterList}
                            Filter4Products={Filter4Products} />
                    </div>
                    <div className="flex lg:w-1/3 justify-center">
                        <div className={`${inputstyle.filter} ${inputstyle.searchborder} me-1`}>
                            <Tooltip title={common("filter")}>
                                <IconButton onClick={openFilter} size="large" color="inherit" sx={{ p: 0 }}>
                                    <FilterIcon width={48} height={48} />
                                </IconButton>
                            </Tooltip>
                            <FilterOptionPopover
                                options={filterOptions}
                                filterList={filterList}
                                setFilterList={setFilterList}
                                anchor={filterAnchor}
                                open={Boolean(filterAnchor)}
                                close={closeFilter}
                                Filter4Products={Filter4Products}
                            />
                        </div>
                        <div className={`${inputstyle.form} ${inputstyle.searchborder}`}>
                            <button>
                                <SearchIcon width={40} height={40} />
                            </button>
                            <form className='flex' onSubmit={(e) => {
                                e.preventDefault()
                                Search4Products()
                            }}>
                                <input className={inputstyle.input} value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    placeholder={common("search")} type="text" required ></input>

                                <Tooltip title="reset">
                                    <IconButton className={inputstyle.reset} type="reset" onClick={resetSearch} size="large" color="inherit" sx={{ p: 0 }}>
                                        <CloseIcon />
                                    </IconButton>
                                </Tooltip>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <section className="flex flex-wrap text-center justify-center">
                <div className="w-1/2 md:w-1/4">
                    <Typography variant="h5">{common("genres")}</Typography>
                    <div className={boxstyle.gb}>
                        {
                            onSearch &&
                            <button className={`${boxstyle.gn} px-4 py-2 border rounded-md transition bg-gray-900 text-white border-gray-900"`}>
                                {noti("searchresults")}
                            </button>
                        }
                        {
                            genres.length == 0 &&
                            <small className="text-center text-gray-400">{noti("nogenre")}</small>
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
                    <Stack direction='column' spacing={2} my={3} pt={10} px={7}>
                        <ButtonWhiteBlack label={carts('viewCart')} startIcon={<LocalMallRounded />} onClickFunc={() => setCartOpen(true)} />
                        <ButtonBlackWhite label={carts('checkout')} endIcon={<CreditCardRounded />} onClickFunc={() => router.push('../checkout/0')} />
                    </Stack>
                    <CartSidebar cartOpen={cartOpen} toggleCartSide={toggleCartSide} />
                </div>
                <div className="w-1/2 md:w-2/3">
                    <div className={boxstyle.db}>
                        <div className="flex flex-wrap m-2">
                            {
                                !onSearch && products.length == 0 &&
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    width: "100%",
                                    color: "text.disabled",
                                }}>
                                    <Box sx={{ my: 2 }}>
                                        <Sorry4uIcon width={40} height={40} />
                                    </Box>

                                    <Typography variant="body1">
                                        {noti("noproduct")}
                                    </Typography>
                                </Box>
                            }
                            {
                                onSearch && searchResults.length == 0 &&
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    width: "100%",
                                    color: "text.disabled",
                                }}>
                                    <Box sx={{ my: 2 }}>
                                        <Sorry4uIcon width={40} height={40} />
                                    </Box>

                                    <Typography variant="body1">
                                        {noti("noproductfound")}"{searchText}"
                                    </Typography>
                                </Box>
                            }
                            {
                                onSearch && searchResults && searchResults.map(product => (
                                    <div key={product.id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 flex flex-col items-center justify-center h-full"
                                        onClick={() => showpopup(product)}>
                                        <img src={'/images/' + product.imageUrl} alt={product.name}
                                            className="h-50 object-cover transition-transform duration-200 hover:scale-[1.2]"></img>
                                        <span>{product.name}</span>
                                    </div>
                                ))
                            }
                            {
                                !onSearch && products.length > 0 && products.map(product => (
                                    <div key={product.id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 flex flex-col items-center justify-center h-full"
                                        onClick={() => showpopup(product)}>
                                        <img src={'/images/' + product.imageUrl} alt={product.name}
                                            className="h-50 object-cover transition-transform duration-200 hover:scale-[1.2]"></img>
                                        <span>{product.name}</span>
                                    </div>
                                ))
                            }
                            {
                                selectedProduct &&
                                <ItemPopup product={selectedProduct} genrename={genreName} catname={catName}
                                    open={open} popupClose={popupClose} />
                            }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
