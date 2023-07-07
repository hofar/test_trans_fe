import React, { useState } from 'react';
import { createTransaction } from '../services/api';

const TransactionForm = ({ fetchTransactionData }) => {
    const [transactionDate, setTransactionDate] = useState('');
    const [items, setItems] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const transactionData = {
                transaction_date: transactionDate,
                items,
                total_amount: parseFloat(totalAmount),
                payment_status: paymentStatus
            };

            const response = await createTransaction(transactionData);

            await fetchTransactionData();

            console.log(response); // Tampilkan respons dari API ke konsol atau lakukan aksi lainnya

            // Reset form setelah berhasil membuat transaksi
            setTransactionDate('');
            setItems('');
            setTotalAmount('');
            setPaymentStatus('');
        } catch (error) {
            console.error('Error creating transaction:', error);
            // Handle error: tampilkan pesan error ke pengguna
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label className="form-label">Transaction Date</label>
                <input type="date" className="form-control" value={transactionDate} onChange={(e) => setTransactionDate(e.target.value)} required />
            </div>
            <div>
                <label className="form-label">Items</label>
                <input type="text" className="form-control" value={items} onChange={(e) => setItems(e.target.value)} required />
            </div>
            <div>
                <label className="form-label">Total Amount</label>
                <input type="number" className="form-control" value={totalAmount} step="0.01" onChange={(e) => setTotalAmount(e.target.value)} required />
            </div>
            <div>
                <label className="form-label">Payment Status</label>
                <select value={paymentStatus} className="form-control" onChange={(e) => setPaymentStatus(e.target.value)} required>
                    <option value="">Select Payment Status</option>
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                </select>
            </div>
            <button type="submit" className="btn mt-4 btn-primary">Create Transaction</button>
        </form>
    );
};

export default TransactionForm;
