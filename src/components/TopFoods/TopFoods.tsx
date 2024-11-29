import React, { useEffect, useState } from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { getBrands } from '../../requests/requests'
import FastFood from './fast-food-title-vector-23507832-removebg-preview.png'
import './TopFoods.css'
interface Brand {
	id: string
	name: string
	fileName: string
}

interface RootState {
	redus: {
		AllBrands: Brand[]
	}
}

const TopFoods: React.FC = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const data = useSelector((store: RootState) => store.redus.AllBrands)
	const [_, setLoading] = useState(true)

	useEffect(() => {
		dispatch(getBrands() as any).then(() => {
			setLoading(false)
		})
	}, [dispatch])


	const { setLoading: setAppLoading } =
		useOutletContext<{ setLoading: (state: boolean) => void }>() || {}

	const handleProductClick = (productId: string) => {
		setAppLoading?.(true)
		setTimeout(() => {
			window.scrollTo(0, 0)
			navigate(`/ProductByBrand/:${productId}`)
		}, 300)
	}

	const getRandomGradient = (): string => {
		const gradients = [
			'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
		]
		return gradients[Math.floor(Math.random() * gradients.length)]
	}

	return (
		<div className='our-brands-container rounded-[10px] py-12 px-6 bg-gradient-to-r from-blue-50 to-blue-100'>
			<div className='pb-8 text-center relative bottom-[30px]'>
				<p className='text-4xl font-extrabold flex justify-center items-center text-gray-900  tracking-wider'>
					Our Top Best{' '}
					<img
						className=' w-[220px] h-[130px] relative'
						src={FastFood}
						alt=''
					/>
				</p>
				<p className='text-lg text-gray-600 relative bottom-[40px] dark:text-gray-400 mt-2'>
					Handpicked selection of the best brands for you
				</p>
			</div>
			<Swiper
				spaceBetween={30}
				breakpoints={{
					0: {
						slidesPerView: 1,
					},
					768: {
						slidesPerView: 2,
					},
					1024: {
						slidesPerView: 4,
					},
				}}
				modules={[Navigation]}
				className='rounded-lg relative bottom-[20px] w-full'
			>
				{data?.map((elem) => {
					const bgGradient = getRandomGradient()
					return (
						<SwiperSlide
							key={elem.id}
							className='grid-cols-3 flex justify-center items-center'
							style={{
								height: 'fit-content',
								width: '100%',
								borderRadius: '10px',
							}}
						>
							<div
								className='card-container text-white rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl'
								style={{ backgroundImage: bgGradient }}
								onClick={() => handleProductClick(elem.id)}
							>
								<div className='sm:h-[320px] md:h-[340px] flex flex-col justify-between sm:pb-[330px] sm:pt-[20px] md:p-6'>
									<p className='text-2xl font-bold mb-2'>{elem.name}</p>
									<div className='flex justify-center items-center w-[100%]'>
										<img
											src={`${import.meta.env.VITE_APP_FILES_URL}${
												elem.fileName
											}`}
											alt={elem.name}
											className='w-full h-full object-contain'
										/>
									</div>
									<div className='flex justify-center'>
										<p className='absolute bottom-0 flex justify-center pb-[30px]'>
											<span className='inline-block bg-white text-black py-2 px-4 rounded-full text-sm font-semibold cursor-pointer hover:bg-gray-200 transition'>
												See Now
											</span>
										</p>
									</div>
								</div>
							</div>
						</SwiperSlide>
					)
				})}
			</Swiper>
		</div>
	)
}

export default TopFoods
