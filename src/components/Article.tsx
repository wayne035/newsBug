
interface ArticleProps{
  data: {
    name: string,
    link: string,
    time: string,
    title: string
    color: string,
  }[]
  keyWord: string,
}

export default function Article({data, keyWord}: ArticleProps) {
  return (
    <>
      {
        data?.filter(event=> keyWord ? (event.name === keyWord) : true )
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
        ))
      }
    </>
  )
}