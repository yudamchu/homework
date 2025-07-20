import React, { use, useState } from 'react';
import Todo from '../components/Todo';
import '../assets/css/TodoList.css';
function TodoList(props) {


    //토탈 사용자 정보 저장
    const [totalInfo, setTotalInfo] = useState({todo:0, done:0, percent:0});

    //사용자가 입력한 할일
    const [inputTodo, setInputTodo] = useState('');


    //todolist들 정보 담을 배열
    const [todoArr, setTodoArr] = useState([]);

    
    //체크된 체크리스트 저장
    const[selectedList, setSelectedList] = useState([]);

  

    //달성률 업데이트
    const updateTotalInfo = (arr) =>{
        const todo = arr.length;
        const done = arr.filter(a => a.isDisabled).length;
        const percent = todo === 0? 0: Math.floor((done/todo)*100);
        
        setTotalInfo({
            todo: todo,
            done: done,
            percent: percent
    
        });

    }

    //등록버튼
    const inputBtn = () =>{

        if(!inputTodo.trim())return;

        const newTodo = {
            userTodo: inputTodo,
            isChecked: false,
            isDisabled: false
        };

        const newArr = [...todoArr, newTodo];
        setTodoArr(newArr);
        setInputTodo('');
        updateTotalInfo(newArr);
 
    }


    //전체완료버튼
    const doneAllBtn = () => {
        const newArr = todoArr.map(arr => ({
            ...arr,
            isChecked: true,
            isDisabled: true
        }));

        setTodoArr(newArr);
        updateTotalInfo(newArr);
    };


    //체크박스 선택 시
    const selectedCheckbox = (index) => {

        const newArr = [...todoArr];

        //토글
        newArr[index].isChecked = !newArr[index].isChecked;
        newArr[index].isDisabled = !newArr[index].isDisabled;

        setTodoArr(newArr);
        updateTotalInfo(newArr);
    };

     // 완료 버튼 클릭 시
    const doneBtn = (index) => {
        const newArr = [...todoArr];
        newArr[index].isChecked = true;
        newArr[index].isDisabled = true;
        setTodoArr(newArr);
        updateTotalInfo(newArr);
    };


    // 삭제 버튼 클릭 시
    const deleteBtn = (index) => {
        const newArr = todoArr.filter((_, i) => i !== index);
        setTodoArr(newArr);
        updateTotalInfo(newArr);
    };


    return (
        <div className='container'>
            <section className='header'>
                <h2>TodoList</h2>
            </section>
            <section className='total-info'>
                <div>할 일 : {totalInfo.todo}</div>
                <div>한 일 :{totalInfo.done}</div>
                <div>달성률 :{totalInfo.percent}%</div>
            </section>
            <div className='input-box'>
                <input type='text' value={inputTodo} onChange={(e)=> setInputTodo(e.target.value)}/>
                <button type='button' onClick={inputBtn}>등록</button>
                <button type='button' onClick={doneAllBtn}>전체완료</button>
            </div>
            <section className='todolist-container'>
                {todoArr?.map((arr, index)=> <Todo
                     key={index}
                     userTodo={arr.userTodo}
                     isChecked={arr.isChecked}
                     isDisabled={arr.isDisabled}
                     selectedTodo={()=> selectedCheckbox(index)}
                     doneBtn={() => doneBtn(index)}
                     deleteBtn={() => deleteBtn(index)}
                />)}
          </section>
        </div>
    );
}

export default TodoList;