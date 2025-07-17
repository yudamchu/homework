import React, { useEffect, useState } from 'react';
import'../assets/css/CardGameStyle.css'
import Cards from '../components/Cards'

function CardGame(props) {


    const [pcCard, setPcCard] = useState({player: 'PC', cards:[], cardSum:0});//pc 카드 정보
    const [cardList, setCardList] = useState([]);//랜덤으로 나온 카드 5장이 들어갈 배열
    const [isChecked, setIsChecked] = useState([]);//checkbox들의 index의 값이 저장될 곳 
    const [isStart, setIsStart] = useState(false);//시작 버튼이 눌러지면 해당 버튼 비활성화 하기 위해 
    

    useEffect(()=>{
        alert('게임 시작버튼을 누르고 카드 두장을 선택하세요!')
    },[]);


    //시작 버튼 클릭
    const createCard = () => {


        //중복 없이 5개 숫자 꺼내기
        const numbers = [];
        while(numbers.length<5){
            const val = Math.floor(Math.random()*20) +1;
            if(!numbers.includes(val)){
                numbers.push(val);
            }
            
        }
        setCardList(numbers); //cardList 배열에 저장

        //PC가 카드 2장 부여 (중복 없이)
        const pcNum = [];

         while(pcNum.length<2){
            const val = Math.floor(Math.random()*20) +1;
            if(!pcNum.includes(val)){
                 pcNum.push(val);
            } 
        }

        //pc 카드 합 구하기
        const pcSum = pcNum.reduce((a,b) => a+b);


        //pc 카드 정보에 업데이트
        setPcCard({

            player: 'PC', 
            cards: pcNum, 
            cardSum:pcSum
    
        });


        //시작버튼 누르면 시작 버튼 비활성화
        setIsStart(true);
    }

    //체크박스의 input(체크)가 감지 되었을때 실행
    const hanldCheckbox = (index) => {
       
        setIsChecked(prev => 
            {
                //이미 체크된 체크박스를 체크했을때 
                if(prev.includes(index)){
                    //배열에서 해당 index를 배열에서 제거함 (체크해제)
                    return prev.filter(i => i!==index);
                //만약 이미 카드 두장을 선택했다면 (배열의 길이가 이미 2라면) 경고
                }else if(prev.length >=2){
                    alert('카드는 두장만 선택 가능합니다.');
                    return prev;
                //아닐경우 해당 index 배열에 넣기
                }else{
                    return [...prev, index];
                }
                
            });

    }

    //선택 버튼: 사용자의 선택된 두장의 카드와 PC 카드 비교
    const selectCard = () => {

        //랜덤 카드 리스트가 생성되지 않았는데 선택 버튼을 눌렀을시 경고
        if(cardList.length === 0){
            alert('시작버튼을 누르세요');
            return;
        }

        //카드를 두장 선택하지 않았는데 선택 버튼을 눌렀을시 경고
        if(isChecked.length <=1){
            alert('2장의 카드를 선택하세요');
            return;
        }

        //체크된 배열의 인덱스 값을 카드 리스트의 인덱스 값으로 주어 선택된 카드 값 꺼내기
        const userCards = isChecked.map(i => cardList[i]);
        //선택된 카드 값 더하기
        const userSum = userCards.reduce((a,b)=>a+b);
        


        //결과
        alert(`${userCards}를 선택하였습니다. 합은 ${userSum}입니다.`);

        alert(`당신의 합: ${userSum}, pc의 합: ${pcCard.cardSum}`);

        if(userSum === pcCard.cardSum){
            alert('동점입니다.');
        }else if(userSum < pcCard.cardSum){
            alert('pc 승');
        }else{
            alert('당신이 이겼습니다.');
        };
        
        alert('게임 종료');
        deleteCard();
        setIsStart(false); //다시 시작버튼 활성화
        
    }

    //초기화 버튼
    const deleteCard = () =>{
        setCardList([]);
        setIsChecked([]);
        setIsStart(false);
    }

    

    return (
        <div>
            <main className='container'>
                <div className='content'>
                    <section className='board'>
                        {
                        cardList?.map((num, index) => (
                            <Cards key={index} number={num}>
                                <input type='checkbox' checked={isChecked.includes(index)} 
                                    onChange={()=> hanldCheckbox(index)}/>
                                <span style={{color: 'black'}}>{num}</span>
                            </Cards>
                        ))
                        }
                    </section>
                </div>
            <div className='btn-box'>
                <button type='button' onClick={createCard} disabled={isStart}>시작</button>
                <button type='button' onClick={selectCard}>선택</button>
                <button type='button' onClick={deleteCard}>리셋</button>
            </div>
            </main>
        </div>
    );
}

export default CardGame;