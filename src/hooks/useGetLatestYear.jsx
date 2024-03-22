import { YEAR_LIST } from '../utils/constants.js'

export const useGetLatestYear = async() => {
    const response = await fetch(`${YEAR_LIST}`);

    const yearData = response.json().data;
    const yearList = Object.keys(yearData);

    let maxYear = 0;
    for(let year of yearList) {
        if(year > maxYear) {
            maxYear = year;
        }
    } 

    return maxYear;
}

export default useGetLatestYear