import type { AxiosResponse } from 'axios';
import API from './api';

const baseURI = 'users';

export const validateUser = (password:string): Promise<boolean> => {
    return API.post(`${baseURI}/validate`, { password })
        .then((res: AxiosResponse|Error) => {
            if (res instanceof Error) return false;

            return res?.data?.valid;
        })
        .catch((err: Error) => err);
}