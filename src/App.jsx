import React, { lazy, Suspense, useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'

import AuthLayout from './components/auth/AuthLayout'
import AppLayout from './components/AppLayout'

import Persist from './components/Persist'
import RequireAuth from './components/auth/RequireAuth'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import { useServiceWorker } from './hooks/useServiceworker'



const LazyUserFeed = lazy(() => import('./components/UserFeed'))
const LazyForgetpassword = lazy(() => import('./components/auth/Forgetpassword'))
const LazyAllusers = lazy(() => import('./components/Allusers'))
const LazyMyPosts = lazy(() => import('./components/MyPosts'))
const LazyCreatePost = lazy(() => import('./components/CreatePost'))
import LoaderSvg from './components/loaderSvg'

import Home from './components/Home'




const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {
  const [progress, setProgress] = useState(0)
  const {
    registerServiceWorker
  } = useServiceWorker()
  useEffect(() => {
    
      const swFilepath = '/service-worker.js'
      registerServiceWorker(swFilepath)
  }, [registerServiceWorker])

  return (
    <>
      <LoadingBar
        color='#66a3ff'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path='/auth' element={<Login />} />
          <Route path='/auth/register' element={<Register />} />
          <Route path='/auth/forget-password' element={<Suspense fallback={<LoaderSvg/>}><LazyForgetpassword /></Suspense>} />
        </Route>
        {/* Public Routes */}
        <Route element={<AppLayout />}>
          {/* Private Routes */}
          <Route element={<Persist />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="/" element={<Home/>}>
                <Route index element={<Suspense fallback={<div className='mt-5'>Loading..</div>}><LazyUserFeed /></Suspense>} />
                  <Route path='/explore' element={<>Explore</>} />
                
                <Route path='/saved' element={<Suspense fallback={<div className='mt-5'><LoaderSvg /></div>}><LazyAllusers  setProgress={setProgress} /></Suspense>} />
                <Route path='/explore' element={<>Explore</>} />
                <Route path='/my-posts' element={<Suspense fallback={<LoaderSvg/>}><LazyMyPosts /></Suspense>} />
                <Route path='/create-post' element={<Suspense fallback={<div><LoaderSvg/></div>}><LazyCreatePost /></Suspense>} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
