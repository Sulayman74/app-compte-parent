import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { getPaiementByUser, getUserIDFromToken } from "../../api";
import { useEffect, useState } from "react";

import { DateTime } from "luxon";

export interface Paiement {
  id: string;
  createdAt: Date;
  userId: string;
  amout: number;
}

const Paiements = () => {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Supposons que vous stockez le token JWT dans localStorage après le login
    const token = localStorage.getItem("token");

    if (token) {
      // Utilisez la fonction de l'utilitaire pour obtenir l'ID de l'utilisateur depuis le token JWT
      const userIdFromToken = getUserIDFromToken(token);

      // Stockez l'ID de l'utilisateur dans l'état
      console.log(userIdFromToken);
      setUserId(userIdFromToken);
    }
  }, []); // Le tableau vide en tant que dépendance signifie que cela s'exécute une seule fois lors du montage

  const [paiement, setPaiement] = useState([]);

  useEffect(() => {
    const fetchPaiement = async () => {
      try {
        const userData = await getPaiementByUser(userId).then((value: any) => {
          console.log(value);
          setPaiement(value);
        });
        fetchPaiement();
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  const formatDate = (timeStamp: number) => {
    const date = DateTime.fromMillis(timeStamp);
    return date.toFormat("dd/MM/yyyy");
  };

  const formatCurrency = (amount: number) => {
    const formattedAmount = new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR", // Remplacez par le code de devise de votre choix
    }).format(amount);

    return formattedAmount;
  };

  return (
    <div className="container h-screen flex justify-center items-center">
      <Table>
        <TableCaption>Vos dons</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Date d'ajout</TableHead>
            <TableHead className="text-right">Montant</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.id}</TableCell>
              <TableCell>{formatDate(invoice.createdAt)}</TableCell>
              <TableCell className="text-right">
                {formatCurrency(invoice.montant)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$10 000</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <div>
        <h2>Hello world</h2>
        <p>{paiement}</p>
        <p>{userId}</p>
      </div>
    </div>
  );
};

export default Paiements;

const invoices = [
  {
    id: "INV001",
    userId: "Paid",
    montant: 250.0,
    createdAt: 1659218400000,
  },
  {
    id: "INV002",
    userId: "Pending",
    montant: 150.0,
    createdAt: 1659132000000,
  },
  {
    id: "INV003",
    userId: "Unpaid",
    montant: 350.0,
    createdAt: 1659045600000,
  },
  {
    id: "INV004",
    userId: "Paid",
    montant: 450.0,
    createdAt: 1658959200000,
  },
  {
    id: "INV005",
    userId: "Paid",
    montant: 550.0,
    createdAt: 1658872800000,
  },
  {
    id: "INV006",
    userId: "Pending",
    montant: 200.0,
    createdAt: 1658786400000,
  },
  {
    id: "INV007",
    userId: "Unpaid",
    montant: 300.0,
    createdAt: 1658700000000,
  },
];
