import React, { useState } from 'react';
import styles from './BlogManagement.module.css';

// Status Badge Component
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    let badgeClass = styles.badge;
    if (status === 'success') badgeClass += ` ${styles.successBadge}`;
    else if (status === 'pending') badgeClass += ` ${styles.pendingBadge}`;
    else if (status === 'failed') badgeClass += ` ${styles.failedBadge}`;

    return <span className={badgeClass}>{status}</span>;
};

// Data Table Component
const DataTable: React.FC<{
    columns: { id: string; label: string }[];
    rows: any[];
    onRowClick?: (row: any) => void;
}> = ({ columns, rows, onRowClick }) => {
    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.id} className={styles.tableHeader}>
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr
                            key={index}
                            className={styles.tableRow}
                            onClick={() => onRowClick && onRowClick(row)}
                        >
                            {columns.map((column) => (
                                <td key={column.id} className={styles.tableCell}>
                                    {row[column.id]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Blog Component
const BlogManagement = () => {
    // Blog Posts State
    const [posts, setPosts] = useState([
        { id: 1, title: 'Modern Hotel Design', author: 'Admin', date: '2023-04-05', status: 'published' },
        { id: 2, title: 'Sustainable Practices', author: 'Admin', date: '2023-03-22', status: 'draft' },
    ]);

    // Edit Modal State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<any>(null);
    const [editForm, setEditForm] = useState({
        title: '',
        author: '',
        date: '',
        status: 'draft'
    });

    // Categories State
    const [categories, setCategories] = useState([
        { id: 1, name: 'Travel Tips', description: 'Tips for travelers', status: 'active' },
        { id: 2, name: 'Hotel News', description: 'Latest hotel updates', status: 'inactive' },
    ]);

    // Tags State
    const [tags, setTags] = useState([
        { id: 1, name: 'Sustainability', slug: 'sustainability' },
        { id: 2, name: 'Luxury', slug: 'luxury' },
    ]);

    // Handle Post Actions
    const handlePostEdit = (id: number) => {
        const postToEdit = posts.find(post => post.id === id);
        if (postToEdit) {
            setEditingPost(postToEdit);
            setEditForm({
                title: postToEdit.title,
                author: postToEdit.author,
                date: postToEdit.date,
                status: postToEdit.status
            });
            setIsEditModalOpen(true);
        }
    };

    const handleSaveEdit = () => {
        if (editingPost) {
            setPosts(posts.map(post =>
                post.id === editingPost.id
                    ? { ...post, ...editForm }
                    : post
            ));
            setIsEditModalOpen(false);
            setEditingPost(null);
            setEditForm({ title: '', author: '', date: '', status: 'draft' });
        }
    };

    const handleCancelEdit = () => {
        setIsEditModalOpen(false);
        setEditingPost(null);
        setEditForm({ title: '', author: '', date: '', status: 'draft' });
    };

    const handleInputChange = (field: string, value: string) => {
        setEditForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handlePostDelete = (id: number) => {
        setPosts(posts.filter(post => post.id !== id));
    };

    // Handle Category Actions
    const handleCategoryEdit = (id: number) => {
        alert(`Edit category ${id}`);
    };

    const handleCategoryDelete = (id: number) => {
        setCategories(categories.filter(category => category.id !== id));
    };

    // Handle Tag Actions
    const handleTagEdit = (id: number) => {
        alert(`Edit tag ${id}`);
    };

    const handleTagDelete = (id: number) => {
        setTags(tags.filter(tag => tag.id !== id));
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Blog Management</h2>
            </div>

            {/* Edit Post Modal */}
            {isEditModalOpen && (
                <>
                    <div className={styles.modalOverlay} onClick={handleCancelEdit}></div>

                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h3>Edit Blog Post</h3>
                            <span
                                className={styles.modalClose}
                                onClick={handleCancelEdit}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && handleCancelEdit()}
                            >
                                ×
                            </span>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel} htmlFor="edit-title">Title</label>
                            <input
                                id="edit-title"
                                type="text"
                                className={styles.input}
                                value={editForm.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                placeholder="Enter post title"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel} htmlFor="edit-author">Author</label>
                            <input
                                id="edit-author"
                                type="text"
                                className={styles.input}
                                value={editForm.author}
                                onChange={(e) => handleInputChange('author', e.target.value)}
                                placeholder="Enter author name"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel} htmlFor="edit-date">Date</label>
                            <input
                                id="edit-date"
                                type="date"
                                className={styles.input}
                                value={editForm.date}
                                onChange={(e) => handleInputChange('date', e.target.value)}
                                title="Select post date"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel} htmlFor="edit-status">Status</label>
                            <select
                                id="edit-status"
                                className={styles.input}
                                value={editForm.status}
                                onChange={(e) => handleInputChange('status', e.target.value)}
                                title="Select post status"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>

                        <div className={styles.actionButtons}>
                            <button
                                className={styles.editButton}
                                onClick={handleSaveEdit}
                            >
                                Save Changes
                            </button>
                            <button
                                className={styles.deleteButton}
                                onClick={handleCancelEdit}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* Blog Posts Section */}
            <div>
                <h3 className={styles.sectionHeader}>Blog Posts</h3>
                <DataTable
                    columns={[
                        { id: 'title', label: 'Title' },
                        { id: 'author', label: 'Author' },
                        { id: 'date', label: 'Date' },
                        { id: 'status', label: 'Status' },
                        { id: 'actions', label: 'Actions' },
                    ]}
                    rows={posts.map(post => ({
                        ...post,
                        actions: (
                            <div className={styles.actionButtons}>
                                <button
                                    className={styles.editButton}
                                    onClick={() => handlePostEdit(post.id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className={styles.deleteButton}
                                    onClick={() => handlePostDelete(post.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        ),
                    }))}
                />
            </div>

            {/* Categories Section */}
            <div>
                <h3 className={styles.sectionHeader}>Categories</h3>
                <DataTable
                    columns={[
                        { id: 'name', label: 'Name' },
                        { id: 'description', label: 'Description' },
                        { id: 'status', label: 'Status' },
                        { id: 'actions', label: 'Actions' },
                    ]}
                    rows={categories.map(category => ({
                        ...category,
                        actions: (
                            <div className={styles.actionButtons}>
                                <button
                                    className={styles.editButton}
                                    onClick={() => handleCategoryEdit(category.id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className={styles.deleteButton}
                                    onClick={() => handleCategoryDelete(category.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        ),
                    }))}
                />
            </div>

            {/* Tags Section */}
            <div>
                <h3 className={styles.sectionHeader}>Tags</h3>
                <DataTable
                    columns={[
                        { id: 'name', label: 'Name' },
                        { id: 'slug', label: 'Slug' },
                        { id: 'actions', label: 'Actions' },
                    ]}
                    rows={tags.map(tag => ({
                        ...tag,
                        actions: (
                            <div className={styles.actionButtons}>
                                <button
                                    className={styles.editButton}
                                    onClick={() => handleTagEdit(tag.id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className={styles.deleteButton}
                                    onClick={() => handleTagDelete(tag.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        ),
                    }))}
                />
            </div>
        </div>
    );
};

export default BlogManagement;