import React from 'react';
import {styled} from 'styled-components';

const MyResult = styled.div`
    width: 70px;
    height: 70px;
    border-radius: 10px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function ResultsCompo({result}) {
    return (
        <div>
          <MyResult>
            {result}
          </MyResult>  
        </div>
    );
}

export default ResultsCompo;