"use client";

import React, { useState, useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { setProducts,updateProduct,removeProduct } from "@/src/redux/slices/productSlice";
 
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const categoriesList = ["RO Purifier", "Water Supply"];

export default function ProductHistory() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteId, setDeleteId] = useState(null);
    const [editProduct, setEditProduct] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Fetch all products from backend on mount
    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch('/api/products');
                const data = await res.json();
                if (data.success && Array.isArray(data.products)) {
                    dispatch(setProducts(data.products));
                }
            } catch (err) {
                 console.log(err);
            }
        }
        fetchProducts();
    }, [dispatch]);

    const filteredProducts = products.filter(
        (p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (p.category && p.category.name && p.category.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleDelete = async () => {
        if (deleteId) {
            try {
                const res = await fetch('/api/admin/deleteproduct', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: deleteId })
                });
                const data = await res.json();
                if (res.ok && data.success) {
                    dispatch(removeProduct(deleteId));
                }
            } catch (err) {
                // Optionally handle error
            }
            setDeleteId(null);
        }
    };

    const handleUpdateProduct = async () => {
        if (!editProduct?.id) return;
        try {
            const res = await fetch('/api/admin/editproduct', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editProduct)
            });
            const data = await res.json();
            if (res.ok && data.success) {
                dispatch(updateProduct(data.product));
            }
        } catch (err) {
            // Optionally handle error
        }
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
                                                        src={product?.images[0]}
                                                        alt={product?.name}
                                                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md border border-gray-200 dark:border-gray-700 mx-auto"
                                                    />
                                                </TableCell>
                                                <TableCell className="border-b border-gray-100 dark:border-gray-800">{product?.name}</TableCell>
                                                <TableCell className="border-b border-gray-100 dark:border-gray-800">{product?.category?.name || ""}</TableCell>
                                                <TableCell className="border-b border-gray-100 dark:border-gray-800">₹{product?.price}</TableCell>
                                                <TableCell className="border-b border-gray-100 dark:border-gray-800">{product?.quantity}</TableCell>
                                                <TableCell className="border-b border-gray-100 dark:border-gray-800">{new Date(product?.updatedAt).toLocaleDateString('en-GB')}</TableCell>
                                                <TableCell className="border-b border-gray-100 dark:border-gray-800 text-center">
                                                    <div className="flex justify-center gap-2">
                                                        {/* edit conformation dialog */}
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => {
                                                                setEditProduct(product);
                                                                setIsDialogOpen(true);
                                                            }}
                                                            className="flex items-center gap-1 border border-blue-400 text-blue-600 bg-white cursor-pointer"
                                                        >
                                                            <Pencil className="w-4 h-4" /> Edit
                                                        </Button>
                                                        {/* delete confirmation dialog */}
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    onClick={() => setDeleteId(product.id)}
                                                                    className="flex items-center gap-1 border border-red-400 text-red-600  bg-red-100 cursor-pointer   "
                                                                >
                                                                    <Trash2 className="w-4 h-4" /> Delete
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent className="bg-white border border-gray-200  ">
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
            {/* edit modal - custom, not Dialog */}
            {isDialogOpen && (
              <Modal isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} title="Edit Product">
                <div className="space-y-4">
                  <div>
                    <Label className="mb-1 block text-gray-800">Product Name</Label>
                    <Input
                      value={editProduct?.name || ""}
                      className="text-gray-800"

                      onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                    />
                  </div>
                  <div >
                    <Label className="mb-1 block text-gray-800">Category</Label>
                    <Select
                      value={editProduct?.category}
                      className="text-gray-800"

                      onValueChange={(value) => setEditProduct({ ...editProduct, category: value })}
                    >
                      <SelectTrigger className="w-[100%]  ">
                        <SelectValue className=" text-black" placeholder="Select category"  />
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
                    <Label className="mb-1 block text-gray-800">Price (₹)</Label>
                    <Input
                      type="number"
                      value={editProduct?.price || ""}
                      className="text-gray-800"

                      onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label className="mb-1 block text-gray-800">Items</Label>
                    <Input
                      type="number"
                      value={editProduct?.quantity || ""}
                      className="text-gray-800"
                      onChange={(e) => setEditProduct({ ...editProduct, quantity: e.target.value })}
                    />
                  </div>
                  <div className="flex justify-end space-x-3 pt-4">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleUpdateProduct} className="bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Save
                    </Button>
                  </div>
                </div>
              </Modal>
            )}
        </div>
    );
}
