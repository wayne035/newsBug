import React,{ memo } from "react";

interface News{
  name: string,
  link: string,
  time: string,
  title: string
  color: string,
}

const btnData = [
  {'name': '全部新聞', 'en': 'all', 'color':'#555555'},
  {'name': '三立', 'en': 'setn', 'color':'#065C05'},
  {'name': '民視', 'en': 'ftv', 'color':'#065C05'},
  {'name': '自由時報', 'en': 'ltn', 'color':'#065C05'},
  {'name': 'Newtalk', 'en': 'newtalk', 'color':'#80BF73'},
  {'name': '壹蘋果', 'en': 'apple', 'color':'#80BF73'},
  {'name': '台視', 'en': 'ttv', 'color':'#555555'},
  {'name': '風傳媒', 'en': 'storm', 'color':'#62C2FE'},
  {'name': '聯合', 'en': 'udn', 'color':'#62C2FE'},
  {'name': 'ETtoday', 'en': 'ettoday', 'color':'#62C2FE'},
  {'name': '東森', 'en': 'ebc', 'color':'#262CC9'},
  {'name': '中時', 'en': 'ct', 'color':'#262CC9'},
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
      {btnData.map(({name, en, color}) =>(
        <button key={crypto.randomUUID()} onClick={()=> handleNews(en)} style={{background: color}}>
          {name}
        </button>
      ))}
    </>
  )
})
