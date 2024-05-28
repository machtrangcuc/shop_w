import Modal from 'react-modal';
import { useState } from 'react';
import axios from 'axios';

const ModalComponent = ({isOpen, setIsOpen, updateItems}) => {
    const [name, setName] = useState('');
    const [imgLink, setImgLink] = useState('');
    const [price, setPrice] = useState('');
    const [isPopular, setIsPopular] = useState(false);
    const [productType, setProductType] = useState('other');
    const [brand, setBrand] = useState('');
    const [guarantee, setGuarantee] = useState('');
    const [weight, setWeight] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/items', JSON.stringify({
                "name": name,
                "img": imgLink,
                "price": price,
                "isPopular": isPopular,
                "productType": productType,
                "brand": brand,
                "guarantee": guarantee,
                "weight": weight
            }), {headers: {'Content-Type': 'application/json'}});
            alert('Add item successfully');
            updateItems();
        } catch (error) {
            console.error(error);
        }
        setIsOpen(false);
    }

    return (
        <>
            <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}
                className="z-20 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] px-5 py-8 w-1/3 border border-black border-solid rounded-lg bg-white shadow-lg" 
            >
                <h1 className="text-2xl font-semibold">Add Product</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block">
                        <span className="text-gray-700">Name:</span>
                        <input className="px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm" type="text" value={name} onChange={e => setName(e.target.value)} />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Image Link:</span>
                        <input className="px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm" type="text" value={imgLink} onChange={e => setImgLink(e.target.value)} />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Price:</span>
                        <input className="px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm" type="number" value={price} onChange={e => setPrice(e.target.value)} />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Is Popular:</span>
                        <select className="px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm" value={isPopular} onChange={e => setIsPopular(e.target.value)}>
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </select>
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Product Type:</span>
                        <select className="px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm" value={productType} onChange={e => setProductType(e.target.value)}>
                            <option value="laptop">Laptop</option>
                            <option value="iphone">iPhone</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                    
                    {
                        productType === 'laptop' ? 
                            <>
                                <label className="block">
                                    <span className="text-gray-700">Brand:</span>
                                    <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" type="text" value={brand} onChange={e => setBrand(e.target.value)} />
                                </label> 
                                <label className="block">
                                    <span className="text-gray-700">Guarantee:</span>
                                    <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" type="text" value={guarantee} onChange={e => setGuarantee(e.target.value)}/>
                                </label> 
                                <label className="block">
                                    <span className="text-gray-700">Weight:</span>
                                    <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" type="text" value={weight} onChange={e => setWeight(e.target.value)}/>
                                </label> 
                            </>
                        : 
                        productType === 'iphone' ?
                        <>
                            <label className="block">
                                <span className="text-gray-700">Brand:</span>
                                <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" type="text" value={brand} onChange={e => setBrand(e.target.value)} />
                            </label> 
                            <label className="block">
                                <span className="text-gray-700">Guarantee:</span>
                                <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" type="text" value={guarantee} onChange={e => setGuarantee(e.target.value)}/>
                            </label> 
                        </>
                        : 
                        <label className="block">
                            <span className="text-gray-700">Brand:</span>
                            <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" type="text" value={brand} onChange={e => setBrand(e.target.value)} />
                        </label> 
                    }
                    
                    <button className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700" type="submit">Submit</button>
                </form>
            </Modal>
        </>
    )
}

export default ModalComponent;