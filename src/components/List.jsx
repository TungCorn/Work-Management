// src/components/ProductList.jsx
import React from 'react';

const List = ({ items, onAdd, onEdit, onDelete }) => {
    return (
        <>
            {items.length === 0 ? (
                <div className="text-center py-5">
                    <p className="text-muted">Chưa có dữ liệu nào. Hãy thêm mới!</p>
                </div>
            ) : (
                <>
                    <table className="table table-hover mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>STT</th>
                                <th>Công việc</th>
                                <th>Thời gian bắt đầu</th>
                                <th>Thời gian kết thúc</th>
                                <th>Trạng thái</th>
                                <th>Quản lý</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={item.id}>
                                    <td className="text-center">{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.startDate}</td>
                                    <td>{item.endDate}</td>
                                    <td>
                                        <span className={`badge ${
                                            item.status === 'Đang thực hiện' ? 'bg-success' : 
                                            item.status === 'Khẩn cấp' ? 'bg-danger' : 
                                            item.status === 'Trì hoãn' ? 'bg-warning' : 'bg-secondary'
                                        }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <button 
                                            className="btn bg-success btn-outline-secondary btn-sm me-1 rounded-circle text-white"
                                            // onClick={() => onEdit && onEdit(item)}
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
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {/* Hiển thị tổng số */}
                    <div className="mt-3">
                        <span className="text-muted">
                            Hiển thị {items.length} / {items.length}
                        </span>
                    </div>
                </>
            )}
        </>
    );
};

export default List;