import { useState } from "react"
import PageList from "./components/PageList";
import PageViewer from "./components/PageViewer";


export default function Page() {


    const [pages, setPages] = useState();
    const [selectedPage, setSelectedPage] = useState();

    return (
        <div>
            <PageList />
            <PageViewer />
        </div>
    )
}