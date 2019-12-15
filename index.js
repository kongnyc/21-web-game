// document.addEventListener('DOMContentLoaded', () => {
    let id;
    let hit = document.createElement("button");
    hit.innerText="HIT";
    let stay = document.createElement("button");
    stay.innerText="STAY";

    let playerHand = {};
    let playerPoint=document.querySelector("#playerPoint")
    let player=document.querySelector("#player")

    let houseHand = {};
    let housePoint=document.querySelector("#housePoint")
    let house=document.querySelector("#house")
    let playerSum;
    let houseSum;
    // let twoBut=document.querySelector("#twoBut")
    
    const newDeckCards = async () => {
        try {
            let newDeck = await axios.get("https://deckofcardsapi.com/api/deck/new/")
            id = newDeck.data.deck_id;
            let shuffle = await axios.get(`https://deckofcardsapi.com/api/deck/${id}/shuffle/`)
            let button = document.querySelector('#button');
            // button.parentNode.removeChild(button)
            button.hidden=true
            twoBut.appendChild(hit)
            twoBut.appendChild(stay)
            // button.parentNode.replaceChild((hit,stay),button)
            displayCard();

        } catch (err) {
            console.log(err)
            debugger
        }
    }
    const displayCard = () => {
        drawCard(2,playerHand,player,playerSum,playerPoint);
        // winner();
        
        hit.addEventListener("click", ()=>{
            drawCard(1,playerHand,player,playerSum,playerPoint);
            // winner();
        })
        stay.addEventListener("click", ()=>{
            drawCard(3,houseHand,house,houseSum,housePoint);
            // console.log(housePoint)
            let h1=document.querySelector("h1")
            if(Number(housePoint.title)>21){
                h1.innerText="HOUSE BUSTED, Player Win$$$!"
            }else if (Number(housePoint.title)===21){
                h1.innerText="HOUSE WIN!"
            }else if(Number(housePoint.title)<=21 && Number(housePoint.title)>Number(playerPoint.tile)){
                h1.innerText="HOUSE WIN"
            }else{
                console.log("NOT CHECK")}
            });
        }
        const drawCard=async(numCard,hand,side,sum,point) =>{
            // let id = document.querySelector("#deckId");
            let drawCard=await axios.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=${numCard}`);
            drawCard.data.cards.forEach(card=>{
                let ol = document.createElement("ol");
                let image=document.createElement("img");
                image.src = card.image;
                ol.appendChild(image);
                side.appendChild(ol);
                hand[card.value] ? hand[card.value]+=1:hand[card.value]=1;
            }
            )
            score(hand,sum,point);
        }
        
        
        
        const score =(hand,sum,point)=>{
            sum=0;
            console.clear()
            for(let value in hand){
                if(value==="2"||value==="3"||value==="4"||value==="5"||value==="6"||value==="7"||value==="8"||value==="9"||value==="10"){
                    sum+=Number(hand[value]*value)
                    console.log(value)
                }else if(value==="KING"||value==="JACK"||value==="QUEEN"){
                    sum+=Number(hand[value]*10)
                    console.log("add 10")
                }else if(value==="ACE"){
                    sum+=Number(hand[value]*11);
                    console.log("add11")
                    if(sum>21){
                        sum-=Number(hand[value]*11);
                        sum+=Number(hand[value]*1);
                    }}
                }
                point.title=sum
                point.innerText=`${sum} point in hand`
                // winner();
        
            if(hand===playerHand){
                let h1=document.querySelector("h1")
                if(Number(playerPoint.title)===21){
                    h1.innerText="21 BLACK JACK!"
                    hit.hidden=true
                    stay.hidden=true
                    // stay.parentNode.removeChild(stay)
                }else if(Number(playerPoint.title)>21){
                    hit.hidden=true
                    stay.hidden=true
                    h1.innerText="BUSTED!"
                }
            }
            if(hand===houseHand){
                let h1=document.querySelector("h1")
                if(Number(housePoint.title)>21){
                    h1.innerText="House busted, Player Win!"
                    hit.hidden=true
                    stay.hidden=true
                }else if(Number(housePoint.title)===21){
                    h1.innerHTML="House 21, Player Loss"
                    hit.hidden=true
                    stay.hidden=true
                }
                else if((Number(housePoint.title)<21)&&(Number(housePoint.title)<Number(playerPoint.title))){
                    h1.innerHTML="House Loss, Player Win"
                    hit.hidden=true
                    stay.hidden=true
                }
                else if((Number(housePoint.title)===Number(playerPoint.title))){
                    h1.innerHTML="Game Tie, Player Win"
                    hit.hidden=true
                    stay.hidden=true
                }
                else if((Number(housePoint.title)<21)&&(Number(housePoint.title)>Number(playerPoint.title))){
                    h1.innerHTML="House Win, Player Loss"
                    hit.hidden=true
                    stay.hidden=true
            }
            }
}

   