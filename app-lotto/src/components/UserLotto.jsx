import React from 'react';
import {styled} from 'styled-components';

const UserNum = styled.div`
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: ${(props)=> props.$isMatched? '#abf3d7': props.$isBonus? '#e0f5bb' : '#c2daef'};
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: ${(props)=> props.$isDisabled? 1: 0};


`;
function UserLotto({arr, isDisabled,isMatched,isBonus}) {
    return (
        <div className='ball'>
            {arr?.map((x,idx) => 
            <>
                <UserNum key={idx} $isDisabled={isDisabled} $isMatched={isMatched?.includes(x)} $isBonus={isBonus?.includes(x)} >
                    <div>{x}</div>
                </UserNum>
            </>
            )}
        </div>
    );
}

export default UserLotto;
