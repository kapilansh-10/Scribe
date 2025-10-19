// "use client"

import { useEffect, useState } from "react";

export function useFetchPages() {

    const [data, setData] = useState<{id:string, title: string}[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const url = "http://localhost:3000/api/pages";

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if(response.ok) {
                    const result = await response.json();
                    setData(result);
                }
                else {
                    setError(new Error("Failed to fetch").message);
                }
            } 
            catch (error) {
                if(error instanceof Error){
                    setError(error.message)
                }
                else {
                    setError(String(error))
                }
            }
            finally{
                setLoading(false)
            } 
        }
        fetchData();
    },[])

    return { data, loading, error}
}