import React, { useState, useEffect, useCallback } from 'react';
import '../assets/css/LottoStyle.css'
import PcLotto from '../components/PcLotto';
import UserLotto from '../components/UserLotto';
import ResultsCompo from '../components/ResultsCompo';

function LottoMain(props) {

    
    const [pcNum, setPcNum] = useState([]); //기계 로또 번호 저장할 배열
    const [pcBonusNum, setPcBonusNum] = useState([]); //기계 로또 번호 저장할 배열
    const [userNum, setUserNum] = useState([]); //사용자 로또번호 저장할 배열
    const [isPcDisabled, setPcIsDisabled] = useState(false)//PC로또 볼 생성전 보이지 않도록
    const [isUserDisabled, setUserIsDisabled] = useState(false)//User로또 볼 생성전 보이지 않도록
    const [result, setResult] = useState([]); //각 유저로또 마다 등수 저장하는 배열
    const [matchedNum, setMatchedNum] = useState([]); 
    const [matchedBonus, setMatchedBonus] = useState([]); 

    useEffect(()=>{
        alert('🍀 행운을 시험해볼 시간! 먼저 [로또 생성]으로 당첨 번호를 뽑고, [사용자 로또]로 당신의 번호를 만들어 비교해보세요!🍀')
    },[]);

    //랜덤 번호 생성 
    function randomNum(n){
        
       const numbers = [];
        while(numbers.length < n ){
            const val = Math.floor(Math.random()*45) +1;
            if(!numbers.includes(val)){
                numbers.push(val);
            }
            
        }

        return numbers;

    }

    //PC로또 번호 만들기
    const makePcNum = useCallback(() => {
        //이전결과 초기화
        setResult([]);
        setMatchedNum([]);
        setMatchedBonus([]);
        setUserNum([]);
        setUserIsDisabled(false);

        const newRandomNum = randomNum(7);
        setPcNum(newRandomNum.slice(0,6));
        setPcBonusNum(newRandomNum[6]);
        setPcIsDisabled(true);
    }, []);


    
    //User로또번호 만들기
    const makeUserNum = useCallback(()=> {

        //이전 결과 초기화
        setResult([]);
        setMatchedNum([]);
        setMatchedBonus([]);

        const twoArray = Array.from({ length: 5 }, () => randomNum(6));

        setUserNum(twoArray);
        setUserIsDisabled(true);

    },[])

    //비교 버튼
    const compareBtn = useCallback(() =>{


        const match = [];
        const bonusMatch = [];
        const resultArr = [];

    for (let i = 0; i < userNum.length; i++) {
        const arrMatch = [];
        const arrBonusMatch = [];

        // 일반 번호 비교
        for (let j = 0; j < userNum[i].length; j++) {
            if (pcNum.includes(userNum[i][j])) {
                arrMatch.push(userNum[i][j]);
                
                
            }

            // 보너스 번호 비교
            if (userNum[i][j] === pcBonusNum) {
                arrBonusMatch.push(userNum[i][j]);
                
            }
        }

            match.push(arrMatch);
            bonusMatch.push(arrBonusMatch);


            //비교
            if(match[i].length === 6){
                resultArr.push('1등');
            }else if(match[i].length === 5 && bonusMatch[i].length === 1){
                resultArr.push('2등');
            }else if(match[i].length === 5){
                resultArr.push('3등');
            }else if(match[i].length === 4){
                resultArr.push('4등');
            }else if(match[i].length === 3){
                resultArr.push('5등');
            }else {
                resultArr.push('꽝');
            }

        }
        

        console.log(match);
        console.log(bonusMatch);
        console.log(resultArr);

        setMatchedNum(match);
        setMatchedBonus(bonusMatch);
        setResult(resultArr);
        
        
        
    },[userNum, pcBonusNum, pcNum])

    return (
        <div>
            <div className='container'>
                <div className='main-box'>
                    <h1>로또</h1>
                    <div className='btn-box'>
                        <button type='button' onClick={makePcNum} >로또생성</button>
                        <button type='button' onClick={makeUserNum} disabled={pcNum.length === 0}>사용자 로또</button>
                        <button type='button' onClick={compareBtn} disabled={pcNum.length === 0 || userNum.length === 0}>비교</button>
                    </div>
                    <section className='lotto-num'>
                        { pcNum?.map((x,i) =>(
                            
                            <PcLotto
                            key={i}
                            pcNum={x}
                            isDisabled={isPcDisabled}
                            />
                        ))
                        }
                        
                        {pcBonusNum && pcBonusNum.length !==0 &&
                        <>   
                            <span>+</span>
                            <PcLotto
                                pcNum={pcBonusNum}
                                isDisabled={isPcDisabled}
                                Bonus='true'
                            />
                        </>
                        }   
                    </section>
                    <section className='userNum-box'>
                        <span className='user-num'>
                        {
                        userNum?.map((arr,i) => 
                            (
                            <>
                                <UserLotto
                                    key={i}
                                    arr={arr}
                                    isDisabled={isUserDisabled}
                                    isMatched={matchedNum[i]}
                                    isBonus={matchedBonus[i]}
                                />
                            </>
                            ))
                        }
                        </span>
                        <span className='result-box'>
                        {
                            result?.map((r,i)=>(
                                <ResultsCompo 
                                    key={i}
                                    result={r}
                                />
                            ))
                        }
                        </span>
                        
                    </section>
                </div> 
            </div>          
        </div>
    );
}

export default LottoMain;