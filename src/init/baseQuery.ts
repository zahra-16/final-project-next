import axios, { AxiosRequestConfig } from "axios";

export const getBaseQuery = async (path: string, options: AxiosRequestConfig = {}): Promise<any> => {
    try {
        const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3Mzk2OTAzOTEsImV4cCI6MTczOTY5Mzk5MX0.qPmfQHq80CaLxD2836VbTniwcNXiXZyyctIVteuTx78k8IAZe0YKCkSvLcqEtkszEZs7tmmqiscAd2zc6jyc6UWUPtaOY9gnvef81k-9W3QmuRhHeOsOmdwD37aZygmk5PHHA3zf-Pf0fBHrjHHRXwXun9dFGr6xjM1s9fg1nNmwYm1kd4dkkisLDR1A311WR6nc80aCfrJ8aqv-Vya2uYzVdfLz3WQcQOfZkQq_i_QJDCT0FhfcV0nj3lRzcYQW3GDgQfMR-G6UKpFgXuxUOHORApwnTJGfto_ox3taZxdjZSHr-9e-DxVA4y030zBw12ILii1bXFTBhnfeKpctP76us2oMTsjAOYwvKJpDBjZbt8OPvaqJIuku0aalHxVqpRL4qz028tOgxT-LIMEkwaJIRl0uJd6p87HfcwD6vLoP0O_tQxtbEXTOACkbbFr-76I7Qyp2g_HN9RBi5V9SVJs7IiHls42DuVV8S8gQt8WBKvrZ_nIws0pw9xuin-qn5tCq-KoiSjN1aNu3CY9E3zmp2IZGELRVLcjt0A9HMb1UkisEwRAyxJJyVpmnzQgxEAUoTdACw0eDc2n4KjQwdvN7Esi9yaxPDzjC7d-t-FcyN0JLDTqRfysy0CTwfCyXHKp1FJbHFJ0E6SCg2bvChK6_qulZlWqZPgsvF5sLQ8g';
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
            ...options.headers
        };

        const response = await axios.get(`https://penyewaan.vercel.app/api/v1/` + path, { ...options, headers });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Something went wrong');
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};