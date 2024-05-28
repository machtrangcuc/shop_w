import { useState } from 'react';
import axios from 'axios';

const RedirectSignUp = () => {
    window.location.href = '/signUp';
}


const Home = () => {
    const  [email, setEmail] = useState('')
    const  [password, setPassword] = useState('')
    
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/login', JSON.stringify({
                "email": email,
                "password": password
            }), {headers: {'Content-Type': 'application/json'}});

            localStorage.setItem('isLogin', true)
            localStorage.setItem('userId', response.data.userId)
            localStorage.setItem('isAdmin', response.data.isAdmin)
            
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
        alert('Đăng nhập thành công');
        window.location.href = '/';
    }


    return (
        <>
            <div className="h-full w-full bg-[#F1F1F1] flex items-center justify-around">
                <div className="">
                    <h2 className="text-5xl text-[#2f65a3] mb-6 font-semibold">Friendly Shoppee</h2>
                    <span className="text-lg">Kết nối và mua bán hàng hóa tiện lợi.</span>
                </div>

                <div className="w-1/3 bg-white p-12 rounded-2xl">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" className="border py-2 px-4 rounded-2xl"/>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="border py-2 px-4 mt-2 rounded-2xl"/>
                        </div>
                        <div className="flex flex-col">
                            <input type="submit" value="Đăng nhập" className="cursor-pointer bg-[#2563eb] my-2 py-3 rounded-2xl text-white hover:opacity-60"/>
                        </div>
                    </form>
                    <button onClick={RedirectSignUp} className="bg-[#22c55e] w-full py-3 rounded-2xl hover:opacity-60 text-white">Đăng ký</button>
                </div>

            </div>
        </>
    );
}

export default Home;