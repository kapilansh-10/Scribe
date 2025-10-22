import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { title } from "process";


export const getPage = async () => {

    const url = "http://localhost:3000/api/pages";

    try {
        const response = await fetch(url,{
            method: "GET"
        })
        if(response.ok) {
            return response.json()
        }
        else {
            throw new Error("Error in fetching the page")
        }
    } 
    catch (error) {
        console.error(error);
    }
}

export const createPage = async (title: string, userId: string) => {

    const url = "http://localhost:3000/api/pages";

    try {
        const response = await fetch(url,{
            method: "POST",
            body: JSON.stringify({
                userId: userId,
                title: title
            }),
            headers: {
                'Content-type': "application/json"
            }
        })
        if(response.ok) {
            return response.json();
        }
        else {
            throw new Error("Error in creating a page")
        }
    } catch (error) {
        console.error(error);
    }
}

export const updatePage = async (id: string, title: string) => {
    const url = `http://localhost:3000/api/pages/${id}`;

    try {
        const response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify({
                title: title
            }),
            headers: {
                'Content-type': "application/json"
            }
        })    
        if(response.ok){
            return response.json();
        }
        else {
            throw new Error("Error in updating the page");
        }
    } 
    catch (error) {
        console.error(error);
    }
}

export const deletePage = async (id: string) => {

    const url = `http://localhost:3000/api/pages/${id}`;;

    try {
        const response = await fetch(url, {
            method: "DELETE"
        })
        if(response.ok) {
            return response.json();
        }    
        else {
            throw new Error("Error in deleting the page");
        }
    } 
    catch (error) {
      console.error(error);  
    }
}