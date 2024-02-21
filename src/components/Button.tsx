
const btnData = [
    '全部新聞','壹蘋果','ETtoday','民視','Newtalk','三立','風傳媒','台視','自由時報','東森','中時'
]

interface ButtonProps {
    handleKeyWord: (keyword: string) => Promise<void>;
}

export default function Button({handleKeyWord}: ButtonProps) {
  return (
    <>
      {btnData.map((name: string) =>(
        <button key={crypto.randomUUID()} 
                onClick={()=> handleKeyWord(`${name === '全部新聞' ? '' : name}`)}
        >
          {name}
        </button>
      ))}
    </>
  )
}
