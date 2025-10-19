"use client"

import { useFetchPages } from "../hooks/useFetchPages"

export default function PageList() {

    const { data, loading, error} = useFetchPages();

    return (
        <div>
            <h2>Pages</h2>
            {loading && <p>Loading pages...</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {data.map((page) => (
                    <li key={page.id}>
                        {page.title}
                    </li>
                ))}
            </ul>
            {!loading && !error && data.length === 0 && <p>No pages available</p>}
        </div>
    )
}