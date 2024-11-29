import FavoriteIcon from '@mui/icons-material/Favorite'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import { getdata, getsearchprodusct } from '../../requests/requests'

interface State {
	redus: {
		data: any[] 
		databyid: any[]
		BySubCategory: any[]
		inpreg: string
		inpreg1: string
		searchinp: string
		datasearch: any[]
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
		const checkLikeAnimation = () => {
			const isAnimationActive =
				localStorage.getItem('showLikeAnimation') === 'true'
			setShowLikeAnimation(isAnimationActive)
		}

		const intervalId = setInterval(checkLikeAnimation, 500)

		return () => clearInterval(intervalId)
	}, [])

	return (
		<div className=' bg-gray-400 bg-transparent'>
			<div>
				{showLikeAnimation && (
					<div className='fixed top-0 left-0 w-full h-full flex justify-center items-center z-50'>
						<FavoriteIcon
							className='like-icon' 
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
