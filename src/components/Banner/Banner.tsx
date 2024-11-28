import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { getMoreSubCategories } from '../../requests/requests'
import banner from './360_F_598758341_NzcqKk3DX3bJhQge0Ngba47JQDmI8bHm.jpg'
import banner1 from './depositphotos_217981402-stock-photo-set-pizza-black-wooden-background.jpg'
import banner2 from './depositphotos_271642912-stock-photo-grilled-ribeye-beef-steak-herbs.jpg'

// Interface for subcategories
interface SubCategory {
	id: number
	name: string
	fileName: string
	[key: string]: any // For additional unknown properties
}

// Interface for Redux state
interface ReduxState {
	redus: {
		MoreSubCategories: SubCategory[]
	}
}

const Banner: React.FC = () => {
	const [hover, _] = useState<boolean>(false)
	const imageRef = useRef<HTMLImageElement | null>(null)
	const MoreSubCategories = useSelector(
		(store: ReduxState) => store.redus.MoreSubCategories
	)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		dispatch(getMoreSubCategories() as any)
	}, [dispatch])

	const specialElements = MoreSubCategories?.filter((el) =>
		['Стейк', 'Пицца', 'Humburger', 'Суп', 'Мохито', 'Цезарь'].includes(el.name)
	)

	const handleProductClick = (productId: number) => {
		setTimeout(() => {
			window.scrollTo(0, 0)
			navigate(`/ProductByCategory/:${productId}`)
		})
	}

	return (
		<div>
			<section
				className={
					hover ? 'w-[880px] swiper-hidden' : 'w-[880px] swiper-transition'
				}
			>
				<div className='w-full pb-[25px]'>
					<Swiper
						modules={[Pagination]}
						spaceBetween={20}
						slidesPerView={1}
						breakpoints={{
							360: {
								slidesPerView: 3,
							},
							640: {
								slidesPerView: 3,
							},
							768: {
								slidesPerView: 4,
							},
							1024: {
								slidesPerView: 6,
							},
						}}
					>
						{specialElements?.map((el) => (
							<SwiperSlide key={el.id}>
								<div
									className='relative text-black bg-white cursor-pointer mx-auto overflow-hidden transition-all duration-300 ease-in-out hover:h-full'
									onClick={() => handleProductClick(el.id)}
								>
									<img
										ref={imageRef}
										className='w-[129px] h-[129px] rounded-full transition-opacity duration-300 ease-in-out'
										src={`${import.meta.env.VITE_APP_FILES_URL}${el.fileName}`}
										alt={el.name}
										style={{ backgroundColor: 'rgb(107, 215, 202)' }}
									/>
									<div className='flex justify-center items-center relative top-0'>
										<h1 className='text-center text-lg relative top-0 font-semibold'>
											{el.name}
										</h1>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
				<Swiper
					spaceBetween={30}
					centeredSlides={true}
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}}
					pagination={{
						clickable: true,
					}}
					modules={[Autoplay]}
					className='h-[390px] rounded-[10px]'
				>
					<SwiperSlide>
						<div className='relative h-full'>
							<img
								className='cursor-pointer w-full h-full object-cover'
								src={banner}
								alt='Banner'
							/>
							<div className='absolute inset-0 flex items-end pb-[30px] pl-[40px]'>
								<div>
									<p className='text-white text-2xl text-start font-bold'>
										FEATURED
									</p>
									<p className='text-white text-[50px] font-bold'>
										Next level adventure
									</p>
									<p className='text-white text-2xl text-start pt-[10px]'>
										The most rugged and capable
									</p>
									<div className='mt-[20px] bg-black p-[12px] rounded-[10px] w-[90px]'>
										<button className='text-center rounded-[5px] text-white'>
											Buy Now
										</button>
									</div>
								</div>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className='relative h-full'>
							<img
								className='cursor-pointer w-full h-full object-cover'
								src={banner1}
								alt='Banner 1'
							/>
							<div className='absolute inset-0 flex items-end pb-[30px] pl-[40px]'>
								<div>
									<p className='text-white text-2xl text-start font-bold'>
										FEATURED
									</p>
									<p className='text-white text-[50px] font-bold'>
										Next level adventure
									</p>
									<p className='text-white text-2xl text-start pt-[10px]'>
										The most rugged and capable
									</p>
									<div className='mt-[20px] bg-black p-[12px] rounded-[10px] w-[90px]'>
										<button className='text-center rounded-[5px] text-white'>
											Buy Now
										</button>
									</div>
								</div>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className='relative h-full'>
							<img
								className='cursor-pointer w-full h-full object-cover'
								src={banner2}
								alt='Banner 2'
							/>
							<div className='absolute inset-0 flex items-end pb-[30px] pl-[40px]'>
								<div>
									<p className='text-white text-2xl text-start font-bold'>
										FEATURED
									</p>
									<p className='text-white text-[50px] font-bold'>
										Next level adventure
									</p>
									<p className='text-white text-2xl text-start pt-[10px]'>
										The most rugged and capable
									</p>
									<div className='mt-[20px] bg-black p-[12px] rounded-[10px] w-[90px]'>
										<button className='text-center rounded-[5px] text-white'>
											Buy Now
										</button>
									</div>
								</div>
							</div>
						</div>
					</SwiperSlide>
				</Swiper>
			</section>
		</div>
	)
}

export default Banner
