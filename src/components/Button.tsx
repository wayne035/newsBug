import React from "react";

interface News{
  name: string,
  link: string,
  time: string,
  title: string
  color: string,
}

const btnData = [
    '全部新聞','壹蘋果','ETtoday','民視','Newtalk','三立','風傳媒','台視','自由時報','東森','中時'
]

interface ButtonProps {
    setIsAllNews: React.Dispatch<React.SetStateAction<boolean>>
    setOtherData: React.Dispatch<React.SetStateAction<News[]>>
}

export default function Button({setIsAllNews, setOtherData}: ButtonProps) {
  async function handleNews(newsName: string) {
    window.scrollTo(0, 0)
    if(newsName === '全部新聞'){
      setIsAllNews(true)
    }else{
      try{
        const res = await fetch(import.meta.env.VITE_URL + `/${newsName}`)
        const data = await res.json()
        setOtherData(data)
      }catch(e){
          console.log((e as Error).message)
      }
      setIsAllNews(false)
    }
  }

  return (
    <>
      {btnData.map((newsName: string) =>(
        <button key={crypto.randomUUID()} 
                onClick={()=> handleNews(newsName)}
        >
          {newsName}
        </button>
      ))}
    </>
  )
}
