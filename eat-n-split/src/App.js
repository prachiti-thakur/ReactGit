import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },

];


////////////////////////////////////////////

function Button({children,onClick}){
  return <button className="button" onClick={onClick}> {children}</button>
}

//////////////////////////////////////////////////////////////

export default function App(){
  const[friends,setFriend]=useState(initialFriends)
  const [showAddFriend,setshowAddFriend]=useState(false) //when to show the form

  //selected friend in splitform
  const[selectedFriend,setSelectedFriend]=useState(null)

  function handleSomeAddFriend(){
    setshowAddFriend((show)=>!show)
  }

  function handleAddFriend(friend){
    setFriend(friends => [...friends,friend])
    //after adding the new frind just hide the form again
    setshowAddFriend(false);
  }

  function handleSelection(friend){
    // setSelectedFriend(friend)
    setSelectedFriend((cur)=> cur?.id===friend.id ? null : friend);
     setshowAddFriend(false) // just hiding the form 
  }

///////////////////////////////////////////////////
  function handleSplitBill(value){
    // console.log(value)
    setFriend((friends)=>
      friends.map(
        (friend)=>friend.id === selectedFriend.id ? {...friend,balance:friend.balance +value} :friend
      )
    )

    setSelectedFriend(null) //to hide the splitform 


  }


  //////////////////////////////////////////

  return(
    <div className="app">
      <div className="sidebar">
        <FriendList Friends={friends} 
        onselectionchange={handleSelection}
        selectedFriend={selectedFriend}
        />
        {/* add form of friend */}

        { showAddFriend && <FormAddFriend  onAddFriends={handleAddFriend}/> }
        
        <Button onClick={handleSomeAddFriend}> 
          {showAddFriend ? 'Close':'Add Friend'}</Button>
    
     
      </div>
      {selectedFriend &&<FormSplitBill selectedFriend={selectedFriend}
       onSplitBill={handleSplitBill}/>}
    </div>
  )
}
////////////////////////////////////////////////////////////////


function FriendList({Friends,onselectionchange,selectedFriend}){
  return (
    <ul>
      {Friends.map (
        friend =>
          
            <Friend friend={friend}  key={friend.id} 
            onselectionchange={onselectionchange}
            selectedFriend={selectedFriend}/>
          
      )}
    </ul>
  )
}

/////////////////////////////////////////////////////

function Friend({friend,onselectionchange,selectedFriend}){

  //to select or close text on btn
  //bcz we are initailly puttoing it as  null  so direcly try to acce the id it will give an error
  // const isSelected=selectedFriend && selectedFriend.id === friend.id;
  const isSelected=selectedFriend?.id === friend.id;
return (
  <li className={isSelected ? "selected":""}>
    <img src={friend.image} alt={friend.name}/>
    <h3>{friend.name}</h3>
    {friend.balance <0 && (
      <p className="red">
        You owe {friend.name} {Math.abs(friend.balance)}
      </p>
    )}

{friend.balance >0 && (
      <p className="green">
        {friend.name} owe  you {Math.abs(friend.balance)}
      </p>
    )}

{friend.balance === 0 && (
      <p>
        you and {friend.name} are even 
      </p>
    )}

    <Button onClick={()=>onselectionchange(friend)}>{isSelected ? 'close':'select'}</Button>
  </li>
)
}



////////////////////////////////////////////////
function FormAddFriend({onAddFriends}){
  const [name,setName]=useState("")
  const [image,setImage]=useState("https://i.pravatar.cc/48")

  function handleSubmit(e){
    e.preventDefault()

    if (!name || !image) return ;

    const id =crypto.randomUUID();
    const newFriend={
      id,
      name,
      image:`${image}?=${id}`,
      balance:0,
    };

    onAddFriends(newFriend)
    setName("")
    setImage("https://i.pravatar.cc/48")
  }

  return (
    <form className="form-add-friend " onSubmit={handleSubmit}>
      <label> 👫  Friend Name</label>
      <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>


      <label> 📷 image URL </label>
      <input type="text" value={image} onChange={(e)=>setImage(e.target.value)}/>
      <Button>Add</Button>

    </form>
  )
}

////////////////////////////////////////////

function FormSplitBill({selectedFriend,onSplitBill}){
    const [bill,setBill]=useState("");
    const [paidByUser,setPaidByUser]=useState("");

    // derived state
    const paidByFriend= bill? bill-paidByUser :'';
    ///////////////////////////////////////

    const [whoIsPaying,setWhoIsPaying]=useState("user")


    function handleSubmit(e){
      e.preventDefault();

      if(!bill || !paidByFriend) return;

      // 

      onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser)
    }


  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name} </h2>

      <label>💰Bill value</label>
      <input type="text" value={bill} onChange={(e)=>setBill(Number(e.target.value))} />

      <label> 🧍 Your Expense</label>
      {/* to avoid the use to enter the amount greater than the total bill */}
      <input type="text" value={paidByUser} 
      onChange={(e)=>setPaidByUser(Number(e.target.value) > bill ?  paidByUser : Number(e.target.value))}

      />

      <label> 👫  {selectedFriend.name}'s  value</label>
      <input type="text"  value={paidByFriend}disabled/>

      <label> 💵 who is paying the bill</label>
      <select value={whoIsPaying} onChange={(e)=>setWhoIsPaying(e.target.value)}>
        <option value='user'>you</option>
        <option value='friend'> {selectedFriend.name} </option>
      </select>

      <Button>Split bill</Button>

    </form>
  )
}