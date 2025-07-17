import React from 'react';
import { styled } from 'styled-components';

const MyCard = styled.div`
    width: 110px;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid gray;
    border-radius: 10px;  
    background-color: #f9f8f8
`;
function Cards({children}) {
    return (
        <div>
         <MyCard>
            <p>{children}</p>
         </MyCard>
        </div>
    );
}

export default Cards;