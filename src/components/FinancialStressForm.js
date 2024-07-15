import React, { useState } from 'react';
import axios from 'axios';

const FinancialStressForm = () => {
    const [formData, setFormData] = useState([]);
    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare data in the required format
        const data = [
            {
                "Date": formData.date,
                "Description": formData.description,
                "Balance": formData.balance,
                "Transaction Type": formData.transactionType,
                "Amount": formData.amount,
            }
        ];

        try {
            const response = await axios.post('http://127.0.0.1:5000/predict', data);
            setResult(response.data);
        } catch (error) {
            console.error("There was an error making the request:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Date:</label>
                    <input type="text" name="date" onChange={handleChange} />
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" name="description" onChange={handleChange} />
                </div>
                <div>
                    <label>Balance:</label>
                    <input type="text" name="balance" onChange={handleChange} />
                </div>
                <div>
                    <label>Transaction Type:</label>
                    <input type="text" name="transactionType" onChange={handleChange} />
                </div>
                <div>
                    <label>Amount:</label>
                    <input type="text" name="amount" onChange={handleChange} />
                </div>
                <button type="submit">Submit</button>
            </form>

            {result && (
                <div>
                    <h3>Prediction Result:</h3>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default FinancialStressForm;
