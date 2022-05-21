import { useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import { logIn } from '../store/reducers/AuthSlice'
import { useAppSelector } from '../store/store'

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { loggedIn } = useAppSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (Cookies.get('access')) {
      dispatch(logIn())
    } else if (!Cookies.get('access') || !loggedIn) {
      navigate('/login')
    }
  }, [dispatch, loggedIn, navigate])

  return <>{children}</>
}

export default RequireAuth
