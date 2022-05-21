import React, { useEffect } from 'react'
import 'antd/dist/antd.css'
import './style.css'
import { Button, Input, Layout, Space } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { useAppSelector, useTypedDispatch } from '../../store/store'
import {
  getAuthentication,
  setLogin,
  setPassword,
} from '../../store/reducers/AuthSlice'
import { useNavigate } from 'react-router-dom'

const { Content, Footer } = Layout

const AuthPage = () => {
  const dispatch = useTypedDispatch()
  const { password, login, loggedIn } = useAppSelector((state) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (loggedIn) navigate('/contacts')
  }, [loggedIn, navigate])

  const handleLoginChange = (login: string) => {
    dispatch(setLogin(login))
  }

  const handlePasswordChange = (password: string) => {
    dispatch(setPassword(password))
  }

  const handleSubmitButtonClick = () => {
    dispatch(getAuthentication())
  }

  return (
    <Layout className="layout">
      <Content style={{ padding: '0 50px' }} className={'auth-page-content'}>
        <div className="site-layout-content">
          <Space direction="vertical">
            <Input
              placeholder="input login"
              value={login}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleLoginChange(e.target.value)
              }
            />
            <Input.Password
              value={password}
              placeholder="input password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handlePasswordChange(e.target.value)
              }
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
            <Button onClick={handleSubmitButtonClick}>Log In</Button>
          </Space>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Test task for Takeoff Staff ©2022 Created by @zmdemon
      </Footer>
    </Layout>
  )
}
export default AuthPage
