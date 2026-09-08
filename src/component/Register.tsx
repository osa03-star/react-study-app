import type { JSX } from 'react';
import { useState, useRef } from 'react'
import { CiFaceFrown, CiFaceMeh, CiFaceSmile } from "react-icons/ci";
import type {dataType} from '../type/type.ts'

type RegisterProps = {
  data: dataType[];
  setData: React.Dispatch<React.SetStateAction<dataType[]>>;
}

const Register = (props: RegisterProps): JSX.Element => {
  const weeks = ['月', '火', '水', '木', '金', '土', '日']
  const topics = ['プログラミング', '読書', '英語']
  const [mode, setMode] = useState<null | number>(null);
  const [errorMessage, setErrorMessage] = useState<string[]>([]);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let messageArray = [];
    if(e.currentTarget.day.value === "曜日"){
      messageArray.push('曜日を選択してください');
    }
    if(e.currentTarget.topic.value === '学習トピック'){
      messageArray.push('学習トピックを選択してください。');
    }
    if(e.currentTarget.time.value <= 0){
      messageArray.push('時間は0以上の整数で入力してください');
    }
    if(mode === null){
      messageArray.push('自己評価を設定してください');
    }

    if(messageArray.length !== 0){
      setErrorMessage(messageArray);
      return;
    }

    setErrorMessage([]);
  
    const data = {
      id : crypto.randomUUID(),
      day: e.currentTarget.day.value,
      topic: e.currentTarget.topic.value,
      time: e.currentTarget.time.value,
      mode: mode,
      comment: e.currentTarget.comment.value,
    };

    props.setData((prev) => [...prev, data]);
    console.log(props.data);
    formRef.current?.reset();
    setMode(null);
  }

  return(
    <div className="bg-white shadow-sm rounded-lg p-6 mb-4">
      <p>新規ログの追加</p>
      <form className="space-y-3" onSubmit={handleSubmit} ref={formRef}>
        <select name="day" className="block text-sm text-gray-700 w-full rounded-md p-2 border shadow-sm ">
          <option>曜日</option>
          {weeks.map((week, index) => (
            <option key={index}>{week}</option>
          ))}
        </select>
        <select name="topic" className="block w-full text-sm text-gray-700 rounded-md p-2 border shadow-sm ">
          <option>学習トピック</option>
          {topics.map((topic, index) => (
            <option key={index}>{topic}</option>
          ))}
        </select>
        <p className="block text-sm font-medium text-gray-700 mb-1">作業時間</p>
        <input name="time" type="number" min={0} className="block p-2 text-sm border w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
        <p className="block text-sm font-medium text-gray-700 mb-1">自己評価</p>
        <div className="flex space-x-1">
          <div className={`w-full rounded-xl border p-6 ${mode === 0 ? "bg-gray-100" : ""}`} onClick={() => setMode(0)}><CiFaceFrown /></div>
          <div className={`w-full rounded-xl border p-6 ${mode === 1 ? "bg-gray-100" : ""}`} onClick={() => setMode(1)}><CiFaceMeh /></div>
          <div className={`w-full rounded-xl border p-6 ${mode === 2 ? "bg-gray-100" : ""}`} onClick={() => setMode(2)}><CiFaceSmile /></div>
        </div>
        <p className="block text-sm font-medium text-gray-700 mb-1">メモ：</p>
        <textarea 
          name='comment'
          placeholder="（任意）" 
          className="block border text-sm p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-20">
        </textarea>
        <div className='text-red-500 pb-2'>
          {errorMessage.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">追加</button>
      </form>
    </div>
  );
}

export default Register