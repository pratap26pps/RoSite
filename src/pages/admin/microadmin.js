"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function MicroAdminManagement() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/admin/getusers?role=microadmin");
        const data = await res.json();
        if (res.ok && data.users) {
          setCustomers(
            data.users
              .filter((u) => u.role === "microadmin")
              .map((u) => ({
                id: u._id,
                name: `${u.firstName} ${u.lastName}`,
                email: u.email,
                mobile: u.mobile,
                role: u.role,
              }))
          );
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchValue);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/admin/deleteuser?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCustomers((prev) => prev.filter((c) => c.id !== id));
      } else {
        console.error("Failed to delete user");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-950 py-10 px-2 sm:px-6 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <h2 className="text-3xl font-extrabold text-blue-700 dark:text-cyan-300 mb-8 text-center tracking-tight">
        Microadmin Management
      </h2>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-3 items-center justify-center mb-6"
      >
        <Input
          type="text"
          placeholder="Search by user name..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full max-w-xs border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        />
        <Button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-cyan-700 dark:to-blue-800 text-white font-semibold shadow hover:from-blue-600 hover:to-cyan-600"
        >
          Search
        </Button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto max-w-7xl mx-auto border border-blue-100 dark:border-gray-800 rounded-2xl shadow-lg bg-white dark:bg-gray-900">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-50 dark:bg-gray-800 text-black dark:text-cyan-200">
              <TableHead className="text-blue-900 dark:text-cyan-200">Name</TableHead>
              <TableHead className="text-blue-900 dark:text-cyan-200">Email</TableHead>
              <TableHead className="text-blue-900 dark:text-cyan-200">Mobile</TableHead>
              <TableHead className="text-blue-900 dark:text-cyan-200">Role</TableHead>
              <TableHead className="text-blue-900 dark:text-cyan-200 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id} className="hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors">
                <TableCell className="font-semibold">{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.mobile}</TableCell>
                <TableCell>
                  <Select
                    value={customer.role}
                    disabled
                  >
                    <SelectTrigger className="w-32 border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="microadmin">Microadmin</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-center space-x-2">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(customer.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
