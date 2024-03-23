import axios from 'axios';

const useDeletePdf = async (pdf, setReload, reload) => {
    const {year, round, exam, name} = pdf;
    try {
        await axios.delete(
            `${import.meta.env.VITE_SERVER_URL}/api/v1/pdf/delete/${year}/${round}/${exam}/${name}`
        );
        setReload(!reload);
    } catch (err) {
        alert("Error deleting pdf");
        console.log("Error Deleting pdf", err);
    }
}

export default useDeletePdf