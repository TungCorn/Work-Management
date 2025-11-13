// src/components/CardView.jsx
import React from 'react';

const CardView = ({ items, onAdd, onEdit, onDelete }) => {
    return (
        <div className="row">
            {items.length === 0 ? (
                <div className="col-12 text-center py-5">
                    <p className="text-muted">Chưa có dữ liệu nào. Hãy thêm mới!</p>
                </div>
            ) : (
                items.map((item) => (
                    <div key={item.id} className="col-md-6 col-lg-4 mb-4">
                        <div className="card h-100 shadow-sm border">
                            {/* Card Header */}
                            <div className="card-header">
                                <h6 className="mb-0">Thông tin Công Việc</h6>
                            </div>

                            {/* Card Body - theo cấu trúc List */}
                            <div className="card-body">
                                {/* Công việc */}
                                <div className="mb-3">
                                    <strong>Công việc:</strong>
                                    <p className="mb-1">{item.name}</p>
                                </div>

                                {/* Thời gian bắt đầu */}
                                <div className="mb-3">
                                    <strong>Thời gian bắt đầu:</strong>
                                    <p className="mb-1">{item.startDate}</p>
                                </div>

                                {/* Thời gian kết thúc */}
                                <div className="mb-3">
                                    <strong>Thời gian kết thúc:</strong>
                                    <p className="mb-1">{item.endDate}</p>
                                </div>

                                {/* Trạng thái */}
                                <div className="mb-3">
                                    <strong>Trạng thái:</strong>
                                    <br />
                                    <span className={`badge ${
                                        item.status === 'Đang thực hiện' ? 'bg-success' : 
                                        item.status === 'Khẩn cấp' ? 'bg-danger' : 
                                        item.status === 'Trì hoãn' ? 'bg-warning' : 'bg-secondary'
                                    }`}>
                                        {item.status}
                                    </span>
                                </div>

                                {/* Quản lý - buttons giống List */}
                                <div className="text-center">
                                    <strong>Quản lý:</strong>
                                    <br />
                                    <button 
                                        className="btn bg-success btn-outline-secondary btn-sm me-1 rounded-circle text-white"
                                        onClick={() => onAdd()}
                                    >
                                        +
                                    </button>
                                    <button 
                                        className="btn bg-danger btn-outline-secondary btn-sm rounded-circle text-white"
                                        onClick={() => onDelete && onDelete(item.id)}
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default CardView;