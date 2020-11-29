import { GET_USERS} from './actionTypes'

export const getUserList = (data) => {
    return{
        type: GET_USERS,
        payload: data
    }
};
