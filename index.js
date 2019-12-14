// document.addEventListener('DOMContentLoaded', () => {
    let playerHand = {};
    let houseHand = {};
    let playerSum =0;
    let houseSum=0;
    let id=""

    const newDeckCards = async () => {
        try {
            let newDeck = await axios.get("https://deckofcardsapi.com/api/deck/new/")
            let deck_id = newDeck.data.deck_id;
            // let id = document.querySelector("#deckId");
            id = newDeck.data.deck_id;
            // id.innerHTML=newDeck.data.deck_id;
            let shuffle = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/shuffle/`)
            let button = document.querySelector('#button');
            button.parentNode.removeChild(button);
            displayCard();
        } catch (err) {
            console.log(err)
            debugger
        }
    }
    
    const drawCard=async(numCard, hand) =>{
        let id = document.querySelector("#deckId");
        let drawCard=await axios.get(`https://deckofcardsapi.com/api/deck/${id.value}/draw/?count=${numCard}`);
        drawCard.data.cards.forEach(card=>{
            let ol = document.createElement("ol");
            let image=document.createElement("img");
            image.src = card.image;
            ol.appendChild(image);
            document.body.appendChild(ol);
            hand[card.value] ? hand[card.value]+=1:hand[card.value]=1;
        }
        )
        score(playerHand);
    }

    const displayCard = async() => {
        let hit = document.createElement("button");
        hit.innerText="HIT";
        let stay = document.createElement("button");
        stay.innerText="STAY";
        document.body.appendChild(hit);
        document.body.appendChild(stay);

        drawCard(2,playerHand);

        hit.addEventListener("click", ()=>{
            drawCard(1,playerHand);
            console.log(playerHand)
        })
        stay.addEventListener("click", ()=>{
            drawCard(3,houseHand);

            console.log(houseHand)
        })
        
    }
    
    const score =(hand)=>{
        // let tenPoint=["KING", "JACK", "QUEEN"]
        for(let value in hand){
            if(value==="KING"||value==="JACK"||value==="QUEEN"){
                playerSum+=10
                console.log("add 10")
            }else if(value==="ACE"){
                playerSum+=11;
                console.log("add 11")
                if(playerSum>21){
                    playerSum-=11;
                    console.log("mins 11")
                }else{
                    playerSum+=1
                    console.log("add 1")
                }
            }else{
                playerSum+=Number(value)
                // console.log(`${playerSum} include ${Number(value)}`)
            }
        // let score = document.createElement("ul");
        // console.log(hand);
        // score.innerText=playerSum
        // console.log(playerSum)
        // document.body.appendChild(score);
    }
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