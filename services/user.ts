import API from './api';

const baseURI = 'users';

export const validateUser = (password:string): Promise<boolean> => {
    return API.post(`${baseURI}/validate`, { password })
        .then((res: AxiosResponse) => res?.data?.valid)
        .catch((err: Error) => err);
}