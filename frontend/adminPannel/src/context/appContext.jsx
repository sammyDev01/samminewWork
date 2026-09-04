import { createContext } from "react";

export const AppContext = createContext()
const AppProviderContext = (props)=>{

    const calculateAge = (dob) =>{
        const today = new Date()
        const birthDate = new Date(dob)

        const age = today.getFullYear() - birthDate.getFullYear()
        return age
    }

    const months = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
    const slotDateFormat = (slotDate) =>{
    const dataArray = slotDate.split('_')
    return dataArray[0]+ "  " + months[Number(dataArray[1])] + " " + dataArray[2]

   }
    const values = {
       calculateAge,
       slotDateFormat

    }
    return (
        <AppContext.Provider value={values}>
            {props.children}
        </AppContext.Provider>
    )
}



export default AppProviderContext