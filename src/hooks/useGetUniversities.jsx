import { UNIVERSITY_LIST_URL } from "../utils/constants"

const useGetUniversities = async(setUniversities) => {
    const response = await fetch(UNIVERSITY_LIST_URL);
    const universities = await response.json();

    setUniversities(universities);
}

export default useGetUniversities