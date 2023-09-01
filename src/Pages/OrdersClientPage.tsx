import { useEffect, useState } from "react"
import { Order } from "../interfaces"
import { toast } from "react-hot-toast"
import { api } from "../api"
import { DataTable } from "../Components/DataTable/Data-table"
import { columns } from "./OrderAdmin/columns"

const OrdersClientPage = () => {

    const [orders, setOrders] = useState<Order[] | null>()

    useEffect(() => {
        const fetchOrders = async () => {
            try{
                const response = await api.get("/ordersByClient")
                setOrders(response.data)

            } catch(err){
                console.log(err)
                toast.error("Algo deu errado")
            }
        }
        fetchOrders()
    })

    return (
    <div>
    <DataTable columns={columns} data={orders ?? []}  searchKey="createdAt"/>
    </div>
  )
}

export default OrdersClientPage
