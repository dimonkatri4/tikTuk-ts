import getUserInfo from '../api/getUserInfo';
import {AppDispatch} from "../store/store";
import {setRequestError, setUsersInfo, toggleIsFetching } from '../store/usersSlice';
import mockData from '../mocks/user-feed.json'

 const requestUsersInfo = (id?: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(toggleIsFetching(true));
            const data = await getUserInfo(id);
            dispatch(toggleIsFetching(false));
            if (!Object.keys(data).length || typeof data === 'string') {
                dispatch(setRequestError('Something went wrong! Please try again'));
                console.error('Empty object in userInfo')
            } else {
                dispatch(setUsersInfo(data));
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            dispatch(setRequestError("Something went wrong! Please try again"));
            console.error(error.response.data.message)
        }
    } ;

 export const mockRequestUsersInfo = (id?: string) => async (dispatch: AppDispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setUsersInfo(mockData.itemList[0].author));
    dispatch(toggleIsFetching(false));
}

export default requestUsersInfo;
