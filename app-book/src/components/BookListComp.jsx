import React from 'react';

import {styled} from 'styled-components';

const MyBook = styled.div`

    *{
        margin: 0;
        padding: 0;
    }
    .box{
        width: 500px;
        height: 50px;
        display: flex;
        align-items: center;
        border: 1px solid black;
        padding: 10px;
        border-radius: 20px;
    }

    .checkbox{
        width: 20px;
        height: 20px;
        margin: 10px;
    }
    
`;
function BookListComp({isChecked,book,selectedBook,isRented,rentedBy}) {
    return (
        <>
            <MyBook>
                <div className='box'>
                    <input className='checkbox' type='checkbox' checked={isChecked} onChange={selectedBook} disabled={isRented} rentedBy={rentedBy}/>
                    <p>{book} {isRented&& `대여중(${rentedBy})`}</p>
                </div>
           </MyBook>
       </>
    );
}

export default BookListComp;