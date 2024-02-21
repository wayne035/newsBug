import { useEffect,useState } from "react"
import Button from "./components/Button"
import InfiniteScroll from 'react-infinite-scroll-component'

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
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)

  async function handleKeyWord(keyword: string){
    setKeyWord(keyword)
    window.scrollTo(0,0)
  }

  async function getData(page: string|number){
    if(data.length < 520){
      try{
        const res = await fetch(import.meta.env.VITE_URL + `/${page}`)
        const data = await res.json()
        setData(pre => [...pre,...data])
      }catch(e){
          console.log((e as Error).message)
      }
    }
    else{
      setHasMore(false)
    }
  }

  useEffect(()=> {
    getData(page)
  },[page])

  return (
    <>
      <header className="fixed bg-[#000] border-b-2 top-0 left-0 w-full">
        <h1 className="absolute top-0 left-0 text-transparent">newsBug</h1>
        <nav className="flex flex-wrap justify-start lg:justify-center p-4 lg:my-4">
          <Button handleKeyWord={handleKeyWord}/>
        </nav>
      </header>
      <span className="block h-[180px] md:h-[120px]"></span>
      <InfiniteScroll 
        dataLength={data.length} 
        next={()=> setPage(prev=> prev += 1)}
        hasMore={hasMore} 
        loader={
          <span className="font-bold w-full text-center block"> 
            載入中......
          </span>
        }
      >
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
        </InfiniteScroll>
      <footer className="text-[#fff] w-full text-center py-8 font-black">
        © 2024 All Rights Reserved. Designed By Wayne
      </footer>
    </>
  )
}