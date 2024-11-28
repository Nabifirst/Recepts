import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import React, { useEffect, useState } from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { getproduct } from '../../requests/requests'
import { RootState } from '../../store/store' // Replace with your actual store structure
import OurBrands from '../Our Brands/OurBrands'
import './Products.css'

interface Product {
	id: number
	name: string
	categoryId: number
	price: string
	discountPrice: string
	quantity: number
	description: string
	images: Array<{ fileName: string }>
}

const Products: React.FC = () => {
	const [__, setValue] = useState<number>(2)
	const [_, setLoading] = useState<boolean>(true)
	const [likedProducts, setLikedProducts] = useState<number[]>([])
	const [zero, setZero] = useState<number>(0)

	const dispatch = useDispatch()
	const data: Product[] = useSelector(
		(state: RootState) => state.redus.dataproduct
	)

	const { setLoading: setAppLoading } = useOutletContext<{
		setLoading: (loading: boolean) => void
	}>()
	const navigate = useNavigate()

	useEffect(() => {
		dispatch(getproduct() as any).then(() => {
			setLoading(false)
			setAppLoading(false)
		})
	}, [dispatch, setAppLoading])

	const handleProductClick = (productId: number) => {
		window.scrollTo(0, 0)
		navigate(`/ProductInfo/:${productId}`)
	}

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
		const likedItems: Product[] = JSON.parse(
			localStorage.getItem('likedItems') || '[]'
		)
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
			<div className='header'>
				<div className='w-[100%]'>
					<div className='grid grid-cols-5 gap-4'>
						{data?.slice(0, 10).map((product) => (
							<div
								key={product.id}
								className='product-card p-[4px]'
								style={{
									height: 'auto',
									width: '100%',
									maxWidth: '100%',
								}}
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
									<h1>
										{' '}
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
										className='mt-2 bg-[#a73afd] cursor-pointer w-[100%] flex justify-center gap-[5px] items-center rounded-[12px] text-white  text-[16px] font-bold h-[35px]'
									>
										<button className=' ml-[15px]'>More</button>
										<MoreHorizIcon
											className=' relative top-[2.5px]'
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
												<FavoriteIcon sx={{ width: '20px', color: 'red' }} />
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
					<div className=' mt-[50px]'>
						<OurBrands />
					</div>
					<div className='grid grid-cols-5 gap-4 mt-[40px]'>
						{data?.slice(10).map((product) => (
							<div
								key={product.id}
								className='product-card p-[4px]'
								style={{
									height: 'auto',
									width: '100%',
									maxWidth: '100%',
								}}
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
															width: '100%',
															borderRadius: '10px',
															height: '250px',
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
									<h1 className='text-[15px]  h-[50px]'>
										{product.description.length > 20
											? product.description.slice(0, 38) + '...'
											: product.description}
									</h1>{' '}
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
										className='mt-2 bg-[#a73afd] w-[100%] flex justify-center gap-[5px] items-center rounded-[12px] text-white  text-[16px] font-bold h-[35px]'
									>
										<button className=' ml-[15px]'>More</button>
										<MoreHorizIcon
											className=' relative top-[2.5px]'
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
												<FavoriteIcon sx={{ width: '20px', color: 'red' }} />
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
				<ToastContainer />
			</div>
		</div>
	)
}

export default Products
