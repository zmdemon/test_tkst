import React, {useState} from 'react';
import 'antd/dist/antd.css';
import './style.css';
import {Button, Input, Layout, Menu, MenuProps} from 'antd';
import {useDispatch} from "react-redux";
import {logOut} from "../../store/reducers/AuthSlice";
import Cookies from "js-cookie";
import ContactsList from "../../components/ContactsList";
import EditModal from "../../components/EditModal";
import {v4 as uuidv4} from 'uuid';
import {saveNewContact, setNewCurrentContact, setSearchString} from "../../store/reducers/ContactsSlice";


const {Header, Content, Footer} = Layout;

const ContactsPage = () => {
    const dispatch = useDispatch()
    const [isModalVisible, setIsModalVisible] = useState(false)

    const handleMenuClick: MenuProps['onClick'] = () => {
        Cookies.remove('access')
        dispatch(logOut())
    };

    const handleModalClose = () => {
        setIsModalVisible(false)
    };

    const handleModalSubmit = () => {
        dispatch(saveNewContact())
        setIsModalVisible(false)
    };
    const handleAddNewContactClick = () => {
        setIsModalVisible(true)
        dispatch(setNewCurrentContact(uuidv4()))
    };

    return (
        <>
            <Layout className="layout">
                <Header>
                    <div className="logo"/>
                    <Menu
                        style={{display: "flex", justifyContent: "flex-end"}}
                        theme="dark"
                        mode="horizontal"
                        onClick={handleMenuClick}
                        items={[{
                            key: 1,
                            label: `Log Out`,
                        }]}
                    />

                </Header>
                <Content style={{padding: '0 50px'}} className="contacts-page-content">
                    <div className="contacts-layout-content">
                        <Button onClick={handleAddNewContactClick}>Add New Contact</Button>
                        <Input.Search
                            enterButton={false}
                            onChange={e => dispatch(setSearchString(e.target.value))}
                        />
                        <ContactsList/>
                    </div>

                </Content>
                <Footer style={{textAlign: 'center'}}>Test task for Takeoff Staff ©2022 Created by @zmdemon</Footer>
            </Layout>

            <EditModal
                key="add-modal"
                isModalVisible={isModalVisible}
                onClose={handleModalClose}
                onOk={handleModalSubmit}
            />
        </>

    )
};
export default ContactsPage