import React, { useEffect, useState } from 'react';
import { getTransactions } from '../services/api';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await getTransactions();
                setTransactions(response);
            } catch (error) {
                console.error('Error fetching transactions:', error);
                // Handle error: tampilkan pesan error ke pengguna
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div>
            <h2>Transaction List</h2>
            {transactions.length === 0 ? (
                <p>No transactions found</p>
            ) : (
                <ul>
                    {transactions.map((transaction) => (
                        <li key={transaction.id}>
                            <p>Date: {transaction.transaction_date}</p>
                            <p>Items: {transaction.items}</p>
                            <p>Total Amount: {transaction.total_amount}</p>
                            <p>Payment Status: {transaction.payment_status}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TransactionList;
