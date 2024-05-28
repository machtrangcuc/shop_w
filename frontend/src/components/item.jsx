import axios from 'axios';
import React from 'react';

const Item = ( {img, name, price, id} ) => {
    const addToCart = async () => {
        try {
            const userId = localStorage.getItem('userId');
            await axios.post('http://localhost:3000/api/cart/add', JSON.stringify({ 
                "userId": userId, 
                "itemId": id,
                "quantity": 1,
                "price": price,
            }), { headers: { 'Content-Type': 'application/json'}});

            alert('Thêm vào giỏ hàng thành công');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="flex flex-col items-center w-48 border border-gray-300 rounded p-2 m-2">
                <img className="w-24 mb-2" src={img} alt="laptop" />
                <span className="font-bold mx-1 overflow-hidden overflow-ellipsis w-full whitespace-nowrap">{name}</span>
                <div className="text-center">
                    <span className="block mb-2">Giá: {Number(price).toLocaleString('vi-VN')}đ</span>
                    <button onClick={addToCart} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Thêm vào giỏ hàng</button>
                </div>
            </div>
        </>
    )
};

export default Item;