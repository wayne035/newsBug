import { useEffect,useState } from "react"
import InfiniteScroll from 'react-infinite-scroll-component'
import Button from "./components/Button"
import Article from "./components/Article"

interface News{
  name: string,
  link: string,
  time: string,
  title: string
  color: string,
}

export default function page() {
  const [allData, setAllData] = useState([] as News[])
  const [otherData, setOtherData] = useState([] as News[])
  const [isLoading, setIsLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [isAllNews, setIsAllNews] = useState(true)
  const [page, setPage] = useState(0)

  async function getAllData(page: string|number){
    if(allData.length < 1100){
      try{
        const res = await fetch(import.meta.env.VITE_ALL_NEWS_URL + `/${page}`)
        const data = await res.json()
        if ( data.length === 0 ) return setHasMore(false)
        setAllData(pre=> [...pre, ...data])
      }catch(e){
          console.log((e as Error).message)
      }
    }
    else{
      setHasMore(false)
    }
  }

  useEffect(()=> {
    getAllData(page)
  },[page])

  return (
    <>
      <header className="fixed bg-[#000] border-b-2 top-0 left-0 w-full">
        <h1 className="absolute top-0 left-0 text-transparent">newsBug</h1>
        <nav className="flex flex-wrap justify-center p-4 lg:my-4">
          <Button setIsAllNews={setIsAllNews} 
                  setOtherData={setOtherData}
                  setIsLoading={setIsLoading}
          />
        </nav>
      </header>
      <span className="block h-[180px] md:h-[115px]"></span>
        {isAllNews ? (
            <InfiniteScroll 
              dataLength={allData.length} 
              next={()=> setPage(prev => prev += 1)}
              hasMore={hasMore} 
              loader={
                <span className="text-[#fff] md:text-[108px] font-bold w-full text-center block"> 
                  載入中......
                </span>
              }
            >
              <Article data={allData}/>
            </InfiniteScroll>
          ):(
            isLoading ? 
              <span className="text-[#fff] md:text-[108px] font-bold w-full text-center block">
                載入中......
              </span>
              : <Article data={otherData}/>
          )
        }
      <footer className="text-[#fff] w-full text-center py-8 font-black">
        © 2024 All Rights Reserved. Designed By Wayne
      </footer>
    </>
  )
}