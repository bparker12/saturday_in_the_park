import React, { useEffect, useState } from "react"


const MyItinerary = props => {
    //create a state variable for itineraryitems - useState()
    const [itineraryList, setItineraryList] = useState([])
    //create useEffect()
    const getItineraries = () => {
        //fetch the data from the localhost:8000/itineraryitems
        fetch("http://localhost:8000/itineraryitems", {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("kennywood_token")}`
            }
        })
            .then(response => response.json())

            .then(setItineraryList)
    }
    useEffect(getItineraries, [])
    //convert to JSON
    //store itinerary items in state variable
    const handleDeleteButton = (id) => {
        const confirm = window.confirm("Are you sure you wish to remove this?")
        if(confirm === true){
            console.log(id)
            fetch(`http://localhost:8000/itineraryitems/${id}`, {
                "method": "Delete",
                "headers": {
                    "Authorization": `Token ${localStorage.getItem("kennywood_token")}`
                }
            })
            .then(() => {
                getItineraries()
            })

            } else {
            console.log("false works")
        }
    }

    //Create HTML representation with JSX
    return (
        <>
            <h2>What I Want to do on Saturday</h2>
            <ul>
                {
                    itineraryList.map((item) => {
                        return<li key={item.id}>

                                {item.attraction.area.name} {item.attraction.name} at {item.starttime}
                                <br></br>
                                <button onClick={() =>handleDeleteButton(item.id)} id={item.id} value={item.id}> Delete </button>
                        </li>
                    })
                }
            </ul>
        </>
    )
}

export default MyItinerary