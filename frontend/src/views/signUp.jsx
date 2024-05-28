import axios from 'axios';
import React, {useState} from 'react';

const RedirectLogin = () => {
    window.location.href = '/login';
}

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        
        if(password !== confirmPassword) {
            alert('Password không trùng khớp');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:3000/api/signup', JSON.stringify({
                "name": name,
                "email": email,
                "password": password
            }), {headers: {'Content-Type': 'application/json'}});

            if (response.status == 200) {
                alert('Đăng ký thành công');
                window.location.href = '/login';
            }

            console.log(response.data);
        } catch (error) {
            alert('Tài khoản đã tồn tại');
        }
    }
    return (
        <>
            <div className="h-full w-full flex flex-col items-center justify-center bg-[#F1F1F1]">
                <h1 className="text-4xl font-semibold text-[#2f65a3] mb-6">Friendly Shoppee</h1>
                <div className="bg-white w-1/3 py-6 px-8 rounded-2xl">
                    <div className="flex flex-col items-center mb-4">
                        <h1 className="text-2xl font-semibold ">Tạo tài khoản mới</h1>
                        <h2 className="text-sm">Nhanh chóng và dễ dàng</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <label className="mb-1">Họ và tên: </label>
                            <input type="text" placeholder="Họ và tên" className="border py-2 px-4 rounded-2xl" value={name} onChange={e => setName(e.target.value)}/>

                            <label className="mt-2 mb-1">Email: </label>
                            <input type="text" placeholder="Email" className="border py-2 px-4 rounded-2xl" value={email} onChange={e => setEmail(e.target.value)}/>

                            <label className="mt-2 mb-1">Password: </label>
                            <input type="password" placeholder="Password" className="border py-2 px-4 rounded-2xl" value={password} onChange={e => setPassword(e.target.value)}/>

                            <label className="mt-2 mb-1">Nhập lại password: </label>
                            <input type="password" placeholder="Nhập lại password" className="border py-2 px-4 rounded-2xl" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                        </div>
                        <input type="submit" value="Đăng ký" className="cursor-pointer w-full bg-[#22c55e] mt-2 py-3 rounded-2xl text-white hover:opacity-60"/>
                    </form>
                    <button onClick={RedirectLogin} className="cursor-pointer w-full bg-[#2563eb] mt-2 py-3 rounded-2xl text-white hover:opacity-60">Đăng nhập</button>
                </div>
            </div>
        </>
    );
}

export default SignUp;