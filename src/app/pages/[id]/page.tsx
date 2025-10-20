    "use client"

    import { useParams } from "next/navigation";
    import { useFetchPageById } from "../hooks/useFetchPageById";


    type Block = {
        id: string,
        content: string
        type: string
    }
    
    export default function Page() {

        const params = useParams<{ id: string }>();

        const { data, loading, error } = useFetchPageById(params.id);

        return (
            <div>
                <h1>Page Data</h1>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {String(error)}</p>}
                <ul>
                    {data?.data?.map((block: Block) => (
                        <li key={block.id}>
                            {block.type}
                            <br />
                            {block.content}
                        </li>
                    ))}
                </ul>
                {!loading && !error && (data?.data?.length ?? 0) === 0 && <p>No blocks available</p>}
            </div>
        )
    }