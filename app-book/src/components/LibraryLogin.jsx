import React,{useContext, useState} from 'react';
import { LoginContext } from '../context/LoginContext';
import '../assets/css/LibraryLoginStyle.css'

function LibraryLogin(props) {
    //상위컴포넌트가 넘겨준 값 useContext로 받기 
    const {isLogin,loginName,isDisabled, select, login, logout} = useContext(LoginContext);
    


    return (
        <>
         <div className='container'>
            <h1>도서 대여 시스템</h1>
            <div className='box'>
                <select className='select-box' onChange={select} value={loginName} disabled = {isDisabled}>
                    <option value="" disabled>이름 선택</option>
                    <option value='김철수'>김철수</option>
                    <option value='이영희' >이영희</option>
                </select>
            
            {isLogin && loginName?
                <>
                    <button type='button' onClick={logout}>로그아웃</button>
                    <p>로그인 사용자: {loginName}</p>   
                </>
                :
                
                <button type='button' onClick={login}>로그인</button>
            }
            </div>
         </div>   
        </>
    );
}

export default LibraryLogin;