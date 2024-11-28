import React, { useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { getMoreSubCategories } from '../../requests/requests'

// Define types for the subcategories
interface SubCategory {
	id: number
	name: string
	fileName: string
}

// Define the structure of your Redux store
interface RootState {
	redus: {
		MoreSubCategories: {
			data: SubCategory[]
		}
	}
}

const MoreCategories: React.FC = () => {
	const MoreSubCategories = useSelector(
		(store: RootState) => store.redus.MoreSubCategories
	)
	const dispatch = useDispatch()
	const [hoverHeight, setHoverHeight] = useState<number>(0)
	const [loading, setLoading] = useState<boolean>(true)
	const imageRef = useRef<HTMLImageElement | null>(null)

	const navigate = useNavigate()

	useEffect(() => {
		dispatch(getMoreSubCategories() as any).then(() => {
			setLoading(false)
		})
	}, [dispatch])

	useEffect(() => {
		if (imageRef.current) {
			setHoverHeight(imageRef.current.clientHeight)
		}
	}, [MoreSubCategories])

	const specialElements = MoreSubCategories?.data?.filter((el) =>
		[
			'Обувь',
			'Toys',
			'Furniture',
			'Air Purifiers',
			'Наушники',
			'Мобильные телефоны',
		].includes(el.name)
	)

	const handleProductClick = (productId: number) => {
		setTimeout(() => {
			window.scrollTo(0, 0)
			navigate(`/Category/${productId}`)
		})
	}

	const renderSkeleton = () => (
		<SwiperSlide>
			<div className='relative dark:bg-gray-900 bg-white mx-auto overflow-hidden rounded-full'>
				<Skeleton
					circle={true}
					height={hoverHeight || 150}
					width={hoverHeight || 150}
				/>
				<div className='absolute inset-0 bg-black bg-opacity-70 text-white flex justify-center items-center rounded-full opacity-0'>
					<Skeleton width={hoverHeight ? hoverHeight / 2 : 75} />
				</div>
			</div>
		</SwiperSlide>
	)

	return (
		<div className='mt-[20px]'>
			<div className='md:text-left'>
				<p className='text-[#1d2128] dark:text-white font-medium text-2xl'>
					Explore More Categories
				</p>
			</div>
			<div className='mt-10 w-full'>
				<Swiper
					modules={[Pagination]}
					spaceBetween={20}
					slidesPerView={1}
					breakpoints={{
						360: {
							slidesPerView: 2.5,
						},
						640: {
							slidesPerView: 2.5,
						},
						768: {
							slidesPerView: 4,
						},
						1024: {
							slidesPerView: 6,
						},
					}}
				>
					{loading
						? Array(6)
								.fill(null)
								.map((_, index) => (
									<React.Fragment key={index}>
										{renderSkeleton()}
									</React.Fragment>
								))
						: specialElements?.map((el) => (
								<SwiperSlide key={el.id}>
									<div
										className='relative dark:bg-gray-900 bg-white cursor-pointer mx-auto overflow-hidden transition-all duration-300 ease-in-out hover:h-full'
										onClick={() => handleProductClick(el.id)}
									>
										<img
											ref={imageRef}
											className='w-full h-full rounded-full transition-opacity duration-300 ease-in-out'
											src={`${import.meta.env.VITE_APP_FILES_URL}${
												el.fileName
											}`}
											alt={el.name}
										/>
										<div className='absolute sm:hidden md:flex inset-0 bg-black bg-opacity-70 text-white flex justify-center items-center rounded-full opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100'>
											<h1 className='text-center text-lg font-semibold'>
												{el.name}
											</h1>
										</div>
										<div className='sm:flex md:hidden justify-center'>
											<h1 className='text-center text-lg font-semibold'>
												{el.name}
											</h1>
										</div>
									</div>
								</SwiperSlide>
						  ))}
				</Swiper>
			</div>
		</div>
	)
}

export default MoreCategories
