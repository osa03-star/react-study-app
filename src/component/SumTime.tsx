import { HiOutlineSlash } from "react-icons/hi2";
import type { JSX } from 'react';
import type {dataType} from '../type/type.ts'

type SumTimeProps = {
  data: dataType[];
}


const SumTime = (props: SumTimeProps): JSX.Element => {
  const sum = Object.values(
    props.data.reduce<Record<string, dataType>>((acc, item) => {
      if(!acc[item.topic]){
        acc[item.topic] = {...item};
      }else{
        acc[item.topic].time += Number(item.time);
      }

      return acc;
    }, {})
  )
  const programming = sum.find(item => item.topic === "プログラミング")?.time;
  const reading = sum.find(item => item.topic === "読書")?.time;
  const english = sum.find(item => item.topic === "英語")?.time;

  return(
    <div className="flex justify-between text-left mb-10">
      <div className="p-4 border border-gray-400 rounded-xl bg-white/50 backdrop-blur-sm space-y-2">
        <p>プログラミング<span className="pl-10">💻</span></p>
        <p className="flex items-center">{programming}分<HiOutlineSlash />780分 (先週)</p>
      </div>
      <div className="p-4 border border-gray-400 rounded-xl bg-white/50 backdrop-blur-sm space-y-2">
        <p>読書<span className="pl-10">📚</span></p>
        <p className="flex items-center">{reading}分<HiOutlineSlash />295分 (先週)</p>
      </div>
      <div className="p-4 border border-gray-400 rounded-xl bg-white/50 backdrop-blur-sm space-y-2">
        <p>英語<span className="pl-10">🗽</span></p>
        <p className="flex items-center">{english}分<HiOutlineSlash />285分 (先週)</p>
      </div>
    </div>
  );
}

export default SumTime
