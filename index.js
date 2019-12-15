// document.addEventListener('DOMContentLoaded', () => {
    let playerHand = {};
    let player=document.querySelector("#player")
    let houseHand = {};
    let house=document.querySelector("#house")
    let playerSum =0;
    let houseSum=0;
    let id;
    let hit = document.createElement("button");
    hit.innerText="HIT";
    let stay = document.createElement("button");
    stay.innerText="STAY";
    let twoBut=document.querySelector("#twoBut")
    
    const newDeckCards = async () => {
        try {
            let newDeck = await axios.get("https://deckofcardsapi.com/api/deck/new/")
            id = newDeck.data.deck_id;
            let shuffle = await axios.get(`https://deckofcardsapi.com/api/deck/${id}/shuffle/`)
            let button = document.querySelector('#button');
            button.parentNode.removeChild(button)
            twoBut.appendChild(hit)
            twoBut.appendChild(stay)
            // button.parentNode.replaceChild((hit,stay),button)
            displayCard();

        } catch (err) {
            console.log(err)
            debugger
        }
    }
    
    const drawCard=async(numCard,hand,side) =>{
        // let id = document.querySelector("#deckId");
        let drawCard=await axios.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=${numCard}`);
        drawCard.data.cards.forEach(card=>{
            let ol = document.createElement("ol");
            let image=document.createElement("img");
            image.src = card.image;
            ol.appendChild(image);
            side.appendChild(ol);
            hand[card.value] ? hand[card.value]+=1:hand[card.value]=1;
        })
        score(hand);
    }

    const displayCard = async() => {

        drawCard(3,playerHand,player);

        hit.addEventListener("click", ()=>{
            drawCard(1,playerHand,player);
            // console.log(playerHand)
        })
        stay.addEventListener("click", ()=>{
            drawCard(3,houseHand,house);
            // console.log(houseHand)
        })
    }
    
    const score =(hand)=>{
        playerSum=0;
        for(let value in hand){
            if(value==="2"||value==="3"||value==="4"||value==="5"||value==="6"||value==="7"||value==="8"||value==="9"||value==="10"){
                playerSum+=Number(hand[value]*value)
                console.log(value)
            }else if(value==="KING"||value==="JACK"||value==="QUEEN"){
                playerSum+=Number(hand[value]*10)
                console.log("add 10")
            }else if(value==="ACE"){
                playerSum+=Number(hand[value]*11);
                console.log("add11")
                if(playerSum>21){
                    playerSum-=Number(hand[value]*11);
                    playerSum+=Number(hand[value]*1);
                }
            }
    }
    console.log(`total is ${playerSum}`)
}
    // let h1=document.querySelector("h1")
   // if(total===21){
   //             h1.innerText="BLACK JACK!"
   //     }else if(total>21){
   //                 h1.innerText="BUSTED!"
   //         }
   
       // let cards=document.querySelector("body > ol:nth-child(5)")
       
               // if(cards){
               //     drawCard(1)
               // }else{
               // }
       // debugger;
       // drawCard.data.cards.forEach(card=>{
           
           // let ol = document.createElement("ol");
           // let image=document.createElement("img")
           // image.src = card.image;
           // ol.appendChild(image)
           // document.body.appendChild(ol)
           // if(card.value==="KING"||card.value==="QUEEN"||card.value==="JACK"){
           //     ol.value=10
           //     total+=Number(ol.value)
           // }
           // else if(card.value==="ACE"){
           //     ol.value=11;
           //     total+=Number(ol.value)

           //     if(total>21){
           //         total-=11;
           //         ol.value=1
           //         total+=Number(ol.value)
           //     }
           // }
           // else{
           //     ol.value=card.value
           //     total+=Number(ol.value)
           // }
           

           // if(card.value==="ACE"){
           //     score.value>21 ? ol.value=1:ol.value=11;
           // }else if(card.value==="KING"||card.value==="QUEEN"||card.value==="JACK"){
           //     ol.value=10
           // }else{
           //     ol.value=card.value
           // }
           // total+=Number(ol.value)
       // })
    // newDeckCards()
// })