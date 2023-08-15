import { useEffect, useState } from "react"
import {DataTable} from "../../Components/DataTable/Data-table"
import { api } from "../../api"
import { Category } from "../../interfaces"
import {  columns } from "../CategoryAdmin/columns"
  
const DashboardCategories = () => {

    const [categories, setCategories] = useState<Category[] | null >(null) 

    useEffect(() => {
        const fetchCategores = async () => {
            try{
                const response = await api.get("/getCategories")
                setCategories(response.data)
 
            } catch(err){
                console.log(err)
            }
        }
        fetchCategores()  
    }, [])

  return (
    <>
    <DataTable columns={columns} data={categories ?? []} searchKey={"name"}   />
    </>
  )
}

export default DashboardCategories
