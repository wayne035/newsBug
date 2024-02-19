import { useEffect,useState } from "react"

interface Book{
  name: string,
  link: string,
  time: string,
  title: string
  color: string,
}

export default function page() {
  const [data, setData] = useState([] as Book[])
  const [keyWord, setKeyWord] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  async function sortData(v: string){
    if(v === 'near'){
      setData([...data].sort((a, b)=>(
        Number(b.time.replace(/\//g, "").replace(" ", "").replace(":", "")) - Number(a.time.replace(/\//g, "").replace(" ", "").replace(":", ""))
      )))
    }
    if(v === 'far'){
      setData([...data].sort((a, b)=>(
        Number(a.time.replace(/\//g, "").replace(" ", "").replace(":", "")) - Number(b.time.replace(/\//g, "").replace(" ", "").replace(":", ""))
      )))
    }
  }

  useEffect(()=> {
    async function getData(){
      try{
        const res = await fetch(import.meta.env.VITE_URL)
        const data = await res.json()
        setData(data)
        setIsLoading(false)
      }catch(e){
        console.log((e as Error).message)
      }
    }

    getData()
  },[])

  return (
    isLoading ? 
      <span className="text-[#fff] md:text-[108px] font-bold absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
        載入中...
      </span> 
    :
      <>
        <header>
          <h1 className="absolute top-0 left-0 text-transparent">newsBug</h1>
          <nav className="flex justify-center p-4 mt-6">
            <button onClick={()=> sortData('near')}>時間(進~遠)</button>
            <button onClick={()=> sortData('far')}>時間(遠~進)</button>
            <button onClick={()=> setKeyWord('')}>全部新聞</button>
            <button onClick={()=> setKeyWord('壹蘋果')}>壹蘋果</button>
            <button onClick={()=> setKeyWord('ETtoday')}>ETtoday</button>
            <button onClick={()=> setKeyWord('民視')}>民視</button>
            <button onClick={()=> setKeyWord('Newtalk')}>Newtalk</button>
            <button onClick={()=> setKeyWord('三立')}>三立</button>
            <button onClick={()=> setKeyWord('風傳媒')}>風傳媒</button>
            <button onClick={()=> setKeyWord('台視')}>台視</button>
          </nav>
        </header>
        {data?.filter(event=> keyWord ? (event.name === keyWord) : true )
          .map(event=> (
            <article key={crypto.randomUUID()} className="w-full flex justify-center">
              <a href={event.link} target="_blank" className='flex w-[80%] m-3 p-2 text-[18px] text-[#fff] border-b-2 border-[#bbb] font-bold hover:bg-[#ddd] hover:text-[#000]'>
                <time className="text-[12px] leading-[25px]">
                  {event.time}
                </time>
                <h2 className="mx-5 text-[14px] leading-[25px] px-1" style={{background: `${event.color}`}}>
                  {event.name}
                </h2>
                <h3>{event.title.substring(0, 30) + "..."}</h3>
              </a>
            </article>
          ))}
        <footer className="text-[#fff] w-full text-center py-8 font-black">
          © 2024 All Rights Reserved. Designed By Wayne
        </footer>
      </>
  )
}