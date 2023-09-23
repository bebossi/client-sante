import { useContext, useEffect, useState } from "react";
import { UserContext } from "../auth/currentUser";
import DashboardNavigation from "../Components/DashboardNavigation";
import { api } from "../api";
import Heading from "../Components/Heading";
import { Separator } from "../Components/ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../Components/ui/card";
import { CreditCard, DollarSign, Package } from "lucide-react";
import { Overview } from "../Components/Overview";

const DashBoard = () => {
  const { user } = useContext(UserContext);

  const [totalRevenue, setTotalRevenue] = useState();
  const [salesCount, setSalesCount] = useState();
  const [graphRevenue, setGraphRevenue] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [totalRevenueResponse, graphRevenueResponse] = await Promise.all([
          api.get("/totalRevenue"),
          api.get("/graphRevenue"),
        ]);

        setTotalRevenue(totalRevenueResponse.data.totalRevenue);
        setSalesCount(totalRevenueResponse.data.salesCount);
        setGraphRevenue(graphRevenueResponse.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  if ((user && user.role !== "admin") || !user) {
    return <div>Você não tem acesso a essa página</div>;
  }

  return (
    <div className="flex-col">
      <DashboardNavigation />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" subtitle="Overview of your store" />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Arrecadado
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRevenue}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vendas</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{salesCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Produtos em Estoque
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Visão Geral</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphRevenue!} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashBoard;
