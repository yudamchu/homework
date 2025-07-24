import React from 'react';
import { LoginContext } from '../context/LoginContext';
import LibraryLogin from '../components/LibraryLogin';
import MyBooks from '../components/MyBooks';
import BookList from '../components/BookList';
import { useState } from 'react';


//상위 컴포넌트-Provider로 자식 컴포넌트에 값 넘기기


function LibraryLayout(props) {
    
    const[isLogin, setIsLogin] = useState(false); //로그인 상태
    const [loginName, setLoginName] = useState(''); // 로그인한 사람 저장
    const [isDisabled, setIsDisabled] = useState(false); //체크박스 disabled 여부
    const [rentedBooks,setRentedBooks] = useState({}); //대여중인 책과 누가 대여중인지 
    const [bookList, setBookList] = useState([]); //공통 도서 리스트
    

    //셀렉트 박스 클릭시
    const select = (e) =>{
         setLoginName(e.target.value);
    }

    //로그인 버튼 클릭시
    const login = () =>{
        if(!loginName.trim()){
            alert('로그인할 이름을 선택하세요')
            return;
        }
        setIsLogin(true);
        setIsDisabled(true);
    }

    //로그아웃 버튼 클릭시
    const logout = () =>{
        
        setIsLogin(false);
        setIsDisabled(false);
        setLoginName('');
    }



    return (
        <div>
           <LoginContext.Provider value={{isLogin,loginName,isDisabled,rentedBooks,bookList, select, login, logout,setRentedBooks,setBookList}}>
                <LibraryLogin/>
                <MyBooks/>
                <BookList/>
           </LoginContext.Provider>
        </div>
    );
}

export default LibraryLayout;