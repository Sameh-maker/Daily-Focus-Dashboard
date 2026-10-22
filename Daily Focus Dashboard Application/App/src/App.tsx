import '../src/App.css'
// Components Imported For Routes
import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router'
// import Login from './Pages/Login'
// import Dashboard from './Pages/Dashboard'
// import Tasks from './Pages/Tasks'
// import Timer from './Pages/Timer'
// import Goals from './Pages/Goals'
// import Notes from './Pages/Notes'
// import Analytics from './Pages/Analytics'
// import Settings from './Pages/Settings'
// import SideBar from './Tasks components/SideBar'
const Login = lazy(() => import('./Pages/Login'));
const Dashboard = lazy(() => import('./Pages/Dashboard'));
const Tasks = lazy(() => import('./Pages/Tasks'));
const Timer = lazy(() => import('./Pages/Timer'));
const Goals = lazy(() => import('./Pages/Goals'));
const Notes = lazy(() => import('./Pages/Notes'));
const Analytics = lazy(() => import('./Pages/Analytics'));
const Settings = lazy(() => import('./Pages/Settings'));
const SideBar = lazy(() => import('./Tasks components/SideBar'));
import { useState } from 'react';


// Routes
function App() {
  const [isAuth, setIsAuth] = useState(() => {
    return localStorage.getItem('LogginToken') === 'true';
  });

  return (
    <>
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path='/login' element={<Navigate to='/login' replace />} />
          <Route path='/' element={
            isAuth ? <SideBar /> : (<Login handle={setIsAuth} />)
          } >
            <Route index path='/' element={<Dashboard />} />
            <Route path='/tasks' element={<Tasks />} />
            <Route path='/timer' element={<Timer />} />
            <Route path='/goals' element={<Goals />} />
            <Route path='/notes' element={<Notes />} />
            <Route path='/analytics' element={<Analytics />} />
            <Route path='/settings' element={<Settings />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
