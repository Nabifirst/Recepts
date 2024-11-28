import { jwtDecode } from 'jwt-decode' // Adjust if your import is different
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, register } from '../../requests/requests'
import { AppDispatch } from '../../store/store' // Adjust this import based on your store setup
import img1 from './user-icon-on-transparent-background-free-png.webp'

// Define the structure of the decoded JWT
interface DecodedToken {
	FullName: string
	UserName: string
}

// Define user information state type
interface UserInfo {
	firstName: string
	phoneNumber: string
}

// Define response structure for login/register if applicable
interface LoginResponse {
	meta: { requestStatus: string }
	payload: string
}

interface RegisterResponse {
	meta: { requestStatus: string }
	payload: string
}

const CreateAccount: React.FC = () => {
	const [isSignIn, setIsSignIn] = useState<boolean>(false)

	const [firstname, setFirstname] = useState<string>('')
	const [lastname, setLastname] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const dispatch = useDispatch<AppDispatch>()
	const navigate = useNavigate()

	const [token, setToken] = useState<string | null>(
		localStorage.getItem('authToken')
	)
	const [_, setUserInfo] = useState<UserInfo>({
		firstName: '',
		phoneNumber: '',
	})

	const toggleForm = () => setIsSignIn((prev) => !prev)

	const handleSignIn = async () => {
		try {
			const response: LoginResponse = (await dispatch(
				login({
					phoneNumber: email,
					password,
				})
			)) as unknown as LoginResponse // Adjust if your middleware types are set up differently

			if (response.meta.requestStatus === 'fulfilled') {
				const token = response.payload
				if (token) {
					localStorage.setItem('authToken', token)
					setToken(token)
					navigate('/')
				}
			} else {
				console.error('Login failed', response)
			}
		} catch (error) {
			console.error('An error occurred during login:', error)
		}
	}

	useEffect(() => {
		if (token) {
			try {
				const decodedToken = jwtDecode<DecodedToken>(token)
				const firstName = decodedToken.FullName || 'N/A'
				const phoneNumber = decodedToken.UserName || 'N/A'
				localStorage.setItem('userId', decodedToken.FullName)
				setUserInfo({ firstName, phoneNumber })
				navigate('/')
			} catch (error) {
				console.error('Error decoding JWT:', error)
			}
		}
	}, [token, navigate])

	const handleCreateAccount = async () => {
		try {
			const response: RegisterResponse = (await dispatch(
				register({
					firstName: firstname,
					lastName: lastname,
					phoneNumber: email,
					password,
					confirmPassword: password,
				})
			)) as unknown as RegisterResponse

			if (response.meta.requestStatus === 'fulfilled') {
				setIsSignIn(true)
			} else {
				console.error('Registration failed', response)
			}
		} catch (error) {
			console.error('An error occurred during registration:', error)
		}
	}

	return (
		<div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6'>
			<div className='bg-white shadow-xl rounded-2xl p-10 max-w-lg w-full'>
				<div className='flex justify-center text-[39px] pb-[15px] text-center'>
					<img className='w-[190px]' src={img1} alt='User Icon' />
				</div>

				{isSignIn ? (
					<div>
						<div className='mb-5'>
							<label className='block text-gray-700 text-sm font-bold'>
								Phone Number
							</label>
							<input
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								type='Phone Number'
								placeholder='example@mail.com'
								className='w-full mt-2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow shadow-sm'
							/>
						</div>
						<div className='mb-5'>
							<label className='block text-gray-700 text-sm font-bold'>
								Password
							</label>
							<input
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								type='password'
								placeholder='••••••••'
								className='w-full mt-2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow shadow-sm'
							/>
						</div>
						<button
							onClick={handleSignIn}
							className='w-full bg-purple-600 text-white rounded-lg h-[40px] hover:bg-purple-700 transition-colors duration-300 shadow-md'
						>
							Sign In
						</button>
					</div>
				) : (
					<div>
						<div className='mb-5'>
							<label className='block text-gray-700 text-sm font-bold'>
								First Name
							</label>
							<input
								value={firstname}
								onChange={(e) => setFirstname(e.target.value)}
								type='text'
								placeholder='John'
								className='w-full mt-2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow shadow-sm'
							/>
						</div>
						<div className='mb-5'>
							<label className='block text-gray-700 text-sm font-bold'>
								Last Name
							</label>
							<input
								value={lastname}
								onChange={(e) => setLastname(e.target.value)}
								type='text'
								placeholder='Doe'
								className='w-full mt-2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow shadow-sm'
							/>
						</div>
						<div className='mb-5'>
							<label className='block text-gray-700 text-sm font-bold'>
								PhoneNumber
							</label>
							<input
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								type='email'
								placeholder='+992'
								className='w-full mt-2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow shadow-sm'
							/>
						</div>
						<div className='mb-5'>
							<label className='block text-gray-700 text-sm font-bold'>
								Password
							</label>
							<input
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								type='password'
								placeholder='••••••••'
								className='w-full mt-2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow shadow-sm'
							/>
						</div>

						<p className='text-gray-500 text-sm mb-6'>
							By creating an account, you agree to our
							<a
								href='/terms-of-service'
								className='text-purple-600 hover:underline'
							>
								{' '}
								Terms of Service
							</a>{' '}
							and
							<a
								href='/privacy-policy'
								className='text-purple-600 hover:underline'
							>
								{' '}
								Privacy Policy
							</a>
							.
						</p>
						<button
							onClick={handleCreateAccount}
							className='w-full bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors h-[40px] duration-300 shadow-md'
						>
							Register Now
						</button>
					</div>
				)}

				<p className='text-center text-gray-600 mt-8'>
					{isSignIn ? (
						<>
							Don't have an account?{' '}
							<button
								onClick={toggleForm}
								className='text-purple-600 hover:underline'
							>
								Create Account
							</button>
						</>
					) : (
						<div className='flex w-[100%] gap-[5px] justify-center'>
							Already have an account?{' '}
							<p
								onClick={toggleForm}
								className='text-purple-600 cursor-pointer hover:underline'
							>
								Sign in
							</p>
						</div>
					)}
				</p>
			</div>
		</div>
	)
}

export default CreateAccount
