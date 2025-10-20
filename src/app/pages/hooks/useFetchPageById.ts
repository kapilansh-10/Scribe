import { useEffect, useState } from "react";


type Block = {
    id: string,
    type: string,
    content: string,
    parentId: string | null,
    position: number
};

type Page = {
    id: string,
    title: string,
    userId: string,
    createdAt: string,
    updatedAt: string,
    blocks: Block[]
}


export function useFetchPageById (id: string) {

    const [data, setData] = useState<Page[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)

    const url = "http://localhost:3000/api/blocks?pageId="+id;

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if(response.ok) {
                    const result: Page[] = await response.json();
                    setData(result)
                }
                else {
                    setError(new Error("Failed to fetch the Page").message)
                }   
            } 
            catch (error) {
                if(error instanceof Error) {
                    setError(error.message)
                }
                else {
                    setError(String(error))
                }
            }
            finally {
                setLoading(false)
            }
        }
        fetchData()
    },[id])

    console.log(data)

    return { data, loading, error }
}