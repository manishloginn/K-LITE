import React, { useEffect, useState } from 'react';
import './logindashboard.css';
import { Button, notification } from 'antd';
import axios from 'axios';
import Endpoints from '../../Endpoint';

const LoginDashboard = () => {
    const [doers, setDoers] = useState([]);

    const [editingDoerId, setEditingDoerId] = useState(null);
    const [editedDoer, setEditedDoer] = useState({ name: '', email: '' });

    useEffect(() => {
        const fetchDoers = async () => {
            try {
                const response = await axios.get(Endpoints.getDoer);
                if (response.status === 200) {
                    setDoers(response.data.data);
                }
            } catch (error) {
                notification.warning({
                    message: error.response.data.message,
                });
            }
        };
        fetchDoers();
    }, []);

    const handleEdit = (doer) => {
        setEditingDoerId(doer._id);
        setEditedDoer({ name: doer.name, email: doer.email });
    };

    const handleSave = (id) => {
        setDoers((prevDoers) =>
            prevDoers.map((doer) =>
                doer._id === id ? { ...doer, ...editedDoer } : doer
            )
        );
        setEditingDoerId(null);
        setEditedDoer({ name: '', email: '' });
    };

    const handleDelete = (id) => {
        setDoers((prevDoers) => prevDoers.filter((doer) => doer._id !== id));
    };

    return (
        <div className='mt-5'>
            <div className='flex justify-center'>
                <Button>ADD DOER</Button>
            </div>
            <div className="doershead">
                {doers.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Doer Name</th>
                                <th>Doer Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doers.map((doer) => (
                                <tr key={doer._id}>
                                    <td>
                                        {editingDoerId === doer._id ? (
                                            <input
                                                type="text"
                                                value={editedDoer.name}
                                                onChange={(e) =>
                                                    setEditedDoer((prev) => ({
                                                        ...prev,
                                                        name: e.target.value,
                                                    }))
                                                }
                                            />
                                        ) : (
                                            doer.name
                                        )}
                                    </td>
                                    <td>
                                        {editingDoerId === doer._id ? (
                                            <input
                                                type="email"
                                                value={editedDoer.email}
                                                onChange={(e) =>
                                                    setEditedDoer((prev) => ({
                                                        ...prev,
                                                        email: e.target.value,
                                                    }))
                                                }
                                            />
                                        ) : (
                                            doer.email
                                        )}
                                    </td>
                                    <td>
                                        <div className="flex gap-4">
                                            {editingDoerId === doer._id ? (
                                                <button
                                                    onClick={() => handleSave(doer._id)}
                                                    className="bg-green-600 text-white px-7"
                                                >
                                                    Save
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleEdit(doer)}
                                                    className="bg-gray-600 text-white px-7"
                                                >
                                                    Edit
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(doer._id)}
                                                className="bg-gray-600 text-white px-7"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <h1>No Doers Found</h1>
                )}
            </div>
        </div>
    );
};

export default LoginDashboard;
