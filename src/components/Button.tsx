import React,{ memo } from "react";

interface News{
  name: string,
  link: string,
  time: string,
  title: string
  color: string,
}

const btnData = [
  {'name': '全部新聞', 'en': 'all'},
  {'name': '壹蘋果', 'en': 'apple'},
  {'name': 'ETtoday', 'en': 'ettoday'},
  {'name': '民視', 'en': 'ftv'},
  {'name': 'Newtalk', 'en': 'newtalk'},
  {'name': '三立', 'en': 'setn'},
  {'name': '風傳媒', 'en': 'storm'},
  {'name': '台視', 'en': 'ttv'},
  {'name': '自由時報', 'en': 'ltn'},
  {'name': '東森', 'en': 'ebc'},
  {'name': '中時', 'en': 'ct'},
  {'name': '聯合', 'en': 'udn'}
]

interface ButtonProps {
    setIsAllNews: React.Dispatch<React.SetStateAction<boolean>>
    setOtherData: React.Dispatch<React.SetStateAction<News[]>>
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export default memo(function Button({setIsAllNews, setOtherData, setIsLoading}: ButtonProps) {
  async function handleNews(newsName: string) {
    window.scrollTo(0, 0)
    if(newsName === 'all'){
      setIsAllNews(true)
    }else{
      setIsLoading(true)
      try{
        const res = await fetch(import.meta.env.VITE_URL + `/${newsName}`)
        const data = await res.json()
        setOtherData(data)
        setIsLoading(false)
      }catch(e){
          console.log((e as Error).message)
      }
      setIsAllNews(false)
    }
  }

  return (
    <>
      {btnData.map(({name, en}) =>(
        <button key={crypto.randomUUID()} onClick={()=> handleNews(en)}>
          {name}
        </button>
      ))}
    </>
  )
})
