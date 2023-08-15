import { useEffect, useState } from "react"
import {DataTable} from "../../Components/DataTable/Data-table"
import { api } from "../../api"
import {  Topping } from "../../interfaces"
import {  columns } from "./columns"
  
const DashboardToppings = () => {

    const [toppings, setToppings] = useState<Topping[] | null >(null) 

    useEffect(() => {
        const fetchToppings = async () => {
            try{
                const response = await api.get("/getToppings")
                setToppings(response.data)
 
            } catch(err){
                console.log(err)
            }
        }
        fetchToppings()  
    }, [])

  return (
    <>
    <DataTable columns={columns} data={toppings ?? []} searchKey={"name"}   />
    </>
  )
}

export default DashboardToppings
