"use client"

import { getPage, createPage, updatePage, deletePage } from "@/utils/apiPages";
import { useEffect, useState } from "react";
import { string } from "zod";
import { id } from "zod/locales";

export default function PageList() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)
    const [title, setTitle] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [editPageId, setEditPageId] = useState("")

    useEffect(() => {
        getPage()
        .then(data => {
            setData(data);
            console.log(data);
            setLoading(false);
        })
        .catch(error => console.error(error))
    },[])
    

    const handleCreatePage = async () => {
        try {
            setLoading(true);
            
            const newPage = await createPage(title, "4f301893-b308-4357-9c3b-7ba538a47926");

            setData([...data, newPage]);
            
            setTitle("")
            setLoading(false)
        } 
        catch (error) {
            setError("Could not create a Page")
        }
    }

    const handleEditPage = async (id, title) => {

        try {
            setEditPageId(id);
            setNewTitle(title);
        } 
        catch (error) {
            
        }
    }
    
    const handleSavePage = async (id) => {
        await updatePage(id, newTitle) 
        setData(data.map(p => p.id === id ? {...p, title: newTitle}: p))
        setNewTitle("") 
        setEditPageId("")
    }

    return (
        <div className="flex justify-center items-center flex-col mt-5 pt-5">
            <h1 className="font-bold">Pages</h1>
            <div className="flex gap-1">
                <input type="text" placeholder="add a page" value={title} onChange={(e) => setTitle(e.target.value)} />
                <button className="bg-red-500 p-2 rounded-4xl" onClick={handleCreatePage}>Add</button>
            </div>
            {loading && <p>Loading pages...</p>}
            {error && <p>Error: {error}</p>}
            <div>
                <ul>
                    {data.map((page) => (
                        editPageId === page.id ? (
                            <div className="flex gap-3">
                                <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                                <button onClick={() => handleSavePage(page.id)} className="bg-green-500 p-2 rounded-4xl">Save 💾</button>
                            </div>
                        ):(
                        <li key={page.id}>
                            {page.title}
                            <button className="bg-red-600 p-2 m-2 rounded-2xl" onClick={() => handleEditPage(page.id, page.title)}>🖋️ edit</button>
                            <button className="bg-red-600 p-2 m-2 rounded-2xl">🗑️ delete</button>
                        </li>
                        )
                    ))}
                </ul>
            </div>
            {!loading && !error && data.length === 0 && <p>No pages available</p>}
        </div>
    )
}