import { useEffect,useState } from "react"

interface News{
  name: string,
  link: string,
  time: string,
  title: string
  color: string,
}

export default function page() {
  const [data, setData] = useState([] as News[])
  const [keyWord, setKeyWord] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  async function handleKeyWord(v: string){
    setKeyWord(v)
    window.scrollTo(0,0)
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
        <header className="fixed bg-[#000] border-b-2 top-0 left-0 w-full">
          <h1 className="absolute top-0 left-0 text-transparent">newsBug</h1>
          <nav className="flex flex-wrap justify-center p-4 my-4">
            <button onClick={()=> handleKeyWord('')}>全部新聞</button>
            <button onClick={()=> handleKeyWord('壹蘋果')}>壹蘋果</button>
            <button onClick={()=> handleKeyWord('ETtoday')}>ETtoday</button>
            <button onClick={()=> handleKeyWord('民視')}>民視</button>
            <button onClick={()=> handleKeyWord('Newtalk')}>Newtalk</button>
            <button onClick={()=> handleKeyWord('三立')}>三立</button>
            <button onClick={()=> handleKeyWord('風傳媒')}>風傳媒</button>
            <button onClick={()=> handleKeyWord('台視')}>台視</button>
            <button onClick={()=> handleKeyWord('自由時報')}>自由時報</button>
            <button onClick={()=> handleKeyWord('東森')}>東森</button>
            <button onClick={()=> handleKeyWord('中時')}>中時</button>
          </nav>
        </header>
        <span className="block h-[180px] md:h-[100px]"></span>
        {data?.filter(event=> keyWord ? (event.name === keyWord) : true )
          .map(event=> (
            <article key={crypto.randomUUID()} className="w-full flex justify-center">
              <a href={event.link} target="_blank" title={event.title} className='flex w-full md:w-[80%] m-3 p-2 md:text-[18px] text-[#fff] border-b-2 border-[#bbb] font-bold hover:bg-[#ddd] hover:text-[#000] items-center'>
                <time className="text-[12px] leading-[25px] w-[30px] md:w-[70px]">
                  {event.time}
                </time>
                <h2 className="mx-2 md:mx-5 md:text-[14px] text-center leading-[25px] px-1 h-[25px] overflow-hidden w-[70px]" style={{background: `${event.color}`}}>
                  {event.name}
                </h2>
                <h3 className="w-[260px] md:w-auto">
                  {event.title.substring(0, 30) + "..."}
                </h3>
              </a>
            </article>
          ))}
        <footer className="text-[#fff] w-full text-center py-8 font-black">
          © 2024 All Rights Reserved. Designed By Wayne
        </footer>
      </>
  )
}