import { SERVER_URL } from "../utils/constants";

const useGetPdf = async (year, round) => {
    console.log("Fetching pdf")
    const response = await fetch(
        `${SERVER_URL}/api/v1/lists/pdfList/${year}/${round}`
    );
    if (!response.ok) {
        throw new Error(
            `Failed to fetch PDFs for year ${year} round: ${round}`
        );
    }
    return response.json();
};

export default useGetPdf;