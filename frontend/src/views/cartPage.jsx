import { useState, useEffect } from 'react';
import NavBar from '../components/navBar';
import Footer from '../components/footer';
import CartItem from '../components/cartItem';
import axios from 'axios';

const userId = localStorage.getItem('userId');

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const getCart = async () => {
            const res = await axios.get(`http://localhost:3000/api/cart/${userId}`);
            setCartItems(res.data);
        }
        getCart();
    }, []);

    const increaseQuantity = async (index) => {
        const item = cartItems[index];
        const updatedItem = { ...item, '1': item['1'] + 1 };

        await axios.put(`http://localhost:3000/api/cart/${userId}`, updatedItem);

        const newCartItems = cartItems.map((item, i) => i === index ? updatedItem : item);

        setCartItems(newCartItems);
    }

    const decreaseQuantity = async (index) => {
        const item = cartItems[index];
        if (item['1'] > 1) {
            const updatedItem = { ...item, '1': item['1'] - 1 };

            await axios.put(`http://localhost:3000/api/cart/${userId}`, updatedItem);

            const newCartItems = cartItems.map((item, i) => i === index ? updatedItem : item);

            setCartItems(newCartItems);
        };
    }

    const deleteItem = async (id) => {
        await axios.delete(`http://localhost:3000/api/cart/${userId}`, { data: { "itemId": id } });

        setCartItems(cartItems.filter(item => item['0'] !== id));
    }

    let total = cartItems.reduce((total, item) => total + item['4'] * item['1'], 0);

    const handleCheckout = async () => {
        const res = await axios.delete(`http://localhost:3000/api/checkout/${userId}`);
        if (res.status === 200) {
            alert('Thanh toán thành công');
            setCartItems([]);
        }
    }

    return (
        <>
            <NavBar />

            <div className="bg-[#282828] min-h-full pt-16 flex flex-col justify-between items-center text-white">
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl font-semibold my-4">Giỏ hàng</h1>
                    <div className="h-full flex flex-col items-center">
                        {
                            cartItems.length === 0 ? 
                            <>
                                <img width={200} src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/9bdd8040b334d31946f49e36beaf32db.png" alt="" /> 
                                <h2 className='text-4xl font-semibold text-[#34c759]'>Giỏ hàng trống</h2>
                            </>
                            : <>
                                <div className="grid grid-cols-8 gap-4 px-8 w-screen mb-4">
                                    <div className="col-span-4 text-xl font-semibold ">Sản phẩm</div>
                                    <div className="col-span-1 text-xl font-semibold ">Số lượng</div>
                                    <div className="col-span-1 text-xl font-semibold ">Đơn giá</div>
                                    <div className="col-span-1 text-xl font-semibold ">Thành tiền</div>
                                    <div className="col-span-1 text-xl font-semibold ">Thao tác</div>
                                </div>

                                <div className="">
                                    {
                                        cartItems.map((item, index) => (
                                            <CartItem 
                                                key={index}
                                                index={index}
                                                id={item[0]} 
                                                img={item[3]}
                                                name={item[2]} 
                                                quantity={item[1]} 
                                                price={item[4]} 
                                                increaseQuantity={() => increaseQuantity(index)} 
                                                decreaseQuantity={() => decreaseQuantity(index)} 
                                                deleteItem={deleteItem}
                                            />
                                        ))
                                    }
                                </div>

                                <div className="flex items-center justify-end p-4 my-2 w-full">
                                    <h2>Tổng cộng: <span>{Number(total).toLocaleString('vi-VN')}Đ</span></h2>
                                    <button onClick={handleCheckout} className="mx-[80px] px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Thanh toán</button>
                                </div>
                            </>
                        }
                    </div>
                </div>
                <Footer />
            </div>

        </>
    );
}

export default CartPage;