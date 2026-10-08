import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { parse } from 'postcss';
const Produk = () => {
    const [cart, setCart] = useState([]);
    const products = [
        { id: 1, name: 'Matcha Original', price: 12000, imageName: 'Masta_Matcha_Original.jpeg' },
        { id: 2, name: 'Matcha Vanila', price: 15000, imageName: 'Masta_Matcha_Vanila.jpeg' },
        { id: 3, name: 'Matcha Jamine', price: 15000, imageName: 'Masta_Matcha_Jasmin.jpeg' },
        { id: 4, name: 'Matcha Almond', price: 15000, imageName: 'Masta_Matcha_Almond.jpeg' },
    ];

    const [notification, setNotification] = useState(null);

    const[isCartOpen, setIsCartOpen]= useState(false);

    const triggerNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
    };

    const addToCart = (product) => {
        setCart(prevCart=> {
            const existingProduct = prevCart.find(item => item.id === product.id);
            if(existingProduct){
                return prevCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prevCart, { ...product, quantity: 1 }];
        })
        triggerNotification(`${product.name} ditambahkan ke keranjang!`);
    };
    const updateQuantity = (id,newQuantity)=>{
        const qty = Math.max(1, Math.min(9999, newQuantity));
        setCart(prevCart=>prevCart.map(item=>item.id === id ? { ...item, quantity: qty } : item));
    }

    const handleCheckout = () => {
        const orderList = cart.map(item => item.name).join(',');
        const message = `Hallo Sobat MastaMacha, Saya ingin memesan: ${orderList}`;
        window.open(`https://wa.me/628989732718?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="p-4 md:p-8 bg-black">
            <Head title="Menu Mastamatcha" />
            {notification && (
                <div className="fixed top-5 left-0 right-0 mx-auto w-auto w-[50%] max-w-sm z-50 bg-emerald-600 text-white px-6 py-4 rounded-lg shadow-xl">
                    {notification}
                </div>
            )}
            <h1 className="text-2xl font-bold mb-6 text-emerald-600">Menu Masta Matcha</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="border p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                        <div className="bg-emerald-100 h-40 mb-4 rounded flex items-center justify-center">
                            <img src={`/Image/${product.imageName}`} alt={product.name} className="w-full h-48 object-cover rounded-md"/>
                        </div>
                        <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                        <p className="text-emerald-600 font-bold mb-4">Rp {product.price.toLocaleString()}</p>
                        <div className="flex item-center gap-2 mb-2">
                            <span className="text-sm">Jumlah: </span>
                            <input
                                type="number"
                                min="1"
                                max="999999"
                                defaultValue="1"
                                className="w-16 border rounded px-1"
                                onChange={(e) => {
                                    product.tempQty = parseInt(e.target.value) || 1;
                                }}
                            />
                        </div>
                        <button onClick={() => addToCart({...product, quantity:product.tempQty||1})} className="w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700">
                            Tambah ke Keranjang
                        </button>
                    </div>
                ))}
            </div>
            <div className="mt-8">
                <button onClick={handleCheckout} className="w-full bg-green-600 text-white py-3 rounded font-bold hover:bg-green-700">
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default Produk;
