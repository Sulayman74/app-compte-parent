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
import { useEffect, useState } from "react";

import { DateTime } from "luxon";
import { getUsers } from "../../api";

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  description?: string;
  email: string;
  createdAt: Date;
  updatedAt?: Date;
  role: string[];
  password: string;
}

export const Bilan = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
        console.log("usersData", usersData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const formatDate = (timeStamp: any) => {
    const date = DateTime.fromISO(timeStamp);
    return date.toFormat("dd/MM/yyyy");
  };

  return (
    <div className="container h-screen flex justify-center items-center">
      <Table className="h-full">
        <TableCaption>
          <p>Liste des utilisateurs</p>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Commentaires</TableHead>
            <TableHead>Date d'ajout</TableHead>
            <TableHead>Id donateur</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: User) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user?.description}</TableCell>
              <TableCell>{formatDate(user.createdAt)}</TableCell>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default Bilan;
