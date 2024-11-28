import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import '../home/home.css'

import Products from '../../components/Products/Products'
import img4 from './customer.53ad01c3.svg'
import img3 from './intersect.4d6560a0.svg'
import img2 from './secure.bcf2990d.svg'
import img1 from './vector.da72236a.svg'

import 'react-loading-skeleton/dist/skeleton.css'

import Banner from '../../components/Banner/Banner'
import SideBar from '../../components/SideBar/SideBar'
import {
	getdata,
	getMoreSubCategories,
	getproduct,
} from '../../requests/requests'

const Home: React.FC = () => {
	const dispatch = useDispatch()
	const [modalcart, setModalCart] = useState<boolean>(false)

	useEffect(() => {
		dispatch(getdata() as any)
		dispatch(getproduct() as any)
	}, [dispatch])

	useEffect(() => {
		if (modalcart) {
			const timer = setTimeout(() => {
				setModalCart(false)
			}, 5000)
			return () => clearTimeout(timer)
		}
	}, [modalcart])

	useEffect(() => {
		dispatch(getMoreSubCategories() as any)
	}, [dispatch])

	const [_, setBgColor] = useState<string>('')

	useEffect(() => {
		// Function to generate a random color
		const generateRandomColor = () => {
			const letters = '0123456789ABCDEF'
			let color = '#'
			for (let i = 0; i < 6; i++) {
				color += letters[Math.floor(Math.random() * 16)]
			}
			return color
		}

		// Set the random color as the background color
		setBgColor(generateRandomColor())
	}, [])

	return (
		<main>
			<div className='header'>
				<section className='pt-[40px] w-[100%]'>
					<section className='homeCounter w-[100%] items-end gap-[40px]'>
						<section>
							<SideBar />
						</section>
						<section>
							<Banner />
						</section>
					</section>
					<section className='text-black pt-[110px] pb-[60px] flex flex-wrap gap-[40px] justify-around'>
						<div className='flex items-center space-x-2'>
							<img src={img3} alt='' />
							<div>
								<h4 className='font-bold'>FREE, FAST DELIVERY</h4>
								<p className='text-sm text-gray-600'>
									For all orders over $140
								</p>
							</div>
						</div>
						<div className='flex items-center space-x-2'>
							<img src={img4} alt='' />
							<div>
								<h4 className='font-bold'>24/7 CUSTOMER SERVICE</h4>
								<p className='text-sm text-gray-600'>
									Friendly 24/7 customer support
								</p>
							</div>
						</div>
						<div className='flex items-center space-x-2'>
							<img src={img2} alt='' />
							<div>
								<h4 className='font-bold'>LOW PRICE GUARANTEE</h4>
								<p className='text-sm text-gray-600'>
									We offer competitive prices
								</p>
							</div>
						</div>
						<div className='flex items-center space-x-2'>
							<img src={img1} alt='' />
							<div>
								<h4 className='font-bold'>MONEY BACK GUARANTEE</h4>
								<p className='text-sm text-gray-600'>
									We return money within 30 days
								</p>
							</div>
						</div>
					</section>
					<section className='pt-[0px]'>
						<Products />
					</section>
				</section>
			</div>
		</main>
	)
}

export default Home
