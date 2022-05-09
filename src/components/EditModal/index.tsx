import React from 'react';
import 'antd/dist/antd.css';
import './style.css';
import {Input, Modal} from 'antd';
import {useAppSelector} from "../../store/store";
import {useDispatch} from "react-redux";
import {setContactDescription, setContactEmail, setContactName} from "../../store/reducers/ContactsSlice";

const {TextArea} = Input;

type modalType = {
    isModalVisible: boolean,
    onOk: () => void,
    onClose: () => void
}

const EditModal = ({isModalVisible, onOk, onClose}: modalType) => {
    const {currentContact} = useAppSelector(state => state.contacts)
    const dispatch = useDispatch()

    return (
        <Modal title="Enter contact credentials" className="based-modal" visible={isModalVisible} onOk={onOk}
               onCancel={onClose}>
            <div className="inputs-wrapper">
                <Input
                    value={currentContact.name}
                    onChange={e => dispatch(setContactName(e.target.value))}
                    addonBefore={"Name"}
                />
                <Input
                    type='email' value={currentContact.email}
                    onChange={e => dispatch(setContactEmail(e.target.value))}
                    addonBefore={"Email"}

                />
                <TextArea
                    rows={2}
                    value={currentContact.description}
                    onChange={e => dispatch(setContactDescription(e.target.value))}
                    placeholder={"Description"}

                />
            </div>
        </Modal>
    )
};
export default EditModal