import axios, { AxiosResponse } from 'axios';

const baseURI = 'https://q6dyxmfcyc.execute-api.us-east-2.amazonaws.com/Production/';

// TODO - Stronger typing
export default {
    get(path:string): Promise<AxiosResponse|Error> {
        return axios.get(`${baseURI}${path}`)
            .then((res:AxiosResponse) => res)
            .catch((err:Error) => {
                console.error(err);
                return err;
            });
    },
    put(path:string, body:any): Promise<AxiosResponse|Error> {
        return axios.put(`${baseURI}${path}`, body).then((res:AxiosResponse) => {
            if (res && res.statusCode && res.statusCode === 403) {
                throw new Error('Unauthorized');
            }
            return res;
        })
        .catch((err:Error) => {
            console.error(err);
            return err;
        });
    },
    post(path:string, body:any): Promise<AxiosResponse|Error> {
        return axios.post(`${baseURI}${path}`, body)
            .then((res:AxiosResponse) => res)
            .catch((err:Error) => {
                console.error(err);
                return err;
            });
    },
}