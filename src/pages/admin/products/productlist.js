"use client";

import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
    AlertDialogTitle,
    AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const categoriesList = ["RO Purifier", "Water Supply"];

// const initialData = useSelector((state) => state.product.products);
// Sample RO/Water Purifier product data
const initialData = [
    {
        id: "1",
        name: "AquaSure Delight",
        category: "RO Purifier",
        price: "8499",
        items: 10,
        dateAdded: "2025-07-01",
        image: "/images/image copy 2.png",
    },
    {
        id: "2",
        name: "AquaSure Delight",
        category: "RO Purifier",
        price: "8499",
        items: 10,
        dateAdded: "2025-07-01",
        image: "/images/image copy 2.png",
    },
    {
        id: "3",
        name: "AquaSure Delight",
        category: "RO Purifier",
        price: "8499",
        items: 10,
        dateAdded: "2025-07-01",
        image: "/images/image copy 2.png",
    },
    {
        id: "4",
        name: "Kent Grand Plus",
        category: "RO Purifier",
        price: "14500",
        items: 5,
        dateAdded: "2025-07-03",
        image: "/images/image copy 3.png",
    },
    {
        id: "3",
        name: "Livpure Glo",
        category: "RO Purifier",
        price: "9999",
        items: 7,
        dateAdded: "2025-07-04",
        image: "/images/image copy 4.png",
    },
    {
        id: "4",
        name: "Aqua Fresh Swift",
        category: "Water Supply",
        price: "5999",
        items: 12,
        dateAdded: "2025-07-05",
        image: "/images/image copy 6.png",
    },
];


export default function ProductHistory() {

    const [products, setProducts] = useState(initialData);
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteId, setDeleteId] = useState(null);
    const [editProduct, setEditProduct] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);


    const filteredProducts = products.filter(
        (p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = () => {
        if (deleteId) {
            setProducts(products.filter((p) => p.id !== deleteId));
            setDeleteId(null);
        }
    };

    const handleUpdateProduct = () => {
        if (!editProduct?.id) return;
        setProducts((prev) =>
            prev.map((p) => (p.id === editProduct.id ? editProduct : p))
        );
        setIsDialogOpen(false);
    };


    return (
        <div className="w-full px-1 sm:px-4   min-h-screen transition-colors duration-300">
            <div className="w-full max-w-7xl mx-auto bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-lg rounded-xl p-2 sm:p-6 md:p-10 border border-gray-200 dark:border-gray-800">
                {/* Search */}
                <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-center items-center gap-2">
                    <Input
                        type="text"
                        placeholder="Search by product or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-md h-10 border border-gray-300 dark:border-gray-700 w-full focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
                    />
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                    <div className="min-w-full">
                        <div className="lg:h-[500px] overflow-y-auto">
                            <Table>
                                <TableHeader className="sticky top-0 bg-white dark:bg-gray-900 z-10">
                                    <TableRow>
                                        <TableHead className="min-w-[80px] text-gray-900 dark:text-cyan-200 border-b border-gray-200 dark:border-gray-700">Image</TableHead>
                                        <TableHead className="min-w-[150px] text-gray-900 dark:text-cyan-200 border-b border-gray-200 dark:border-gray-700">Product</TableHead>
                                        <TableHead className="min-w-[140px] text-gray-900 dark:text-cyan-200 border-b border-gray-200 dark:border-gray-700">Category</TableHead>
                                        <TableHead className="min-w-[100px] text-gray-900 dark:text-cyan-200 border-b border-gray-200 dark:border-gray-700">Price (₹)</TableHead>
                                        <TableHead className="min-w-[80px] text-gray-900 dark:text-cyan-200 border-b border-gray-200 dark:border-gray-700">Items</TableHead>
                                        <TableHead className="min-w-[130px] text-gray-900 dark:text-cyan-200 border-b border-gray-200 dark:border-gray-700">Date Added</TableHead>
                                        <TableHead className="text-center text-gray-900 dark:text-cyan-200 min-w-[180px] border-b border-gray-200 dark:border-gray-700">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredProducts.length > 0 ? (
                                        filteredProducts.map((product) => (
                                            <TableRow key={product.id} className="hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors">
                                                <TableCell className="border-b border-gray-100 dark:border-gray-800">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md border border-gray-200 dark:border-gray-700 mx-auto"
                                                    />
                                                </TableCell>
                                                <TableCell className="border-b border-gray-100 dark:border-gray-800">{product.name}</TableCell>
                                                <TableCell className="border-b border-gray-100 dark:border-gray-800">{product.category}</TableCell>
                                                <TableCell className="border-b border-gray-100 dark:border-gray-800">₹{product.price}</TableCell>
                                                <TableCell className="border-b border-gray-100 dark:border-gray-800">{product.items}</TableCell>
                                                <TableCell className="border-b border-gray-100 dark:border-gray-800">{product.dateAdded}</TableCell>
                                                <TableCell className="border-b border-gray-100 dark:border-gray-800 text-center">
                                                    <div className="flex justify-center gap-2">
                                                        {/* edit conformation dialog */}
                                                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                                            <DialogTrigger asChild>
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    onClick={() => {
                                                                        setEditProduct(product);
                                                                        setIsDialogOpen(true);
                                                                    }}
                                                                    className="flex items-center gap-1 border border-blue-400 text-blue-600 dark:border-cyan-400 dark:text-cyan-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:border-blue-500 dark:hover:border-cyan-500 transition-colors"
                                                                >
                                                                    <Pencil className="w-4 h-4" /> Edit
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl">
                                                                <DialogHeader>
                                                                    <DialogTitle className="text-gray-900 dark:text-cyan-200">Edit Product</DialogTitle>
                                                                </DialogHeader>
                                                                <div className="space-y-4">
                                                                    <div>
                                                                        <Label className="mb-1 block text-gray-800 dark:text-cyan-200">Product Name</Label>
                                                                        <Input
                                                                            value={editProduct?.name || ""}
                                                                            onChange={(e) =>
                                                                                setEditProduct({ ...editProduct, name: e.target.value })
                                                                            }
                                                                            className="dark:bg-gray-900 dark:text-white dark:border-gray-700"
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <Label className="mb-1 block text-gray-800 dark:text-cyan-200">Category</Label>
                                                                        <Select
                                                                            value={editProduct?.category}
                                                                            onValueChange={(value) =>
                                                                                setEditProduct({ ...editProduct, category: value })
                                                                            }
                                                                        >
                                                                            <SelectTrigger className="dark:bg-gray-900 dark:text-white dark:border-gray-700">
                                                                                <SelectValue placeholder="Select category" />
                                                                            </SelectTrigger>
                                                                            <SelectContent className="dark:bg-gray-900 dark:text-white dark:border-gray-700">
                                                                                {categoriesList.map((cat) => (
                                                                                    <SelectItem key={cat} value={cat}>
                                                                                        {cat}
                                                                                    </SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </div>
                                                                    <div>
                                                                        <Label className="mb-1 block text-gray-800 dark:text-cyan-200">Price (₹)</Label>
                                                                        <Input
                                                                            type="number"
                                                                            value={editProduct?.price || ""}
                                                                            onChange={(e) =>
                                                                                setEditProduct({ ...editProduct, price: e.target.value })
                                                                            }
                                                                            className="dark:bg-gray-900 dark:text-white dark:border-gray-700"
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <Label className="mb-1 block text-gray-800 dark:text-cyan-200">Items</Label>
                                                                        <Input
                                                                            type="number"
                                                                            value={editProduct?.items || ""}
                                                                            onChange={(e) =>
                                                                                setEditProduct({ ...editProduct, items: e.target.value })
                                                                            }
                                                                            className="dark:bg-gray-900 dark:text-white dark:border-gray-700"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="flex justify-end gap-2 mt-4">
                                                                    <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="dark:bg-gray-800 dark:text-cyan-200 dark:border-gray-700">Cancel</Button>
                                                                    <Button onClick={handleUpdateProduct} className="bg-blue-600 dark:bg-cyan-700 text-white hover:bg-blue-700 dark:hover:bg-cyan-800">Save</Button>
                                                                </div>
                                                            </DialogContent>
                                                        </Dialog>
                                                        {/* delete confirmation dialog */}
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    onClick={() => setDeleteId(product.id)}
                                                                    className="flex items-center gap-1 border border-red-400 text-red-600 dark:border-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-800 hover:border-red-500 dark:hover:border-red-400 transition-colors"
                                                                >
                                                                    <Trash2 className="w-4 h-4" /> Delete
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle className="text-gray-900 dark:text-cyan-200">Delete Product</AlertDialogTitle>
                                                                    <AlertDialogDescription className="text-gray-600 dark:text-gray-300">
                                                                        Are you sure you want to delete <b>{product.name}</b>? This action cannot be undone.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel className="dark:bg-gray-800 dark:text-cyan-200 dark:border-gray-700">Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction onClick={handleDelete} className="bg-red-600 dark:bg-red-700 text-white hover:bg-red-700 dark:hover:bg-red-800">Delete</AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center py-8 text-gray-400 dark:text-gray-500">
                                                No products found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
