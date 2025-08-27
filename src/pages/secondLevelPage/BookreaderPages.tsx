import { useOutletContext } from "react-router-dom";
import EpubReader from "../../hook/EpubReader";

interface OutletContext {
    linkHtml: string;
    title: string;
}


function BookreaderPages() {
    const content =useOutletContext<OutletContext>();

    return (
        <>
            <EpubReader src={content.linkHtml} title={content.title} />
        </>
    );
}

export default BookreaderPages;