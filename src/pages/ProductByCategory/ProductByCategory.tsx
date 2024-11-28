import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { Box, Button, Rating } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { getdata, getproductbycategoryid } from '../../requests/requests'
import './ProductByCategory.css'

// Interfaces for typing
interface Product {
	id: number
	name: string
	description: string
	images: { fileName: string }[]
	quantity: number
}

interface Category {
	id: string
	name: string
	subCategories?: SubCategory[]
}

interface SubCategory {
	id: string
	name: string
}

const ProductByCategory: React.FC = () => {
	const [likedProducts, setLikedProducts] = useState<number[]>([]) // Liked products' IDs
	const [_, setValue] = useState<number>(2)
	const [zero, setZero] = useState<number>(0)

	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { id } = useParams<{ id: string }>()
	const id1 = id ? id.slice(1) : ''

	const data = useSelector(
		(store: any) => store.redus.ProductByCategoryId
	) as Product[]
	const data1 = useSelector((store: any) => store.redus.data) as Category[]

	const handleProductClick = (productId: number) => {
		window.scrollTo(0, 0)
		navigate(`/ProductInfo/:${productId}`)
	}

	useEffect(() => {
		dispatch(getproductbycategoryid({ id: id1 }) as any)
	}, [dispatch, id1])

	useEffect(() => {
		dispatch(getdata() as any)
	}, [dispatch])

	let matchingElement = data1?.find((el) => el.id == id1)

	if (!matchingElement) {
		for (let category of data1) {
			matchingElement = category.subCategories?.find((sub) => sub.id == id1)
			if (matchingElement) {
				break
			}
		}
	}

	console.log('matchingElement:', matchingElement)

	const handleToggleLiked = (product: Product) => {
		const likedItems: Product[] = JSON.parse(
			localStorage.getItem('likedItems') || '[]'
		)

		if (likedProducts.includes(product.id)) {
			const updatedItems = likedItems.filter((item) => item.id !== product.id)
			setLikedProducts(likedProducts.filter((id) => id !== product.id))
			localStorage.setItem('likedItems', JSON.stringify(updatedItems))
		} else {
			likedItems.push(product)
			setLikedProducts([...likedProducts, product.id])
			localStorage.setItem('likedItems', JSON.stringify(likedItems))
		}

		window.dispatchEvent(new Event('updateCartCount'))
	}

	const handleToggleLiked1 = (product: Product) => {
		handleToggleLiked(product)
		localStorage.setItem('showLikeAnimation', zero === 0 ? 'false' : 'true')
		setTimeout(() => {
			localStorage.setItem('showLikeAnimation', 'false')
		}, 1000)
	}

	useEffect(() => {
		const likedItems = JSON.parse(
			localStorage.getItem('likedItems') || '[]'
		) as Product[]
		setLikedProducts(likedItems.map((item) => item.id))
	}, [])

	useEffect(() => {
		const timeout = setTimeout(() => {
			setZero(1)
		}, 1000)
		return () => clearTimeout(timeout)
	}, [])

	return (
		<div className='header-container'>
			<div className='header pl-[20px] pr-[20px] pt-[40px]'>
				<div className='w-[100%]'>
					<div className=' relative top-[30px]'>
						<div className='Image-Header h-[370px] rounded-[10px]'>
							<div className='flex items-center ml-[30px]  gap-[10px]'>
								{matchingElement && (
									<div>
										<h1 className='text-[35px] w-[100%] cursor-pointer text-white'>
											{matchingElement.name}
										</h1>
									</div>
								)}
							</div>
						</div>
					</div>
					<div className='flex gap-[30px] '>
						<div className='w-[100%]'>
							<div className='relative w-[100%]'>
								<div className='grid grid-cols-5 mt-[100px] w-full justify-between'>
									{data?.map((product) => (
										<div
											key={product.id}
											className='product-card p-[4px]'
											style={{ maxWidth: '100%' }}
										>
											<div className='relative'>
												<Swiper
													modules={[Navigation]}
													className='w-[250px] mt-[10px]'
												>
													{product.images
														.filter((elem) => !elem.fileName.includes('mp4'))
														.map((file) => (
															<SwiperSlide
																key={file.fileName}
																className='flex rounded-[10px] justify-center relative'
															>
																<img
																	style={{
																		width: '80%',
																		borderRadius: '10px',
																		height: '200px',
																	}}
																	src={`${import.meta.env.VITE_APP_FILES_URL}${
																		file.fileName
																	}`}
																	alt={product.name}
																	onClick={() => handleProductClick(product.id)}
																/>
															</SwiperSlide>
														))}
												</Swiper>
											</div>

											<div
												className='mt-2 text-start'
												onClick={() => handleProductClick(product.id)}
											>
												<h1 className='text-[14px] font-semibold'>
													{product.name.length > 20
														? product.name.slice(0, 15) + '...'
														: product.name}
												</h1>
											</div>

											<div className='mt-2 text-start'>
												<Box sx={{ '& > legend': { mt: 2 } }}>
													<Rating
														name='simple-controlled'
														value={5}
														onChange={(_, newValue) => setValue(newValue || 0)}
													/>
												</Box>
											</div>

											<div className='flex items-center'>
												<h1 className=' h-[50px]'>
													{product.description.length > 20
														? product.description.slice(0, 38) + '...'
														: product.description}
												</h1>
											</div>

											<div>
												<h1 className='text-gray-500 text-sm text-start'>
													Sold: {product.quantity}
												</h1>
												<div className='border mt-[5px] bg-gray-300 border-gray-300 rounded-md w-full'>
													<div className='bg-black h-[3px] rounded-md w-[25%]'></div>
												</div>
											</div>

											<div className='flex items-center gap-[5px]'>
												<div
													onClick={() => handleProductClick(product.id)}
													className='mt-2 bg-[#a73afd] cursor-pointer w-[100%] flex justify-center gap-[5px] items-center rounded-[12px] text-white text-[16px] font-bold h-[35px]'
												>
													<button className='ml-[15px]'>More</button>
													<MoreHorizIcon
														className='relative top-[2.5px]'
														fontSize='medium'
													/>
												</div>
												<div
													onClick={() => handleToggleLiked1(product)}
													className='sm:flex'
												>
													<Button
														variant='outlined'
														sx={{
															width: '35px',
															minWidth: '10px',
															padding: 0,
															height: '33px',
															marginTop: '10px',
															border: 'none',
															borderRadius: '15px',
															bgcolor: '#ddd6fe',
														}}
													>
														{likedProducts.includes(product.id) ? (
															<FavoriteIcon
																sx={{ width: '20px', color: 'red' }}
															/>
														) : (
															<FavoriteBorderIcon
																sx={{ width: '20px', color: 'black' }}
															/>
														)}
													</Button>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<ToastContainer />
		</div>
	)
}

export default ProductByCategory
