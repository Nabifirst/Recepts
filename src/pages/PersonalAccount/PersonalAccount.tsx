import { Home, Logout, Person, Settings } from '@mui/icons-material'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import {
	Avatar,
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Rating,
	TextField,
	Typography,
} from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSubCategory } from '../../requests/requests'
import { AppDispatch, RootState } from '../../store/store' // Adjust based on your store setup

const drawerWidth = 240

// Define types for form data and product
interface FormData {
	BrandId: number
	DiscountPrice: number
	Raiting: string
	Price: number
	Quantity: number
	Name: string
	Code: number
	CategoryId: string
	HasDiscount: boolean
	Description: string
	Images: File | null
}

interface Product extends FormData {
	id: number
	imageUrl: string | null
}

const PersonalAccount: React.FC = () => {
	const [mobileOpen, setMobileOpen] = useState<boolean>(false)
	const [openModal, setOpenModal] = useState<boolean>(false)
	const [formData, setFormData] = useState<FormData>({
		BrandId: 3,
		DiscountPrice: 3,
		Raiting: '',
		Price: 3,
		Quantity: 3,
		Name: '',
		Code: Math.random(),
		CategoryId: '',
		HasDiscount: true,
		Description: '',
		Images: null,
	})

	const [previewImage, setPreviewImage] = useState<string | null>(null)
	const [products, setProducts] = useState<Product[]>([])
	const [raitingValue, setRaitingValue] = useState<number>(0)

	const dispatch = useDispatch<AppDispatch>()
	const categories = useSelector(
		(state: RootState) => state.redus.AllSubCategory
	)

	useEffect(() => {
		dispatch(getSubCategory())
	}, [dispatch])

	useEffect(() => {
		const storedProducts = localStorage.getItem('products')
		if (storedProducts) {
			setProducts(JSON.parse(storedProducts))
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('products', JSON.stringify(products))
	}, [products])

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen)
	}

	const handleOpenModal = () => {
		setOpenModal(true)
	}

	const handleCloseModal = () => {
		setOpenModal(false)
	}

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value, files } = e.target

		if (name === 'Images' && files) {
			const file = files[0]
			if (file) {
				const reader = new FileReader()
				reader.onload = () => {
					setPreviewImage(reader.result as string)
				}
				reader.readAsDataURL(file)
			}
			setFormData((prevState) => ({ ...prevState, Images: file }))
		} else {
			setFormData((prevState) => ({ ...prevState, [name]: value }))
		}
	}

	const handleDelete = (id: number) => {
		setProducts((prevProducts) =>
			prevProducts.filter((product) => product.id !== id)
		)
		alert('Product deleted successfully!')
	}

	const handleSubmit = async () => {
		const data = new FormData()
		for (const key in formData) {
			const value = formData[key as keyof FormData]
			if (value !== null) {
				data.append(key, value instanceof File ? value : String(value))
			}
		}

		try {
			const response = await fetch(
				'https://webshopapi.softclub.tj/api/products',
				{
					method: 'POST',
					body: data,
				}
			)

			if (response.ok) {
				const newProduct: Product = {
					...formData,
					id: Date.now(),
					imageUrl: formData.Images
						? URL.createObjectURL(formData.Images)
						: null,
				}
				setProducts((prevProducts) => [...prevProducts, newProduct])
				alert('Receipt posted successfully!')
				setOpenModal(false)
			} else {
				alert('Failed to post receipt.')
			}
		} catch (error) {
			console.error(error)
			alert('Error occurred while posting receipt.')
		}
	}

	let username = localStorage.getItem('userId')

	const drawer = (
		<Box sx={{ bgcolor: 'background.paper' }}>
			<Box sx={{ textAlign: 'center', py: 3 }}>
				<Avatar
					sx={{ width: 80, height: 80, mx: 'auto', bgcolor: 'primary.main' }}
				>
					{username?.[0]}
				</Avatar>
				<Typography variant='h6' sx={{ mt: 1 }}>
					{username}
				</Typography>
			</Box>
			<List>
				{[
					{ text: 'Home', icon: <Home /> },
					{ text: 'Products', icon: <Person /> },
					{ text: 'Settings', icon: <Settings /> },
					{ text: 'Logout', icon: <Logout /> },
				].map((item, index) => (
					<ListItem
						component='button'
						key={index}
						style={{ paddingLeft: '40px', cursor: 'pointer' }}
					>
						<ListItemIcon>{item.icon}</ListItemIcon>
						<ListItemText primary={item.text} />
					</ListItem>
				))}
			</List>
		</Box>
	)

	return (
		<div>
			<Box sx={{ display: 'flex' }}>
				<Box component='nav'>
					<Drawer
						variant='temporary'
						open={mobileOpen}
						onClose={handleDrawerToggle}
						ModalProps={{ keepMounted: true }}
						sx={{
							display: { xs: 'block', sm: 'none' },
							'& .MuiDrawer-paper': {
								boxSizing: 'border-box',
								width: drawerWidth,
							},
						}}
					>
						{drawer}
					</Drawer>
					<Drawer
						variant='permanent'
						sx={{
							display: { xs: 'none', sm: 'block' },
							'& .MuiDrawer-paper': {
								boxSizing: 'border-box',
								width: drawerWidth,
							},
						}}
						open
					>
						{drawer}
					</Drawer>
				</Box>
			</Box>
			<div className='pl-[240px] w-[100%]'>
				<div className='text-center'>
					<div className='flex mt-[40px] justify-center cursor-pointer'>
						<p
							className='p-[10px] w-[180px] text-center bg-gray-800 text-white'
							onClick={handleOpenModal}
						>
							Post Receipt
						</p>
					</div>
				</div>
				<div className='mt-8 pl-[100px]'>
					{products.map((product) => (
						<div
							key={product.id}
							className='product-card p-[4px]'
							style={{ width: '100%', maxWidth: '250px' }}
						>
							<div className='relative'>
								<img
									src={product.imageUrl || ''}
									alt={product.Name}
									style={{
										width: '80%',
										borderRadius: '10px',
										height: '200px',
									}}
								/>
							</div>
							<div className='mt-2 text-start'>
								<h1 className='text-[14px] font-semibold'>
									{product.Name.length > 20
										? product.Name.slice(0, 15) + '...'
										: product.Name}
								</h1>
							</div>
							<Box sx={{ '& > legend': { mt: 2 } }}>
								<Rating
									name='simple-controlled'
									value={Number(product.Raiting)}
									readOnly
								/>
							</Box>
							<div>
								<h1 className='text-gray-500 text-sm text-start'>
									Sold: {product.Quantity}
								</h1>
							</div>
							<div className='flex items-center w-[100%] gap-[5px]'>
								<div className='mt-2 bg-red-600 w-[100%] flex justify-center gap-[5px] items-center rounded-[12px] text-white text-[16px] font-bold h-[35px]'>
									<button onClick={() => handleDelete(product.id)}>
										Delete
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<Dialog
				open={openModal}
				onClose={handleCloseModal}
				maxWidth='xs'
				fullWidth
			>
				<DialogTitle>Post Receipt</DialogTitle>
				<DialogContent>
					{previewImage && (
						<img
							src={previewImage}
							alt='Preview'
							style={{ width: '100%', maxWidth: '200px', borderRadius: '8px' }}
						/>
					)}
					<Box sx={{ mb: 2 }}>
						<Typography component='legend'>Rating</Typography>
						<Rating
							name='Raiting'
							value={raitingValue}
							onChange={(newValue) => {
								setRaitingValue(newValue as any)
								setFormData((prevState) => ({
									...prevState,
									Raiting: String(newValue || 0),
								}))
							}}
							icon={<StarIcon fontSize='inherit' sx={{ fontSize: 50 }} />}
							emptyIcon={
								<StarBorderIcon fontSize='inherit' sx={{ fontSize: 50 }} />
							}
						/>
					</Box>
					<TextField
						select
						name='CategoryId'
						value={formData.CategoryId}
						onChange={handleInputChange}
						SelectProps={{ native: true }}
						fullWidth
						variant='outlined'
					>
						{categories.map((category: any) => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						))}
					</TextField>
					{['Name', 'Description'].map((field) => (
						<TextField
							key={field}
							margin='dense'
							name={field}
							label={field}
							type='text'
							fullWidth
							variant='outlined'
							onChange={handleInputChange}
						/>
					))}
					<TextField
						margin='dense'
						name='Images'
						type='file'
						fullWidth
						variant='outlined'
						onChange={handleInputChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseModal} color='secondary'>
						Cancel
					</Button>
					<Button onClick={handleSubmit} color='primary'>
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default PersonalAccount
