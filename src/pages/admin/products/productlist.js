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
        <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 px-4 py-20 flex items-center justify-center">
            <div className="w-full max-w-7xl bg-blue-100 text-gray-700 shadow-xl rounded-xl p-6 sm:p-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-6 text-center">
                    Product History
                </h2>

                {/* Search */}
                <div className="mb-6 flex justify-center">
                    <Input
                        type="text"
                        placeholder="Search by product or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-md h-12 border-2 border-gray-800  w-full"
                    />
                </div>

                {/* Table */}
                <div className="overflow-auto border border-black rounded-md">
                    <div className="min-w-full">
                        <div className="lg:h-[500px] overflow-y-auto">



                            <Table>
                                <TableHeader className="sticky top-0 bg-white z-10">
                                    <TableRow className=" ">
                                        <TableHead className="min-w-[80px] text-black border">Image</TableHead>
                                        <TableHead className="min-w-[150px] text-black border">Product</TableHead>
                                        <TableHead className="min-w-[140px] text-black border">Category</TableHead>
                                        <TableHead className="min-w-[100px] text-black border">Price (₹)</TableHead>
                                        <TableHead className="min-w-[80px] text-black border">Items</TableHead>
                                        <TableHead className="min-w-[130px] text-black border">Date Added</TableHead>
                                        <TableHead className="text-center text-black min-w-[180px] border">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredProducts.length > 0 ? (
                                        filteredProducts.map((product) => (
                                            <TableRow key={product.id}>
                                                <TableCell className="border">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-24 h-24 object-cover rounded-md border"
                                                    />
                                                </TableCell>
                                                <TableCell className="border">{product.name}</TableCell>
                                                <TableCell className="border">{product.category}</TableCell>
                                                <TableCell className="border">₹{product.price}</TableCell>
                                                <TableCell className="border">{product.items}</TableCell>
                                                <TableCell className="border">{product.dateAdded}</TableCell>
                                                <TableCell className="border text-center">
                                                    <div className="flex justify-center text-white gap-2">


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
                                                                    className="flex items-center cursor-pointer gap-1"
                                                                >
                                                                    <Pencil className="w-4 h-4" /> Edit
                                                                </Button>
                                                            </DialogTrigger>

                                                            <DialogContent className="sm:max-w-md backdrop-blur-md border border-gray-300 shadow-xl">
                                                                <DialogHeader>
                                                                    <DialogTitle>Edit Product</DialogTitle>
                                                                </DialogHeader>

                                                                <div className="space-y-4">
                                                                    <div>
                                                                        <Label className="mb-1 block">Product Name</Label>
                                                                        <Input
                                                                            value={editProduct?.name || ""}
                                                                            onChange={(e) =>
                                                                                setEditProduct({ ...editProduct, name: e.target.value })
                                                                            }
                                                                        />
                                                                    </div>

                                                                    <div>
                                                                        <Label className="mb-1 block">Category</Label>
                                                                        <Select
                                                                            value={editProduct?.category}
                                                                            onValueChange={(value) =>
                                                                                setEditProduct({ ...editProduct, category: value })
                                                                            }
                                                                        >
                                                                            <SelectTrigger>
                                                                                <SelectValue placeholder="Select category" />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                {categoriesList.map((cat) => (
                                                                                    <SelectItem key={cat} value={cat}>
                                                                                        {cat}
                                                                                    </SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </div>

                                                                    <div>
                                                                        <Label className="mb-1 block">Price (₹)</Label>
                                                                        <Input
                                                                            type="number"
                                                                            value={editProduct?.price || ""}
                                                                            onChange={(e) =>
                                                                                setEditProduct({ ...editProduct, price: e.target.value })
                                                                            }
                                                                        />
                                                                    </div>

                                                                    <div>
                                                                        <Label className="mb-1 block">Items</Label>
                                                                        <Input
                                                                            type="number"
                                                                            value={editProduct?.items || ""}
                                                                            onChange={(e) =>
                                                                                setEditProduct({ ...editProduct, items: e.target.value })
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="pt-4 flex justify-end gap-2">
                                                                    <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
                                                                        Cancel
                                                                    </Button>
                                                                    <Button onClick={handleUpdateProduct}>Save Changes</Button>
                                                                </div>
                                                            </DialogContent>

                                                        </Dialog>

                                                        {/* Delete Confirmation Dialog */}
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button
                                                                    size="sm"
                                                                    variant="destructive"
                                                                    onClick={() => setDeleteId(product.id)}
                                                                    className="flex items-center cursor-pointer gap-1"
                                                                >
                                                                    <Trash2 className="w-4 h-4" /> Delete
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        This will permanently delete <b>{product.name}</b>.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction onClick={handleDelete}>
                                                                        Yes, Delete
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                                                No matching products found.
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
