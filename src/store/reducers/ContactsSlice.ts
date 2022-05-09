import {createSlice} from "@reduxjs/toolkit";

type ContactsListType = {
    name: string
    email: string
    description: string
    id: string

}
type ContactsState = {
    searchString: string
    loading: boolean
    isEditModalOpen: boolean
    contactsList: Array<ContactsListType>
    currentContact: ContactsListType
}

const initialState: ContactsState = {
    searchString: "",
    loading: false,
    isEditModalOpen: false,
    contactsList: [],
    currentContact: {
        name: "",
        email: "",
        description: "",
        id: ""
    }
}


const contactsSlice = createSlice({
    name: 'ContactsSlice',
    initialState,
    reducers: {
        setCurrentContact(state, action) {
            state.currentContact = state.contactsList.filter(item => item['id'] === action.payload)[0]
        },
        setNewCurrentContact(state, action) {
            state.currentContact = {...initialState.currentContact, id: action.payload}
        },
        setContactName(state, action) {
            state.currentContact.name = action.payload
        },
        setContactEmail(state, action) {
            state.currentContact.email = action.payload
        },
        setContactDescription(state, action) {
            state.currentContact.description = action.payload
        },
        editContact(state) {
            state.contactsList = state.contactsList.map(item => item['id'] === state.currentContact.id ? state.currentContact : item)
        },
        deleteContact(state, action) {
            state.contactsList = state.contactsList.filter(item => item['id'] !== action.payload)
        },
        saveNewContact(state) {
            state.contactsList.push(state.currentContact)
        },
        setSearchString(state, action) {
            state.searchString = action.payload
        },
    },
    extraReducers: {}
});

export const {
    setCurrentContact,
    setNewCurrentContact,
    setContactName,
    setContactEmail,
    setContactDescription,
    editContact,
    deleteContact,
    saveNewContact,
    setSearchString
} = contactsSlice.actions

export default contactsSlice.reducer;
