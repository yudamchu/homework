import React from 'react';
import {styled} from 'styled-components';

const PcNum = styled.div`
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: ${(props)=> props.$Bonus? '#e0f5bb':'#a7d1f6'};
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: ${(props)=> props.$isDisabled? 1: 0};

`;
function PcLotto({pcNum, isDisabled, Bonus}) {
    return (
        <>
          <PcNum $isDisabled={isDisabled} $Bonus={Bonus}>
            <div>{pcNum}</div>
          </PcNum>  
        </>
    );
}

export default PcLotto;