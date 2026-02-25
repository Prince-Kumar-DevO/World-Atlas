import axios from "axios";

const BASE_URL = "https://restcountries.com/v3.1";

export const getAllCountries = () => {
    return axios.get(
        `${BASE_URL}/all?fields=name,flags,capital,region,population,cca3`
    );
};

export const getCountryByCode = (code) => {
    return axios.get(`${BASE_URL}/alpha/${code}`);
};
