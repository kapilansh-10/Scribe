import { useEffect, useState } from "react";

export function useFetchPageById (id: string) {

    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)

    const url = "http://localhost:3000/api/blocks?pageId="+id;

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if(response.ok) {
                    const result = await response.json();
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

    return { data, loading, error }
}