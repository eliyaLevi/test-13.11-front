import React, { useState } from "react";





export default function useFetch<T>(
  url: string
) :any{
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getFetch = async () => {
    try {
      const responce = await  fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // חשוב בשביל קבלת הקוקיז
      });
      if (!responce.ok) {
        const errorData = await responce.json();
        throw new Error(`HTTP ERROR!!! ${errorData.error.message}`);
      }
      const result = await responce.json();
      setData(result);
    } catch (error) {
      setError((error as Error).message || "An unknown error occurred");
    }
  };

  const postFetch = async(body:any,path:string) => {
    try {
        const responce = await  fetch(`${url}/${path}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // חשוב בשביל קבלת הקוקיז
            body: JSON.stringify(body),
          });
        if(!responce.ok){
            const errorData = await responce.json();
            throw new Error(`HTTP ERROR!!! ${errorData.error.message}`);
        }
        const result = await responce.json();
        setData(result);
    } catch (error) {
        setError((error as Error).message || "An unknown error occurred");
        
    }
   
  };

  const putFetch = async(id: string, body:any) => {
    try {
        const responce =  await fetch(`${url}${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // חשוב בשביל קבלת הקוקיז
            body: JSON.stringify(body),
          });
          if(!responce.ok){
            const errorData = await responce.json();
            throw new Error(`HTTP ERROR!!! ${errorData.error.message}`);
        }
        const result = await responce.json();
        setData(result);

    } catch (error) {
        setError((error as Error).message || "An unknown error occurred");
    }

  };

  const deleteFetch = async(id: string) => {
    try {
        const responce =  await fetch(`${url}/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // חשוב בשביל קבלת הקוקיז
          });
          if(!responce.ok){
            const errorData = await responce.json();
            throw new Error(`HTTP ERROR!!! ${errorData.error.message}`);
        }
         await responce.json();
         const data = getFetch()
        console.log(data);
        

    } catch (error) {
        setError((error as Error).message || "An unknown error occurred");
    }

  };

  return {getFetch, postFetch, putFetch, deleteFetch, data, error};
}
