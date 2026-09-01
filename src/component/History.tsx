import { FaRegTrashAlt } from "react-icons/fa";
import type { JSX } from 'react';
import type {dataType} from '../type/type.ts'
import { CiFaceFrown, CiFaceMeh, CiFaceSmile } from "react-icons/ci";

type HistoryProps = {
  data: dataType[]
  setData: React.Dispatch<React.SetStateAction<dataType[]>>;
}


const History = (props: HistoryProps): JSX.Element => {
  const handleDelete = (id: string) => {
    props.setData(prev => prev.filter(item => item.id !== id));
  }


  return(
    <div className="p-6 border-gray-400 border rounded-xl bg-white/50 backdrop-blur-sm">
      <p>Study Log History</p>
      {props.data.map((item) => (
        <div key={item.id} className="p-4 rounded-lg border bg-white/80 hover:bg-white transition-colors mb-5">
          <div className="flex justify-between">
            <p className="text-left">
              <span className="pr-2">{item.topic === "プログラミング" ?
                <>💻</> :
                item.topic === "読書" ?
                <>📚</> :
                <>🗽</>
              }</span>
              {item.topic}
              <span className="pl-4">{item.day}</span>
            </p>
            <p className="flex items-center justify-end">
              {item.mode === 0 ? 
                <CiFaceFrown /> : 
                item.mode === 1 ? 
                <CiFaceMeh /> :
                <CiFaceSmile />
            }
              {item.time}min
              <FaRegTrashAlt onClick={() => handleDelete(item.id)}/>
            </p>
          </div>
          <p className="text-left">{item.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default History