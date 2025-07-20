import React from 'react';
import {styled} from 'styled-components';

const MyTodo = styled.div`
*{
    margin: 0;
    padding: 0;
}

.btn-container{
    width: 200px;
}

`;
function Todo({userTodo, isChecked, isDisabled, selectedTodo, doneBtn, deleteBtn }) {
    return (
        <>
         <MyTodo>
            <input type='checkbox' checked={isChecked} onChange={selectedTodo}/>
            <div>{userTodo}</div>
            <div className='btn-container'>
            <button type='button' disabled={isDisabled} onClick={doneBtn}>완료</button>
            <button type='button' onClick={deleteBtn}>삭제</button>
            </div>
        </MyTodo>   
        </>
    );
}

export default Todo;