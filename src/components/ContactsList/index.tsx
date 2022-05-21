import React, { useState } from 'react'
import 'antd/dist/antd.css'
import './style.css'
import { List, Skeleton } from 'antd'
import { useAppSelector } from '../../store/store'
import { useDispatch } from 'react-redux'
import {
  deleteContact,
  editContact,
  setCurrentContact,
} from '../../store/reducers/ContactsSlice'
import EditModal from '../EditModal'

const ContactsList = () => {
  const { contactsList, searchString } = useAppSelector(
    (state) => state.contacts
  )
  const dispatch = useDispatch()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleEditClick = (id: string) => () => {
    dispatch(setCurrentContact(id))
    setIsModalVisible(true)
  }

  const handleModalClose = () => {
    setIsModalVisible(false)
  }

  const handleEditModalSubmit = () => {
    dispatch(editContact())
    setIsModalVisible(false)
  }

  const handleDeleteClick = (id: string) => () => {
    dispatch(deleteContact(id))
  }

  return (
    <>
      <List
        className="contacts-list"
        itemLayout="horizontal"
        dataSource={contactsList.filter((item) =>
          item.name.includes(searchString)
        )}
        renderItem={(item) => (
          <List.Item
            actions={[
              <button key="list-edit" onClick={handleEditClick(item.id)}>
                edit
              </button>,
              <button onClick={handleDeleteClick(item.id)} key="list-delete">
                delete
              </button>,
            ]}
          >
            <Skeleton avatar title={false} active loading={false}>
              <List.Item.Meta title="Name" description={item.name} />
              <List.Item.Meta title="E-mail" description={item.email} />
              <List.Item.Meta
                title="Description"
                description={item.description}
              />
            </Skeleton>
          </List.Item>
        )}
      />
      <EditModal
        key={'edit-modal'}
        isModalVisible={isModalVisible}
        onClose={handleModalClose}
        onOk={handleEditModalSubmit}
      />
    </>
  )
}
export default ContactsList
