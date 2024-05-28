import { useState } from 'react';
import axios from 'axios';

const CartItem = ({ index, id, img, name, quantity, price, increaseQuantity, decreaseQuantity, deleteItem }) => {
    
    
    return (
        <>
            <div key={index} className="my-2 grid grid-cols-8 gap-4 px-8 w-screen">
                <div className="col-span-4 flex items-center">
                    <img className='mr-4' width={60} src={img} alt="" />
                    {name}
                </div>
                <div className="col-span-1 flex items-center">
                    <button onClick={decreaseQuantity}>-</button>
                    <span className='mx-4'>{quantity}</span>
                    <button onClick={increaseQuantity}>+</button>
                </div>
                <div className="col-span-1 flex items-center">{Number(price).toLocaleString('vi-VN')}</div>
                <div className="col-span-1 flex items-center">{Number(price * quantity).toLocaleString('vi-VN')}</div>
                <button onClick={() => deleteItem(id)} className='border-2 bg-red-500 px-6 w-fit hover:opacity-70'>Xóa</button>
            </div>
        </>
    )
}

export default CartItem;