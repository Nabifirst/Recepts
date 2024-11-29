import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import img1 from '../pages/ProductInfo/motta.uix.store_product_11-inch-tablet-pro-2020-space-gray_-transformed.png'
import { getProductById } from '../requests/requests'
import { AppDispatch, RootState } from '../store/store'

interface ProductImage {
	fileName: string
}

interface Product {
	name: string
	description: string
	images: ProductImage[]
}

interface ProductByIdState {
	data: Product | null
}

const InfoPanel: React.FC = () => {
	const dispatch: AppDispatch = useDispatch()
	const data = useSelector((store: RootState) => store.redus.ProductById) as
		| ProductByIdState
		| any

	const [activeImage, setActiveImage] = useState<ProductImage | null>(
		data?.data?.images?.[0] || null
	)
	const [_, setMainImage] = useState<string>('')
	const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({
		backgroundPosition: 'center',
		backgroundSize: 'contain',
		backgroundRepeat: 'no-repeat',
	})

	const { id } = useParams<{ id: string }>()

	const id1 = id?.slice(1) || ''

	useEffect(() => {
		if (id1) {
			dispatch(getProductById(id1))
		}
	}, [dispatch, id1])

	useEffect(() => {
		if (data?.data?.images?.length) {
			setActiveImage(data?.data?.images?.[0])
		}
	}, [data])

	const handleThumbnailClick = (image: ProductImage) => {
		setMainImage(`${import.meta.env.VITE_APP_FILES_URL}${image.fileName}`)
		setActiveImage(image)
	}

	const isActive = (image: ProductImage | null): boolean => {
		return image?.fileName === activeImage?.fileName
	}

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
		const x = ((e.clientX - left) / width) * 100
		const y = ((e.clientY - top) / height) * 100
		setZoomStyle({
			backgroundPosition: `${x}% ${y}%`,
			backgroundSize: '200%',
		})
	}

	const handleMouseLeave = () => {
		setZoomStyle({
			backgroundPosition: 'center',
			backgroundSize: 'contain',
			backgroundRepeat: 'no-repeat',
		})
	}

	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpen = () => {
		setIsModalOpen(true);
	};

	const handleClose = () => {
		setIsModalOpen(false);
	};


	return (
		<div className='w-full'>
			{data && (
				<div className='sm:block md:flex items-start'>
					<div>
						<div
							className={`sm:w-full sm:h-[350px] sxm:h-[450px] md:w-[550px] md:h-[250px] ${isActive(
								data?.data?.images?.[0] as any
							)}`}
							onMouseMove={handleMouseMove}
							onMouseLeave={handleMouseLeave}
							style={{
								backgroundImage: `url(${import.meta.env.VITE_APP_FILES_URL}${
									activeImage?.fileName
								})`,
								position: 'relative',
								...zoomStyle,
							}}
						></div>

						<div style={{ position: 'relative', bottom: '1' }}>
							{data?.data?.images?.filter?.((elem: ProductImage) =>
								elem.fileName.includes('mp4')
							).length === 0 ? (
								''
							) : (
								<img
									className='w-[50px] h-[50px] rounded-full relative bottom-4'
									src={img1}
									alt=''
									style={{
										boxShadow:
											'0 -5px 8px rgba(0, 0, 0, 0.5), 0 5px 8px rgba(0, 0, 0, 0.5)',
										transition: 'transform 0.3s ease',
									}}
									onMouseEnter={(e) =>
										(e.currentTarget.style.transform = 'translateY(-10px)')
									}
									onMouseLeave={(e) =>
										(e.currentTarget.style.transform = 'translateY(0)')
									}
									onClick={handleOpen}
								/>
							)}
						</div>
						<div>
						{isModalOpen && (
						<div
							style={{
								position: 'fixed',
								top: 0,
								left: 0,
								width: '100%',
								height: '100%',
								backgroundColor: 'rgba(0, 0, 0, 0.5)',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								zIndex: 1000,
							}}
							onClick={handleClose}
						>
							<div
								style={{
									backgroundColor: 'white',
									padding: '20px',
									borderRadius: '10px',
									position: 'relative',
								}}
								onClick={(e) => e.stopPropagation()}
							>
								<div className='flex gap-[10px] w-full p-[10px]'>
								{data?.data?.images?.filter((elem:ProductImage) => elem.fileName.includes('mp4'))?.map((elem1:ProductImage) => {
    return (
        <div key={elem1.fileName}>
            <video 
                src={`${import.meta.env.VITE_APP_FILES_URL}${elem1?.fileName}`} 
                controls 
                width="100%" 
                className=' h-[600px]' 
            />
        </div>
    );
})}

</div>
							</div>
						</div>
					)}
						</div>
						<div className=' flex gap-[10px] w-full p-[10px]'>
							{data?.data?.images
								?.filter((elem: ProductImage) => !elem.fileName.includes('mp4'))
								.map((image: ProductImage) => (
									<img
										className={`thumbnail flex w-full gap-[10px] bg-white ${
											isActive(image) ? ' border-black' : ''
										}`}
										src={`${import.meta.env.VITE_APP_FILES_URL}${
											image?.fileName
										}`}
										onClick={() => handleThumbnailClick(image)}
									/>
								))}
						</div>
					</div>

					<div className='product-details'>
						<h1>{data?.data?.name}</h1>
						<p>{data?.data?.description}</p>
					</div>
				</div>
			)}
		</div>
	)
}

export default InfoPanel
