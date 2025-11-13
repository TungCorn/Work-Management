// src/components/ModalHien.jsx
import React, { useState, useEffect } from 'react';
import "../modal1.css"

const ModalHien = ({ isOpen, onClose, onSave, itemToEdit }) => {
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('Đang thực hiện');
    const [serialNumber, setSerialNumber] = useState('');

    const [error, setError] = useState({});

    useEffect(() => {
        if (itemToEdit) {
            setName(itemToEdit.name);
            setStartDate(itemToEdit.startDate);
            setEndDate(itemToEdit.endDate);
            setStatus(itemToEdit.status);
            setSerialNumber(itemToEdit.serialNumber);
        } else {
            setName('');
            setStartDate('');
            setEndDate('');
            setStatus('Đang thực hiện');
            setSerialNumber('');
        }
    }, [itemToEdit, isOpen]);

    // Hàm kiểm tra định dạng ngày dd/mm/yyyy
    const validateDate = (dateString) => {
        const datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        return datePattern.test(dateString);
    };

    const handleNameChange = (e) => {
        const value = e.target.value;
        if (value.length > 100) {
            setError(prev => ({ ...prev, name: "Tên công việc không được vượt quá 100 ký tự!" }))
        } else {
            setError(prev => ({ ...prev, name: '' }))
        }
        setName(value);
    }

    const handleStartDateChange = (e) => {
        const value = e.target.value;
        setStartDate(value);
        
        if (value && !validateDate(value)) {
            setError(prev => ({ ...prev, startDate: "Định dạng ngày không đúng! Vui lòng nhập theo định dạng dd/mm/yyyy" }));
        } else {
            setError(prev => ({ ...prev, startDate: '' }));
        }
    };

    const handleEndDateChange = (e) => {
        const value = e.target.value;
        setEndDate(value);
        
        if (value && !validateDate(value)) {
            setError(prev => ({ ...prev, endDate: "Định dạng ngày không đúng! Vui lòng nhập theo định dạng dd/mm/yyyy" }));
        } else {
            setError(prev => ({ ...prev, endDate: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Kiểm tra lỗi trước khi submit
        const hasErrors = Object.values(error).some(error => error !== '');
        if (hasErrors) {
            alert('Vui lòng sửa các lỗi trước khi lưu!');
            return;
        }

        onSave({
            name,
            startDate,
            endDate,
            status,
            serialNumber
        });

        // Reset form sau khi lưu
        setName('');
        setStartDate('');
        setEndDate('');
        setStatus('Đang thực hiện');
        setSerialNumber('');
        setError({});
    };

    const handleCancel = () => {
        setName('');
        setStartDate('');
        setEndDate('');
        setStatus('Đang thực hiện');
        setSerialNumber('');
        setError({});
    };

    if (!isOpen) return null;

    return (
        <div className="card mb-4" style={{ width: '100%' }}>
            <div className="card-header bg-primary text-white">
                <h5 className="text-center mb-0">
                    {itemToEdit ? 'Sửa Công Việc' : 'Thêm Công Việc'}
                </h5>
            </div>

            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    {/* Dòng 1: Tên công việc + Mã công việc */}
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Tên công việc:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={handleNameChange}
                                placeholder="Nhập tên công việc"
                                required
                            />
                            {error.name && (
                                <div className='error'>{error.name}</div>
                            )}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Mã công việc:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={serialNumber}
                                onChange={(e) => setSerialNumber(e.target.value)}
                                placeholder="Nhập mã công việc"
                                required
                            />
                        </div>
                    </div>

                    {/* Dòng 2: Thời gian bắt đầu + Thời gian kết thúc */}
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Thời gian bắt đầu:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={startDate}
                                onChange={handleStartDateChange}
                                placeholder="dd/mm/yyyy"
                                required
                            />
                            {error.startDate && (
                                <div className='error'>{error.startDate}</div>
                            )}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Thời gian kết thúc:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={endDate}
                                onChange={handleEndDateChange}
                                placeholder="dd/mm/yyyy"
                                required
                            />
                            {error.endDate && (
                                <div className='error'>{error.endDate}</div>
                            )}
                        </div>
                    </div>

                    {/* Dòng 3: Trạng thái */}
                    <div className="mb-3">
                        <label className="form-label">Trạng thái:</label>
                        <div className='d-flex gap-2 mt-2'>
                            <div className="form-check bg-success p-2 rounded">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="statusRadioHien"
                                    id="activeHien"
                                    value="Đang thực hiện"
                                    checked={status === 'Đang thực hiện'}
                                    onChange={(e) => setStatus(e.target.value)}
                                />
                                <label className="form-check-label text-white" htmlFor="activeHien">
                                    Đang thực hiện
                                </label>
                            </div>
                            <div className="form-check bg-warning p-2 rounded">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="statusRadioHien"
                                    id="delayHien"
                                    value="Trì hoãn"
                                    checked={status === 'Trì hoãn'}
                                    onChange={(e) => setStatus(e.target.value)}
                                />
                                <label className="form-check-label text-dark" htmlFor="delayHien">
                                    Trì hoãn
                                </label>
                            </div>
                            <div className="form-check bg-danger p-2 rounded">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="statusRadioHien"
                                    id="urgentHien"
                                    value="Khẩn cấp"
                                    checked={status === 'Khẩn cấp'}
                                    onChange={(e) => setStatus(e.target.value)}
                                />
                                <label className="form-check-label text-white" htmlFor="urgentHien">
                                    Khẩn cấp
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="d-flex gap-2 justify-content-end">
                        <button 
                            type="button" 
                            className="btn btn-secondary"
                            onClick={handleCancel}
                        >
                            Hủy
                        </button>
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                        >
                            {itemToEdit ? "Cập nhật" : "Thêm"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalHien;