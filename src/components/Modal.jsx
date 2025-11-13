// src/components/ProductModal.jsx
import React, { useState, useEffect } from 'react';
import "../modal1.css"

const Modal = ({ isOpen, onClose, onSave, itemToEdit }) => {
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

        // Kiểm tra định dạng ngày một lần nữa
        // if (!validateDate(startDate)) {
        //     setError(prev => ({ ...prev, startDate: "Định dạng ngày bắt đầu không đúng!" }));
        //     return;
        // }

        // if (!validateDate(endDate)) {
        //     setError(prev => ({ ...prev, endDate: "Định dạng ngày kết thúc không đúng!" }));
        //     return;
        // }

        onSave({
            name,
            startDate,
            endDate,
            status,
            serialNumber
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Modal Backdrop */}
            <div className="modal-backdrop show" onClick={onClose}></div>

            {/* Modal */}
            <div className="modal show d-block">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Thêm Công Việc</h5>
                            <button className="btn-close" onClick={onClose}></button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="mb-3">
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

                                <div className="mb-3">
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

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Thời gian bắt đầu:</label>
                                            <input
                                                type="text"
                                                className={`form-control `}
                                                value={startDate}
                                                onChange={handleStartDateChange}
                                                placeholder="dd/mm/yyyy"
                                                required
                                            />
                                            {error.startDate && (
                                                <div className='error'>{error.startDate}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Thời gian kết thúc:</label>
                                            <input
                                                type="text"
                                                className={`form-control `}
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
                                </div>

                                <div className="mb-3 d-flex justify-content-between">
                                    <label className="form-label">Trạng thái:</label>
                                    <div className='d-flex '>
                                        <div className="form-check bg-success ">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="statusRadio"
                                                id="active"
                                                value="Đang thực hiện"
                                                checked={status === 'Đang thực hiện'}
                                                onChange={(e) => setStatus(e.target.value)}
                                            />
                                            <label className="form-check-label text-white" htmlFor="active">
                                                Đang thực hiện
                                            </label>
                                        </div>
                                        <div className="form-check bg-warning ">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="statusRadio"
                                                id="delay"
                                                value="Trì hoãn"
                                                checked={status === 'Trì hoãn'}
                                                onChange={(e) => setStatus(e.target.value)}
                                            />
                                            <label className="form-check-label text-dark" htmlFor="delay">
                                                Trì hoãn
                                            </label>
                                        </div>
                                        <div className="form-check bg-danger ">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="statusRadio"
                                                id="urgent"
                                                value="Khẩn cấp"
                                                checked={status === 'Khẩn cấp'}
                                                onChange={(e) => setStatus(e.target.value)}
                                            />
                                            <label className="form-check-label text-white" htmlFor="urgent">
                                                Khẩn cấp
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={onClose}>
                                    Hủy
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Lưu
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;