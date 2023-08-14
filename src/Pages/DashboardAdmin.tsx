import { useEffect, useState } from "react"
import {DataTable} from "../Components/DataTable/Data-table"
import { api } from "../api"
import { Product } from "../interfaces"
import {  columns } from "../Components/DataTable/columns"
  
const DashboardAdmin = () => {

    const [products, setProducts] = useState<Product[] | null >(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try{
                const response = await api.get("/getProducts")
                setProducts(response.data)
 
            } catch(err){
                console.log(err)
            }
        }
        fetchProducts()  
    }, [])

  return (
    <>
    <DataTable columns={columns} data={products ?? []} searchKey={"name"}   />
    </>
  )
}

export default DashboardAdmin
