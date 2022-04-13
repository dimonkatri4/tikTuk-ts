import getUserInfo from '../api/getUserInfo';
import {ActionTypeUsersReducer, setRequestError, setUsersInfo, toggleIsFetching} from '../store/users-reducer';
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../store/store";

const requestUsersInfo = (id?: string): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypeUsersReducer> =>
    async (dispatch) => {
    try {
        dispatch(toggleIsFetching(true));
        const data = await getUserInfo(id);
        dispatch(toggleIsFetching(false));
        if (!Object.keys(data).length || typeof data == 'string') {
            dispatch(setRequestError('Empty object in userInfo'));
        } else {
            dispatch(setUsersInfo(data));
        }
    } catch (error: any) {
        dispatch(setRequestError(error.response.data.message));
    }
};

export default requestUsersInfo;
