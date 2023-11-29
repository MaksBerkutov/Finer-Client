import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MusicPage from '@page/MusicPage/Music.jsx'
import HomePage from '@page/HomePage/Home'
import AdminPage from '@page/AdminPage/Admin'
import UserInfo from '@page/UserInfoPage/UserInfo'
import AuntificationPage from '@page/Auntification/AuntificationPage'
import React from 'react'
import AuntifactionPageCallback from '@page/Auntification/AuntifactionPageCallback'
import MainPage from '@page/MainPage/MainPage.jsx'
import ErrorPage from '@page/ErrorPage/ErrorPage.jsx'

function App() {
	return (
		<div>
			<Routes>
				<Route path='/' element={<AuntificationPage />} />
				<Route path='/error' element={<ErrorPage />} />

				<Route path='/auntification' element={<AuntifactionPageCallback />} />
				<Route path='/menu' element={<MainPage />}>
					<Route path='music' element={<MusicPage />} />
					<Route path='admin' element={<AdminPage />} />
					<Route path='me' element={<UserInfo />} />
					<Route path='contact' element={<HomePage />} />
				</Route>
				<Route path='*' element={<h2>Ресурс не найден</h2>} />
			</Routes>
		</div>
	)
}

export default App
