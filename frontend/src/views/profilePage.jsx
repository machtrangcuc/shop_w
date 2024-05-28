import React, { useEffect, useState } from 'react'
import Footer from "../components/footer.jsx";
import Navbar from "../components/navBar.jsx";
import axios from 'axios';
import ModalComponent from '../components/modal.jsx';

const userId = localStorage.getItem('userId');
const isAdmin = localStorage.getItem('isAdmin');

const ProfilePage = () => {
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [items, setItems] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const updateItems = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/items`);
            setItems(response.data);
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/customers/${userId}`);
                const userResponse = response.data;
                const userObject = {
                    email: userResponse[0][1],
                    name: userResponse[0][3],
                    password : userResponse[0][2]
                }
                setUser(userObject);
            } catch (error) {
                console.error(error);
            }
        }
        const fetchAllUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/customers`);
                setUsers(response.data);
            }
            catch (error) {
                console.error(error);
            }
        }
        const fetchAllItem = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/items`);
                setItems(response.data);
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchData();
        fetchAllUser();
        fetchAllItem();
    }, []);

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/customers/${id}`);
            setUsers(users.filter(user => user[0] !== id));
        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteItem = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/items/${id}`);
            setItems(items.filter(item => item[0] !== id));
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <ModalComponent updateItems={updateItems} isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />
            <Navbar />

            <div className="pt-16 bg-[#282828] flex flex-col justify-between min-h-full">
                <div className="">
                    <div className="m-4">
                        <div className="bg-white p-4 rounded-2xl">
                            <h1 className="text-3xl font-semibold">Profile</h1>
                            <div className="mt-4">
                                <span className="text-lg">Họ và tên: {user.name}</span>
                            </div>
                            <div className="mt-4">
                                <span className="text-lg">Email: {user.email}</span>
                            </div>
                        </div>

                        {
                            isAdmin === 'true' ? 
                            <div className="mt-4">
                                <div className="bg-white p-4 rounded-2xl">
                                    <h1 className="text-3xl font-semibold">Admin</h1>
                                    <div className="mt-4">
                                        <div className="">
                                            <h1 className='text-lg font-bold'>User management</h1>
                                            <div className="grid grid-cols-10 gap-4 px-8 w-screen mb-4">
                                                <div className="col-span-1 text-xl font-semibold ">ID</div>
                                                <div className="col-span-3 text-xl font-semibold ">Email</div>
                                                <div className="col-span-2 text-xl font-semibold ">Password</div>
                                                <div className="col-span-2 text-xl font-semibold ">Name</div>
                                                <div className="col-span-1 text-xl font-semibold ">Type</div>
                                                <div className="col-span-1 text-xl font-semibold ">Action</div>
                                            </div>
                                            <div className="">
                                                {
                                                    users.map((user, index) => (
                                                        <div key={index} className="grid grid-cols-10 gap-4 px-8 w-screen mb-4">
                                                            <div className="col-span-1">{user[0]}</div>
                                                            <div className="col-span-3">{user[1]}</div>
                                                            <div className="col-span-2">{user[2]}</div>
                                                            <div className="col-span-2">{user[3]}</div>
                                                            <div className="col-span-1">{user[4]}</div>
                                                            <div className="col-span-1">
                                                                <button onClick={() => handleDeleteUser(user[0])} className="rounded-lg px-2 bg-red-500 w-fit hover:opacity-70">Delete</button>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>

                                        <div className="">
                                            <div className="flex justify-between">
                                                <h1 className='text-lg font-bold'>Product management</h1>
                                                <button onClick={() => setModalIsOpen(true)} className='p-2 bg-[#6DC5D1] rounded-lg hover:opacity-60'>Add product</button>
                                            </div>
                                            <div className="grid grid-cols-10 gap-4 px-8 w-screen mb-4">
                                                <div className="col-span-1 text-xl font-semibold ">ID</div>
                                                <div className="col-span-2 text-xl font-semibold ">Name</div>
                                                <div className="col-span-4 text-xl font-semibold ">Image Link</div>
                                                <div className="col-span-1 text-xl font-semibold ">Price</div>
                                                <div className="col-span-1 text-xl font-semibold ">IsPopular</div>
                                                <div className="col-span-1 text-xl font-semibold ">Action</div>
                                            </div>
                                            <div className="">
                                                {
                                                    items.map((item, index) => (
                                                        <div key={index} className="grid grid-cols-10 gap-4 px-8 w-screen mb-4">
                                                            <div className="col-span-1">{item[0]}</div>
                                                            <div className="col-span-2">{item[1]}</div>
                                                            <div style={{wordWrap: 'break-word'}} className="col-span-4">{item[2]}</div>
                                                            <div className="col-span-1">{item[3]}</div>
                                                            <div className="col-span-1">{item[4]}</div>
                                                            <div className="col-span-1">
                                                                <button onClick={() => handleDeleteItem(item[0])} className="rounded-lg px-2 bg-red-500 w-fit hover:opacity-70">Delete</button>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> : null
                        }
                    </div>
                </div>

                <Footer />             
            </div>
            
        </>
    )
}

export default ProfilePage