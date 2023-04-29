import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [type, setType] = useState('chooseOne');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions'));
    if (storedTransactions) {
      setTransactions(storedTransactions);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type !== 'chooseOne' && name && amount > 0) {
      const newTransaction = {
        id: new Date().getTime(),
        type,
        name,
        amount: Number(amount)
      };

      setTransactions([...transactions, newTransaction]);
      setType('chooseOne');
      setName('');
      setAmount('');
    }
  };

  const handleDelete = (id) => {
    const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
    setTransactions(updatedTransactions);
  };

  const calculateBalance = () => {
    let balance = 0;
    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        balance += transaction.amount;
      } else {
        balance -= transaction.amount;
      }
    });
    return balance;
  };

  return (
    <div className="container">
      <header className='headerBar'>
        <h1 style={{"color" : "black"}}>My Budget Tracker</h1>
        <h2>Your Current Balance</h2>
        <p>
          <span className="currency">₹</span>
          <span className="balance">{calculateBalance()}</span>
        </p>
      </header>

      <section className='content'>
        <h3 className='secondTitle' style={{"textAlign" : "center"}}>Add a new transaction:</h3>
        <form className='form' onSubmit={handleSubmit}>
          <div className="formLine">
            <label htmlFor="type">Type:</label>
            <select id="type" value={type} onChange={handleTypeChange}>
              <option value="chooseOne">Choose one...</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div className="formLine">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={handleNameChange} />
          </div>
          <div className="formLine">
            <label htmlFor="amount">Amount:</label>
            <input type="number" id="amount" value={amount} onChange={handleAmountChange} />
          </div>
          <button type="submit" className="buttonSave">Add to transactions</button>
        </form>
      </section>

      <section>
        <table className="table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.type}</td>
                <td>{transaction.name}</td>
                <td>{transaction.amount}</td>
                <td>
                  <button className="buttonDelete" onClick={() => handleDelete(transaction.id)}>Delete</button>
</td>
</tr>
))}
</tbody>
</table>
</section>
</div>
);
}

export default App;







