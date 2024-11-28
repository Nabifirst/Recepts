import FavoriteIcon from '@mui/icons-material/Favorite'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import { getdata, getsearchprodusct } from '../../requests/requests'

// Define types for Redux state
interface State {
	redus: {
		data: any[] // Define the structure of your data
		databyid: any[] // Define the structure of your data by ID
		BySubCategory: any[] // Define the structure of BySubCategory
		inpreg: string
		inpreg1: string
		searchinp: string
		datasearch: any[] // Define the structure of search data
	}
}

const Layout: React.FC = () => {
	const dispatch = useDispatch()
	const [_, setLoading] = useState<boolean>(false)

	const searchinp = useSelector((state: State) => state.redus.searchinp)

	useEffect(() => {
		dispatch(getdata() as any)
		dispatch(getsearchprodusct(searchinp) as any)
	}, [dispatch, searchinp])

	const [showLikeAnimation, setShowLikeAnimation] = useState<boolean>(false)

	useEffect(() => {
		// Function to check the localStorage value
		const checkLikeAnimation = () => {
			const isAnimationActive =
				localStorage.getItem('showLikeAnimation') === 'true'
			setShowLikeAnimation(isAnimationActive)
		}

		// Set an interval to check the localStorage every 500ms
		const intervalId = setInterval(checkLikeAnimation, 500)

		// Cleanup the interval on component unmount
		return () => clearInterval(intervalId)
	}, [])

	return (
		<div className=' bg-gray-400 bg-transparent'>
			<div>
				{showLikeAnimation && (
					<div className='fixed top-0 left-0 w-full h-full flex justify-center items-center z-50'>
						<FavoriteIcon
							className='like-icon' // Add CSS animation class
							sx={{ fontSize: 250 }}
						/>
					</div>
				)}
				<div className='sm:pb-[60px] md:pb-[100px]'>
					<Header />
				</div>
				<Outlet context={{ setLoading }} />
				<Footer />
			</div>
		</div>
	)
}

export default Layout
