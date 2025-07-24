import React,{useContext} from 'react';
import { LoginContext } from '../context/LoginContext';
import '../assets/css/MyBooksStyle.css'
import { useState } from 'react';
import { useEffect } from 'react';
import BookListComp from './BookListComp';

function MyBooks(props) {

    //상위컴포넌트가 넘겨준 값 useContext로 받기 
    const {isLogin,loginName,rentedBooks,setRentedBooks,bookList,setBookList} = useContext(LoginContext);
    

    //사용자가 대여중인 목록 저장
     const [myBookList, setMyBookList] = useState([]);

     //사용자 이름과, 대여중인 책 목록이 업데이트 될때마다 새로저장
    useEffect(() => {
        if (loginName) {
            
            setMyBookList(rentedBooks[loginName]|| []); 
        }
    }, [loginName, rentedBooks]);


    //셀렉트 박스 선택시
    const selectedBook = (index) => {
        
        const newList = [...myBookList];
        newList[index].isChecked = !newList[index].isChecked;
        setMyBookList(newList);
    };
    
   

    //반납버튼 클릭시
    const returnBtn = () =>{
        
        // 1. 반납할 책과 유지할 책 나누기
        const selected = myBookList.filter(x => x.isChecked);
        const remaining = myBookList.filter(x => !x.isChecked);

        if(selected.length === 0){
            alert('반납할 책을 선택하세요');
        }

        // 2. bookList에서 반납 대상 책들 업데이트
        const updatedBookList = bookList.map(book => {
            const isReturning = selected.find(sel => sel.book === book.book && book.rentedBy === loginName);
            if (isReturning) {
                return { ...book, isRented: false, rentedBy: null, isChecked: false };
            }
            return book;
        });

        // 3. rentedBooks에서도 해당 사용자 목록 업데이트
        const updatedRentedBooks = {
            ...rentedBooks,
            [loginName]: remaining
        };

        // 4. 상태 업데이트
        setBookList(updatedBookList);
        setRentedBooks(updatedRentedBooks);
        setMyBookList(remaining);

        }


    return (
        <>
        {isLogin && loginName && 
        <>
            <div className='mybooks-container'>
                <h2>대여한 도서 목록</h2>
                <button type='button' onClick={returnBtn}>반납</button>
            </div>
            <section className='mybooks-list'>
                {
                    myBookList?.map((list, index) => (
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

export default MyBooks;