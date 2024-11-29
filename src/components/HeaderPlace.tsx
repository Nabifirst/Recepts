import { ExpandLess } from '@mui/icons-material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined'
import SearchIcon from '@mui/icons-material/Search'
import { Button, Rating } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getbyid, getdata, getproductbyname } from '../requests/requests'
import { RootState } from '../store/store' 
import Logo from './Header/watermark_preview_image20240825-1-1aopu4e_(1)-transformed (1).png'

interface SubCategoryItem {
	id: number
	fileName: string
	name: string
}

interface Product {
	id: number
	name: string
	images: { fileName: string }[]
	raiting: number
	description: string
	price: number
}

const HeaderPlace: React.FC = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const productByName = useSelector(
		(state: RootState) => state.redus.productByName
	)
	console.log('Redux state:', productByName)
	const [search, setSearch] = useState<string>('')
	const [isSectionOpen, setIsSectionOpen] = useState<boolean>(false)

	const handleProductClick2 = (productId: number) => {
		setTimeout(() => {
			window.scrollTo(0, 0)
			navigate(`/ProductInfo/:${productId}`)
			setSearch('')
		})
	}

	const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			navigate(`ProductsByName/:${search}`)
			setSearch('')
		}
	}

	useEffect(() => {
		if (search) {
			dispatch(getproductbyname(search) as any)
		}
	}, [search, dispatch])

	console.log(productByName)

	const toggleSection = () => {
		setIsSectionOpen(!isSectionOpen)
	}

	const data1 = useSelector((store: RootState) => store.redus.data)

	const databyid = useSelector((store: RootState) => store.redus.databyid)

	useEffect(() => {
		dispatch(getdata() as any)
	}, [dispatch])

	const handleProductClick1 = (productId: number) => {
		window.scrollTo(0, 0)
		navigate(`/ProductByCategory/:${productId}`)
		setIsSectionOpen(false)
	}

	console.log(databyid)

	return (
		<div className='w-[100%]'>
			<div className={`header-container fixed z-[20] mb-[10px] bg-white `}>
				<header className='header relative'>
					<div className='header-content'>
						<div className='logoDiv'>
							<div className='flex sm:w-[100%] items-center gap-[20px]'>
								<div
									onClick={() => navigate('/')}
									className='sm:hidden md:flex flex items-center cursor-pointer gap-[10px] w-[225px]'
								>
									<div>
										<img
											className='bg-violet-300 w-[65px] border-[1px] h-[62px] rounded-full'
											src={Logo}
											alt=''
										/>
									</div>
									<div>
										<p className='text-[27px] text-violet-600 font-bold'>
											cox market
										</p>
									</div>
								</div>
								<div>
									<Button
										onClick={toggleSection}
										sx={{
											height: '45px',
											fontSize: '15px',
											paddingRight: '30px',
											paddingLeft: '30px',
											gap: '12px',
											color: '#fff',
											bgcolor: '#7f4dff',
											borderRadius: '7px',
											boxShadow: '0px 4px 20px rgba(127, 77, 255, 0.4)',
											transition:
												'transform 0.3s ease-in-out, background-color 0.3s ease-in-out',
											'&:hover': {
												bgcolor: '#5e3dcc',
												transform: 'scale(1.05)',
												boxShadow: '0px 6px 25px rgba(127, 77, 255, 0.6)',
											},
											'& .MuiSvgIcon-root': {
												fontSize: '20px',
											},
										}}
									>
										{isSectionOpen ? <ExpandLess /> : <ManageSearchIcon />}
										{isSectionOpen ? 'Рецепт' : 'Рецепт'}
									</Button>
								</div>
							</div>
						</div>
						<div className='search-section sm:relative sm:top-2 md:top-1.5 z-50 mt-[5px] flex justify-center'>
							<div className='flex w-[100%] gap-[10px] items-center'>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										width: '100%',
										background: '#f5f5f5',
										borderRadius: '25px',
										padding: '8px 16px',
										boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
									}}
								>
									<SearchIcon
										style={{
											color: '#7f4dff',
											fontSize: '24px',
											marginRight: '10px',
										}}
									/>
									<input
										value={search}
										onChange={(e) => setSearch(e.target.value)}
										onKeyDown={handleSearchSubmit}
										className='w-full border-none outline-none bg-transparent text-gray-800'
										placeholder='Search'
										type='text'
										style={{ fontSize: '16px', fontWeight: '500' }}
									/>
								</div>
								<div
									onClick={() => {navigate(`ProductsByName/:${search}`),setSearch('')}}
									className='bg-gradient-to-r w-[55px] flex justify-center from-purple-500 to-indigo-600 p-[12px] rounded-full shadow-lg cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl'
								>
									<SearchIcon style={{ color: '#fff', fontSize: '25px' }} />
								</div>
							</div>
							{search && (
								<div className='search-results w-[100%]'>
									{productByName?.map((product: Product) => (
										<div
											key={product.id}
											className='search-result-item shadow-xl gap-[5px]'
											onClick={() => handleProductClick2(product.id)}
										>
											<div>
												<img
													style={{ width: '80px', height: '80px' }}
													src={`${import.meta.env.VITE_APP_FILES_URL}${
														product.images?.filter(
															(elem) => !elem.fileName.includes('mp4')
														)[0]?.fileName
													}`}
													alt={product.name}
												/>
											</div>
											<div>
												<h2>{product.name}</h2>
												<Rating value={5} />
												<p className='text-lg font-bold'>
													{product.description.slice(0, 45) + '...'}
												</p>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
						<nav className='nav-section sm:hidden md:flex gap-[10px] mt-[5px]'>
							<div
								onClick={() => {navigate('/WishList'),window.scrollTo(0,0)}}
								className='pl-[10px] flex items-center gap-[10px] hover:bg-gray-300 border-[1px] shadow-md cursor-pointer rounded-[8px] p-[10px]'
							>
								<FavoriteBorderIcon className='text-gray-600' />
							</div>
							<div
								onClick={() =>navigate('/PersonalAccount')}
								className='pl-[10px] border-[1px] shadow-md flex items-center gap-[10px] hover:bg-gray-300 cursor-pointer rounded-[8px] p-[10px]'
							>
								<Person2OutlinedIcon className='text-gray-600' />
								<p
									className={`font-sans w-[150px] text-[17px] text-gray-600`}
								>
									Личный кабинет
								</p>
							</div>
						</nav>
					</div>
				</header>
			</div>
			<div
				className={`fixed  flex top-[73px] bg-white     z-20 transition-all duration-300 ease-in-out  shadow-lg ${
					isSectionOpen ? 'max-h-[800px] p-4' : 'max-h-0 opacity-0 p-0'
				}`}
				style={{
					width: '100%',
					alignItems: 'center',
					overflow: 'hidden',
					justifyContent: 'center',
				}}
			>
				<div className=' max-h-[100%] flex justify-start overflow-auto'>
					<div className='pb-[20px] w-[100%] sm:w-[100%] md:w-[1150px] flex items-start '>
						<div className=' sm:w-[90%] lg:max-h-[440px] xl:max-h-[500px]  md:w-[27%]'>
							{data1?.slice(0, 9)?.map((elem: any) => {
								return (
									<div
										onClick={() => handleProductClick1(elem.id)}
										key={elem.id}
										className='flex items-center w-[100%]'
									>
										<div className='w-[100%] sm:border-none sxm:border-r-[1px]'>
											<div
												onMouseOver={() => dispatch(getbyid(elem.id) as any)}
												className='flex items-center rounded-[4px] sm:gap-[40px] sxm:gap-[0px] hover:text-blue-500 hover:bg-gray-200 p-[10px] sm:w-[100%] sxm:w-[215px] cursor-pointer justify-between'
											>
												<div className='flex items-center gap-[10px]'>
													<img
														width={40}
														src={`${import.meta.env.VITE_APP_FILES_URL}${
															elem.fileName
														}`}
														alt=''
													/>
													<h1 className='text-[15px] p-[5px]'>{elem.name}</h1>
												</div>
												<div className=''>
													<svg
														xmlns='http://www.w3.org/2000/svg'
														version='1.0'
														width='9.000000pt'
														height='9.000000pt'
														viewBox='0 0 512.000000 512.000000'
														preserveAspectRatio='xMidYMid meet'
														className='fill-current text-gray-500 '
													>
														<g
															transform='translate(0.000000,512.000000) scale(0.100000,-0.100000)'
															stroke='none'
														>
															<path
																d='M1377 5110 c-142 -36 -255 -163 -273 -306 -7 -60 9 -151 38 -209 13
                        -26 368 -388 1016 -1037 l997 -998 -997 -997 c-648 -650 -1003 -1012 -1016
                        -1038 -92 -186 -15 -405 173 -492 51 -23 73 -28 145 -27 160 0 52 -96 1342
                        1192 778 777 1155 1160 1172 1191 39 73 53 158 37 234 -7 34 -24 83 -37 108
                        -17 31 -394 414 -1172 1191 -1022 1020 -1153 1147 -1200 1167 -61 25 -168 35
                        -225 21z'
															/>
														</g>
													</svg>
												</div>
											</div>
										</div>
									</div>
								)
							})}
						</div>

						<div className='w-[100%] flex flex-wrap '>
							{databyid?.subCategories?.map((el: SubCategoryItem) => (
								<div
									key={el.id}
									className='pb-[10px] p-[10px] flex items-center gap-[10px]'
								>
									<img
										className='w-[60px] rounded-full'
										src={`${import.meta.env.VITE_APP_FILES_URL}${el.fileName}`}
										alt={el.name}
									/>
									<h1
										onClick={() => handleProductClick1(el.id)}
										className='text-[15px] hover-border cursor-pointer'
									>
										{el.name}
									</h1>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HeaderPlace
