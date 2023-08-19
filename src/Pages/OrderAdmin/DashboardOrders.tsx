import { useEffect, useState } from "react"
import { api } from "../../api"
import { DataTable } from "../../Components/DataTable/Data-table"
import { columns } from "./columns"
import { Order } from "../../interfaces"

const DashboardOrders = () => {

    const [orders, setOrders] = useState<Order[] | null>(null)

    useEffect(() => {
        const fetchOrders = async () => {
            try{
                const response = await api.get("/getOrders")
                setOrders(response.data)

            } catch(err){
                console.log(err)
            }
        }
        fetchOrders()
     },[])
     console.log(orders)


  return (
    <>
      <DataTable data={orders ?? []} columns={columns} searchKey="id" />
    </>
  )
}

export default DashboardOrders
