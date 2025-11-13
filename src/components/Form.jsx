// src/components/ProductForm.jsx
import React, { useState } from 'react';
import Modal from './Modal';
import ModalHien from './ModalHien';
import List from './List';
import CardView from './CardView';
import Data from '../data';
import "../form.css"

const Form = () => {
    const [items, setItems] = useState(Data);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);

    const handleSaveItem = (newItem) => {
        if (itemToEdit) {
            setItems(items.map(item =>
                item.serialNumber === itemToEdit.serialNumber ? { ...newItem, id: item.id } : item
            ));
        } else {
            const isDuplicate = items.some(item => item.serialNumber === newItem.serialNumber);
            if (isDuplicate) {
                alert('Mã công việc này đã tồn tại. Vui lòng nhập mã khác.');
                return;
            }
            setItems([...items, { ...newItem, id: Date.now() }]);
        }
        setItemToEdit(null);
    };

    const handleDeleteItem = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa công việc này?')) {
            setItems(items.filter(item => item.id !== id));
        }
    };

    const handleAddItemClick = () => {
        setItemToEdit(null);
        setIsModalOpen(true);
    };

    const handleEditItemClick = (item) => {
        setItemToEdit(item);
        setIsModalOpen(true);
    };

    return (
        <div className="container mt-5">
            <div className='header border'>
                <div className='d-flex align-items-center gap-3'>
                    <h3 className='mb-0 me-3'>TLU</h3>
                    <label>Trang chủ</label>
                    <label>Quản lý công việc</label>
                </div>
                <div className='d-flex gap-3'>
                    <input type="text" className='form-control' placeholder='Nhập nội dung' />
                    <button className='btn btn-secondary'>Tìm kiếm</button>
                </div>
            </div>

            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center p-3 mb-2 bg-black text-white">
                    <h3 className="mb-0 fw-bold">Quản Lý Công việc</h3>
                    
                    <div className="d-flex gap-3 align-items-center">
                        <div className='d-flex gap-1'>
                            <div className="form-check bg-secondary  rounded">
                                <input className="form-check-input" type="radio" name="statusFilter"  defaultChecked />
                                <label className="form-check-label text-white" htmlFor="all">
                                    Tất cả
                                </label>
                            </div>
                            <div className="form-check bg-danger  rounded">
                                <input className="form-check-input" type="radio" name="statusFilter"  />
                                <label className="form-check-label text-white" htmlFor="urgent">
                                    Khẩn cấp
                                </label>
                            </div>
                            <div className="form-check bg-success  rounded">
                                <input className="form-check-input" type="radio" name="statusFilter"  />
                                <label className="form-check-label text-white" htmlFor="active">
                                    Đang thực hiện
                                </label>
                            </div>
                            <div className="form-check bg-warning  rounded">
                                <input className="form-check-input" type="radio" name="statusFilter"  />
                                <label className="form-check-label text-dark" htmlFor="delay">
                                    Trì hoãn
                                </label>
                            </div>
                        </div>

                        {/* <button className="btn btn-success" onClick={handleAddItemClick}>
                            Thêm Mới
                        </button> */}
                    </div>
                </div>

                <div className="card-body">
                    <ModalHien
                        // isOpen={isModalOpen}
                        isOpen={true}
                        onClose={() => setIsModalOpen(false)}
                        onSave={handleSaveItem}
                        itemToEdit={itemToEdit}
                    />

                    {/* <List
                        items={items}
                        onAdd={handleAddItemClick}
                        onEdit={handleEditItemClick}
                        onDelete={handleDeleteItem}
                    /> */}
                    <CardView
                        items={items}
                        onAdd={handleAddItemClick}
                        onEdit={handleEditItemClick}
                        onDelete={handleDeleteItem}
                    />
                </div>
            </div>
        </div>
    );
};

export default Form;