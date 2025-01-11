import React, { useEffect, useState } from 'react';
import './logindashboard.css';
import { Button, Modal, Checkbox, notification } from 'antd';
import axios from 'axios';
import Endpoints from '../../Endpoint';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

const LoginDashboard = () => {
    const [doers, setDoers] = useState([]);
    const [editingDoerId, setEditingDoerId] = useState(null);
    const [editedDoer, setEditedDoer] = useState({ name: '', email: '', mobile: '' });
    const [showOptionsId, setShowOptionsId] = useState(null);
    const [isPermissionModalVisible, setPermissionModalVisible] = useState(false);
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [currentDoer, setCurrentDoer] = useState(null);

    useEffect(() => {
        const fetchDoers = async () => {
            try {
                const response = await axios.get(Endpoints.getDoer);
                if (response.status === 200) {
                    setDoers(response.data.data);
                }
            } catch (error) {
                notification.warning({
                    message: error.response?.data?.message || 'Failed to fetch data.',
                });
            }
        };
        fetchDoers();
    }, []);

    const handelOptionClick = (id) => {
        setShowOptionsId((prevId) => (prevId === id ? null : id));
    };

    const handleEdit = (doer) => {
        setEditingDoerId(doer._id);
        setEditedDoer({ name: doer.name, email: doer.email, mobile: doer.mobile });
        setShowOptionsId(null);
    };

    const handelPermision = (doer) => {
        setCurrentDoer(doer);
        setSelectedPermissions([]); 
        setPermissionModalVisible(true); 
    };

    // console.log(selectedPermissions)

    const handlePermissionSubmit = async () => {
        try {
            await axios.post(`${Endpoints.addPermision}?id=${currentDoer._id}`, {
                powertoaccess: selectedPermissions,
            });
            notification.success({ message: 'Permissions updated successfully!' });
        } catch (error) {
            notification.error({
                message: error.response?.data?.message || 'Failed to update permissions.',
            });
        }
        setPermissionModalVisible(false);
    };

    const handlePermissionChange = (checkedValues) => {
        setSelectedPermissions(checkedValues);
    };

    const handleDelete = async (id) => {
        const confirmation = window.confirm('Are you sure you want to delete this doer?');
        if (confirmation) {
            try {
                const response = await axios.delete(`${Endpoints.deleteDoer}?id=${id}`); // Change method to DELETE
                if (response.status === 200) {
                    setDoers((prevDoers) => prevDoers.filter((doer) => doer._id !== id));
                    notification.success({ message: 'Doer deleted successfully!' });
                }
            } catch (error) {
                notification.error({
                    message: error.response?.data?.message || 'Failed to delete doer.',
                });
            }
        }
    };
    

    return (
        <div className="mt-5">
            <div className="flex justify-center">
                <Button className="add-button">ADD DOER</Button>
            </div>
            <div className="doershead">
                {doers.length > 0 ? (
                    <table className="doers-table w-full table-auto border-collapse mt-5">
                        <thead className="bg-gray-300">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Last Login</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doers.map((doer, index) => (
                                <tr key={doer._id} className="hover:bg-blue-100">
                                    <td>{index + 1}</td>
                                    <td>{doer.name}</td>
                                    <td>{doer.email}</td>
                                    <td>{doer.mobile || 'N/A'}</td>
                                    <td>{doer.lastlogin || 'N/A'}</td>
                                    <td className="relative">
                                        <div
                                            onClick={() => handelOptionClick(doer._id)}
                                            className="bg-gray-300 w-fit flex justify-center items-center hover:cursor-pointer p-2 rounded"
                                        >
                                            <MoreVertOutlinedIcon style={{ color: 'white', fontSize: '20px' }} />
                                        </div>
                                        {showOptionsId === doer._id && (
                                            <div className="options-container absolute top-full mt-2 bg-white shadow-lg rounded p-2 z-10">
                                                <button
                                                    onClick={() => handleEdit(doer)}
                                                    className="option-btn"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handelPermision(doer)}
                                                    className="option-btn"
                                                >
                                                    Permission
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(doer._id)}
                                                    className="option-btn delete-btn"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <h1>No Doers Found</h1>
                )}
            </div>

           
            <Modal
                title={`Set Permissions for ${currentDoer?.name}`}
                visible={isPermissionModalVisible}
                onOk={handlePermissionSubmit}
                onCancel={() => setPermissionModalVisible(false)}
            >
                <Checkbox.Group
                    options={[
                        'Option 1',
                        'Option 2',
                        'Option 3',
                        'Option 4',
                        'Option 5',
                        'Option 6',
                        'Option 7',
                        'Option 8',
                        'Option 9',
                        'Option 10',
                    ]}
                    value={selectedPermissions}
                    onChange={handlePermissionChange}
                />
            </Modal>
        </div>
    );
};

export default LoginDashboard;
