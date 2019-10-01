import React, { useEffect, useState } from "react"


const MyItinerary = props => {
    //create a state variable for itineraryitems - useState()
    const [itineraryList, setItineraryList] = useState([])
    //create useEffect()
    useEffect(() => {
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
    }, [])
    //convert to JSON
    //store itinerary items in state variable

    //Create HTML representation with JSX
    return (
        <>
            <h2>What I Want to do on Saturday</h2>
            <ul>
                {
                    itineraryList.map((item) => {
                        return(
                        <>
                        <li>

                                {item.attraction.area.name} {item.attraction.name} at {item.starttime}
                        </li>
                                <button onClick=""> Delete </button>
                                </>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default MyItinerary