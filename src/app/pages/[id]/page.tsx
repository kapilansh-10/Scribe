"use client"

import { useParams } from "next/navigation";
import { useFetchPageById } from "../hooks/useFetchPageById";

export default function Page() {

    const params = useParams<{ id: string }>();

    const { data, loading, error} = useFetchPageById(params.id);
    
    if(loading) return <p>Loading ...</p>
    if(error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Page Data</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
    
}