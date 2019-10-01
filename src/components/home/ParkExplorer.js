import React, { useEffect, useState } from "react"
import AreaList from "./AreaList"
import "./Explorer.css"
import Attractions from "./Attractions"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

// all state should be maintained here, so that it can be utilized elsewhere if neeed be
// this is also the "home" for this app, makes it better to set the stat here


const ParkExplorer = props => {
    // areas is the variable, setAreas is the function or "setState" for only that variable
    // use state hook is how you define
    // would have been:
    // const state = {
    //     areas: []
    //     attractions: []
    //  }

    const [areas, setAreas] = useState([])
    const [attractions, setAttractions] = useState([])
    const { isAuthenticated } = useSimpleAuth()

    const getAttractions = (areaId) => {
        if (isAuthenticated()) {
            fetch(`http://localhost:8000/attractions?area=${areaId}`, {
                "method": "GET",
                "headers": {
                    "Authorization": `Token ${localStorage.getItem("kennywood_token")}`
                }
            })
                .then(response => response.json())
                .then(setAttractions)
                // same as:
                // .then((allattractions) => {
                //     setAttractions(allattractions)
                // })

        }
    }

    const getParkAreas = () => {
        if (isAuthenticated()) {
            fetch('http://localhost:8000/parkareas', {
                "method": "GET",
                "headers": {
                    // you can make it return html if you want it to, "text/html"
                    "Accept": "application/json",
                    "Authorization": `Token ${localStorage.getItem("kennywood_token")}`
                    // the above code is how the sever will authenticate a server, anytime you send a request to the server, you will need to provide a token
                }
            })
                .then(response => response.json())
                .then(setAreas)
        }
    }

    //if the empty array was not there, it would not stop looping
    //has to be in this format
    useEffect(getParkAreas, [])


    // useEffect(() => {
    //     if (isAuthenticated()) {
    //         fetch('http://localhost:8000/parkareas', {
    //             "method": "GET",
    //             "headers": {
    //                 "Authorization": `Token ${localStorage.getItem("kennywood_token")}`
    //             }
    //         })
    //             .then(response => response.json())
    //             .then(setAreas)
    //     }
    // }, [])

    return (
        //this is how you send it to another module.
        //AreaList is the module and the others are the variables that are being passed
        <>
            <main className="explorer">
                <AreaList areas={areas} getAttractions={getAttractions} />
                <Attractions attractions={attractions} {...props} />
            </main>
        </>
    )
}

export default ParkExplorer