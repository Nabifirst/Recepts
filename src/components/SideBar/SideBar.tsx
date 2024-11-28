import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getbyid, getdata } from '../../requests/requests'

interface Category {
	id: number
	name: string
	fileName: string
}

interface ReduxState {
	redus: {
		data: Category[]
		databyid: Category | null
	}
}

const SkeletonLoader: React.FC = () => {
	return (
		<div
			style={{
				padding: '10px',
				borderBottom: '1px solid #eee',
				display: 'flex',
				alignItems: 'center',
			}}
		>
			<div
				className='rounded-[50%]'
				style={{
					width: '60px',
					height: '35px',
					backgroundColor: '#f0f0f0',
					marginRight: '10px',
				}}
			></div>
			<div
				style={{
					flexGrow: 1,
					height: '16px',
					backgroundColor: '#f0f0f0',
				}}
			></div>
			<div
				style={{
					width: '303px',
					height: '13px',
					backgroundColor: '#f0f0f0',
					marginLeft: 'auto',
				}}
			></div>
		</div>
	)
}

const SideBar: React.FC = () => {
	const dispatch = useDispatch()
	const data = useSelector((state: ReduxState) => state.redus.data)
	const navigate = useNavigate()

	useEffect(() => {
		dispatch(getdata() as any)
	}, [dispatch])

	const handleProductClick = (productId: number) => {
		setTimeout(() => {
			window.scrollTo(0, 0)
			navigate(`/ProductByCategory/:${productId}`)
		})
	}

	return (
		<div style={{ fontFamily: 'Arial, sans-serif' }}>
			<div
				className=' bg-white text-black shadow-2xl border-[1px] rounded-[10px]'
				style={{ width: '100%' }}
			>
				<div
					className='pl-[10px] pr-[10px] pb-[30px] '
					style={{
						maxWidth: '270px',
						margin: '0 auto',
						borderRadius: '10px',
						overflow: 'hidden',
					}}
				>
					<div
						style={{
							padding: '10px',
							display: 'flex',
							alignItems: 'center',
							borderBottom: '1px solid #eee',
						}}
					>
						<span style={{ marginRight: '10px', fontSize: '24px' }}>📂</span>
						<span style={{ fontSize: '18px', fontWeight: 'bold' }}>
							Рецепты
						</span>
						<i
							className='fa fa-bars'
							style={{ marginLeft: 'auto', fontSize: '18px' }}
						></i>
					</div>
					<ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
						{data?.length > 0
							? data.slice(0, 8).map((el) => (
									<li
										key={el.id}
										onMouseOver={() => dispatch(getbyid(el.id) as any)}
										onClick={() => handleProductClick(el.id)}
										style={{
											display: 'flex',
											alignItems: 'center',
											padding: '10px',
											cursor: 'pointer',
											borderBottom: '1px solid #eee',
											transition: 'background-color 0.3s, color 0.3s',
										}}
										onMouseEnter={(e) =>
											(e.currentTarget.style.color = '#FEBD1F')
										}
										onMouseLeave={(e) => {
											e.currentTarget.style.backgroundColor = 'transparent'
											e.currentTarget.style.color = 'inherit'
										}}
									>
										<div className='flex items-center justify-between w-[100%] gap-[40px]'>
											<div className='flex items-center'>
												<img
													src={`${import.meta.env.VITE_APP_FILES_URL}${
														el.fileName
													}`}
													alt=''
													style={{
														width: '40px',
														marginRight: '10px',
													}}
												/>
												<h1 style={{ fontSize: '15.5px', margin: '0' }}>
													{el.name}
												</h1>
											</div>
											<div className=' '>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													version='1.0'
													width='13.000000pt'
													height='13.000000pt'
													viewBox='0 0 512.000000 512.000000'
													preserveAspectRatio='xMidYMid meet'
													className='fill-current text-black '
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
									</li>
							  ))
							: [...Array(9)].map((_, index) => <SkeletonLoader key={index} />)}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default SideBar
