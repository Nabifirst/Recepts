import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import {
	Avatar,
	Box,
	Rating,
	styled,
	Tab,
	Tabs,
	TextField,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import { useParams } from 'react-router-dom'
import { getproduct, getProductById, postreview } from '../requests/requests'
import { AppDispatch } from '../store/store'

type AttributeValue = {
	id: number
	name: string
	value: { value: string; isVisible: boolean }
}

type Attribute = {
	name: string
	attributeValues: AttributeValue[]
}

type Review = {
	id: number
	name: string
	raiting: number
	description: string
	content: string
}

type ProductData = {
	attributes: Attribute[]
	reviews: Review[]
}

type RootState = {
	redus: {
		ProductById: {
			data: ProductData
		}
	}
}

const StyledTabs = styled(Tabs)({
	backgroundColor: '#f5f5f5',
	borderRadius: '12px',
	boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
	'& .MuiTab-root': {
		textTransform: 'none',
		fontWeight: 'bold',
		fontSize: '16px',
		color: '#888',
		minWidth: 120,
		padding: '12px 20px',
		transition: 'color 0.3s ease',
		'&:hover': {
			color: '#007FFF',
		},
		'&.Mui-selected': {
			color: '#007FFF',
			borderBottom: '3px solid #007FFF',
		},
	},
})

const StyledTabPanel = styled(Box)(({ theme }) => ({
	padding: '20px',
	paddingBottom: '40px',
	backgroundColor: '#fff',
	borderRadius: '10px',
	boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
	marginTop: '16px',
	transition: 'opacity 0.5s ease',
	[theme.breakpoints.down('md')]: {
		padding: '0px',
		paddingBottom: '0px',
	},
}))

type TabPanelProps = {
	children?: React.ReactNode
	value: number
	index: number
}

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
	return (
		<StyledTabPanel
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Typography>{children}</Typography>}
		</StyledTabPanel>
	)
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	}
}

const ReviewPanel: React.FC = () => {
	const dispatch: AppDispatch = useDispatch()
	const data = useSelector((store: RootState) => store.redus.ProductById)
	const { id } = useParams<{ id: string }>()

	const id1 = id?.slice(1) ?? ''

	useEffect(() => {
		dispatch(getproduct() as any)
	}, [dispatch])

	useEffect(() => {
		if (id1) {
			dispatch(getProductById(id1) as any)
		}
	}, [dispatch, id1])

	const attributeNames = data?.data?.attributes?.map((attr) => attr.name) || []

	const [value1, setValue1] = useState<number>(1)

	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		setValue1(newValue)
	}

	const [open1, setOpen1] = useState<boolean>(false)

	const handleOpen1 = () => setOpen1(true)
	const handleClose1 = () => setOpen1(false)

	const reviews = data?.data?.reviews || []

	const ratingCounts: { [key: number]: number } = {
		5: 0,
		4: 0,
		3: 0,
		2: 0,
		1: 0,
	}
	reviews.forEach((review) => {
		ratingCounts[review.raiting]++
	})

	const [raitingValue, setRaitingValue] = useState<number>(0)
	const [descriptionReview, setDescriptionReview] = useState<string>('')
	const [nameReviewer, setNameReviewer] = useState<string>('')

	return (
		<div>
			<div>
				<Box
					className=' sm:hidden md:block'
					sx={{
						width: '100%',
						padding: '24px',
						backgroundColor: '#f0f2f5',
						marginTop: '20px',
						borderRadius: '5px',
					}}
				>
					<Box
						sx={{
							border: 0,
							marginTop: '20px',
							paddingTop: '20px',
							borderRadius: '10px',
						}}
					>
						<StyledTabs
							value={value1}
							onChange={handleChange}
							aria-label='beautiful tabs example'
							centered
						>
							<Tab
								className=' sm:hidden md:block'
								sx={{ display: 'none' }}
								label='Description'
								{...a11yProps(0)}
							/>
							<Tab
								className=' sm:hidden md:block '
								label='Oтзывы'
								{...a11yProps(1)}
							/>
							<Tab
								className=' sm:hidden md:block'
								label='Список Ингредиентов'
								{...a11yProps(2)}
							/>
						</StyledTabs>
					</Box>

					<TabPanel value={value1} index={2}>
						<div className='w-full mx-auto mt-5 rounded-lg border border-gray-200 shadow-xl bg-white'>
							<div>
								{attributeNames.map((name, index) => (
									<div key={index} className='border-b last:border-b-0'>
										{/* Always show attribute header */}
										<div className='flex cursor-pointer items-center justify-between px-6 py-4 bg-gray-100 hover:bg-gray-200 transition-all duration-300'>
											<span className='text-lg font-semibold text-blue-600'>
												{name}
											</span>
											<span className='text-xl text-gray-500'>-</span>
										</div>

										{/* Always show attribute content */}
										<div className='transition-all duration-500 ease-in-out bg-white shadow-md rounded-lg p-6'>
											<div className='space-y-4'>
												{data?.data?.attributes?.[index]?.attributeValues?.map(
													(attrValue, attrIndex) =>
														attrValue?.value?.isVisible && (
															<div
																key={attrValue.id}
																className={`flex justify-between items-center px-4 py-2 rounded-lg ${
																	attrIndex % 2 === 1
																		? 'bg-gray-50'
																		: 'bg-white'
																}`}
															>
																<span className='font-bold text-gray-700'>
																	{attrValue.name}
																</span>
																<span className='text-gray-500'>
																	{attrValue?.value?.value || 'N/A'}
																</span>
															</div>
														)
												)}
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</TabPanel>

					<TabPanel value={value1} index={1}>
						<Box
							className='p-4 sm:p-0 '
							sx={{ display: 'flex', justifyContent: 'space-between' }}
						>
							{/* Rating Summary */}
							<Box className='flex justify-between sm:block w-[100%] md:flex  gap-3 p-3 rounded-lg shadow-md bg-gray-100'>
								<Box className='md:w-[30%] sm:w-[100%] border  border-gray-300  p-5 rounded-md  bg-white '>
									<div className='flex items-center w-full justify-between'>
										<Typography
											variant='h2'
											fontFamily='cursive'
											color='primary.main'
											sx={{
												mb: 1,
												fontSize: '2.5rem',
												width: '60px',
												overflow: 'hidden',
											}}
										>
											{data?.data?.reviews?.reduce(
												(acc, elem) => acc + elem.raiting,
												0
											) / data?.data?.reviews?.length || '0.0'}
											{data?.data?.reviews?.length == 2 ? '' : '.0'}
										</Typography>
										<div>
											<Rating
												value={raitingValue}
												readOnly
												precision={0.1}
												icon={
													<StarIcon fontSize='inherit' sx={{ color: 'gold' }} />
												}
												emptyIcon={<StarBorderIcon fontSize='inherit' />}
											/>

											<Typography
												variant='body2'
												color='text.secondary'
												sx={{ mb: 2 }}
											>
												{data?.data?.reviews?.length} Product Ratings
											</Typography>
										</div>
									</div>
									<Box>
										{[5, 4, 3, 2, 1].map((value) => (
											<Box
												key={value}
												sx={{
													display: 'flex',
													alignItems: 'center',
													paddingBottom: '10px',
												}}
											>
												<Rating
													name='rating'
													value={value}
													readOnly
													icon={
														<StarIcon
															fontSize='inherit'
															sx={{ color: 'gold' }}
														/>
													}
													emptyIcon={<StarBorderIcon fontSize='inherit' />}
													size='small'
													sx={{ mr: 1 }}
												/>
												<Box
													sx={{
														flexGrow: 1,
														bgcolor: value === 5 ? 'primary.main' : 'grey.300',
														height: 4,
														borderRadius: 2,
													}}
												/>
												<Typography sx={{ ml: 1 }}>
													{ratingCounts[value] || 0}
												</Typography>
											</Box>
										))}
									</Box>
									<div className='border-t-[1px] pt-[25px] font-sans text-[18px] text-gray-800 mt-4'>
										<p>Обзор этого продукта</p>
										<p className='text-[15px] text-gray-600 pb-[10px]'>
											Поделитесь своими мыслями с другими клиентами
										</p>
									</div>
									<p
										onClick={handleOpen1}
										className='bg-primary.main bg-black cursor-pointer mt-[10px] p-[10px] text-white text-center rounded-md hover:bg-primary.dark transition duration-300'
									>
										Написать отзыв
									</p>
								</Box>

								{/* Customer Reviews */}
								<Box className='md:w-2/3 sm:w-[100%] sm:mt-[15px] md:mt-[0px] bg-white rounded-md shadow p-3'>
									<Typography
										className='pl-[15px] border-b-[1px] pb-[20px]'
										variant='h6'
										fontWeight='bold'
										sx={{ mb: 2, color: 'primary.dark' }}
									>
										Отзывы клиентов ({data?.data?.reviews?.length})
									</Typography>
									<div className=' max-h-[350px] overflow-auto'>
										{data?.data?.reviews?.map((review) => (
											<Box
												key={review.id}
												sx={{
													mb: 2,
													p: 2,
													borderRadius: 2,
													bgcolor: '#f6f6f6',
													boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
												}}
											>
												<div className='flex w-full justify-between items-center'>
													<div className='flex items-center'>
														<Avatar
															sx={{
																mr: 2,
																bgcolor: 'primary.main',
																color: '#fff',
																width: 36,
																height: 36,
																fontSize: '1rem',
															}}
														>
															{review.name[0]}
														</Avatar>
														<p className='font-sans text-gray-800 font-semibold text-[16px]'>
															{review.name.trim() || 'Anonymous'}
														</p>
													</div>
													<Rating
														value={review.raiting}
														readOnly
														icon={
															<StarIcon
																fontSize='inherit'
																sx={{ fontSize: 17, color: 'gold' }}
															/>
														}
														emptyIcon={
															<StarBorderIcon
																fontSize='inherit'
																sx={{ fontSize: 17 }}
															/>
														}
													/>
												</div>
												<p className='font-sans text-gray-700 text-[15.5px] border-b-[1px] pb-[15px] mt-[20px]'>
													{review.content}
												</p>
											</Box>
										))}
									</div>
								</Box>
							</Box>

							{/* Modal for Writing a Review */}
							<Modal closeIcon open={open1} onClose={handleClose1}>
								<Box
									sx={{
										p: 4,
										bgcolor: 'background.paper',
										borderRadius: 2,
										margin: 'auto',
									}}
								>
									<Typography variant='h4' mb={2}>
										Напишите отзыв о продукте
									</Typography>
									<Typography variant='body1' mb={2}>
										Пожалуйста, заполните все поля ниже, чтобы сообщить нам о
										своем опыт работы с этим продуктом.
									</Typography>
									<Box sx={{ mb: 2 }}>
										<Typography variant='body1' mb={1}>
											Ваше имя *
										</Typography>
										<TextField
											value={nameReviewer}
											onChange={(e) => setNameReviewer(e.target.value)}
											fullWidth
											multiline
											rows={0.5}
											variant='outlined'
										/>
									</Box>
									<Box sx={{ mb: 2 }}>
										<Typography variant='body1' mb={1}>
											Ваш рейтинг *
										</Typography>
										<Rating
											name='rating'
											value={raitingValue}
											onChange={(event: any) =>
												setRaitingValue(event.target.value)
											}
											icon={
												<StarIcon fontSize='inherit' sx={{ fontSize: 50 }} />
											}
											emptyIcon={
												<StarBorderIcon
													fontSize='inherit'
													sx={{ fontSize: 50 }}
												/>
											}
										/>
									</Box>
									<Box sx={{ mb: 2 }}>
										<Typography variant='body1' mb={1}>
											Ваш отзыв *
										</Typography>
										<TextField
											value={descriptionReview}
											onChange={(e) => setDescriptionReview(e.target.value)}
											fullWidth
											multiline
											rows={4}
											variant='outlined'
										/>
									</Box>

									<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
										<input
											type='checkbox'
											className='border-gray-300'
											style={{
												width: '20px',
												height: '25px',
											}}
										/>
										<Typography variant='body1' ml={1}>
											Сохраните мое имя, адрес электронной почты и веб-сайт в
											этом браузере, чтобы в следующий раз я прокомментирую.
										</Typography>
									</Box>
									<Box>
										<p
											className='bg-gray-800 cursor-pointer p-[15px] text-white text-center'
											onClick={() => {
												dispatch(
													postreview({
														content: descriptionReview,
														raiting: +raitingValue,
														name: nameReviewer,
														productId: +id1,
													})
												).then(() => {
													dispatch(getProductById(id1) as any)
												})
												setOpen1(false)
											}}
										>
											Написать отзыв
										</p>
									</Box>
								</Box>
							</Modal>
						</Box>
					</TabPanel>
				</Box>
			</div>
		</div>
	)
}

export default ReviewPanel
