import React,{useContext} from 'react';
import { LoginContext } from '../context/LoginContext';
import '../assets/css/BookList.css'
import { useState } from 'react';
import BookListComp from './BookListComp';

function BookList(props) {


    //상위컴포넌트가 넘겨준 값 useContext로 받기 
    const {isLogin,loginName,rentedBooks,setRentedBooks,bookList,setBookList} = useContext(LoginContext);
    
    //사용자가 입력한 추가할책 input 가져오기
    const [bookInput, setBookInput] = useState('');
    
    
    //추가버튼 클릭 시
    const add = () =>{
        if(!bookInput.trim()){
            alert('추가할 책 제목을 입력하세요');
            return;
        }
        const newBook = {
            isChecked: false,
            isRented: false,
            book: bookInput
        };

        const newList = [...bookList, newBook];
        setBookList(newList);
        setBookInput('');
    }

    //대여 버튼 클릭시
    const rentBooks = () =>{

        //대여할 책 가져오기 
        const selectBook = bookList.filter(list => list.isChecked && !list.isRented);

        if (selectBook.length === 0) {
            alert('대여할 책을 선택하세요');
            return;
        }
        //대여된 책 리스트에 저장될때 계속 체크표시되어있는거 초기화
        const cleanBooks = selectBook.map(book => ({
            ...book,
            isChecked: false
            }));

        //기존 도서목록 상태 변화(대여중 표시)
        const updatedBookList = bookList.map(list => {
            if (list.isChecked && !list.isRented) {
                return { ...list, isChecked: false, isRented: true, rentedBy: loginName};
            }
            return list;
        });

        const userBooks = rentedBooks[loginName] || [];
        const newUserBooks = [...userBooks, ...cleanBooks];
        
         
        setBookList(updatedBookList);
        setRentedBooks({ ...rentedBooks, [loginName]: newUserBooks }); //로그인 이름 key값

    }

    //삭제 버튼
    const del = () => {

        const newList = [...bookList].filter(x => x.isChecked === false);
        setBookList(newList);

    }

    //체크박스 선택 시
    const selectedBook = (index) =>{
        const newList = [...bookList]
        newList[index].isChecked = !newList[index].isChecked;

        setBookList(newList);
    }


    return (
        <> 
        {isLogin && loginName &&
        <>
            <div className='bookList-container'>
                <h2>도서 목록</h2>  
            </div>
                <div className='input-box'>
                    <input type='text'value={bookInput} onChange={(e)=>setBookInput(e.target.value)}/>
                    <button type='button' onClick={add}>추가</button>
                    <button type='button' onClick={rentBooks}>대여</button>
                    <button type='button' onClick={del}>삭제</button>
                </div>
            <section className='booklist-box'>
                {
                    bookList?.map((list,index) => (
                        <BookListComp 
                            key={index}
                            isChecked={list.isChecked}
                            isRented={list.isRented}
                            selectedBook={()=> selectedBook(index)}
                            book={list.book}
                            rentedBy={list.rentedBy}
                        />
                    ))
                }
            </section>
        </>
        }
        </>
    );
}

export default BookList;