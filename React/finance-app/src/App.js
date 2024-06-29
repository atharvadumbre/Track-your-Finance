import React, {useState, useEffect} from "react"
import api from "./api";

const App = () => {
    const [transactions, setTransactions] = useState([]);
    const [formData, setFormData] = useState({
      amount: '',
      category: '',
      description: '',
      is_income: '',
      date: ''
    }
    );

    const fetchTransactions = async() => {
      const response = await api.get('/transactions/');
      setTransactions(response.data)
    };

    useEffect(() => {
      fetchTransactions();
    }, []);

    const handleInputChange = (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      setFormData({
        ...formData,
        [e.target.name]: value,
      });
    };

    const handleFormSubmit = async (e) => {
      e.preventDefault();
      await api.post('/transactions/',formData);
      fetchTransactions();
      setFormData({
        amount: '',
        category: '',
        description: '',
        is_income: '',
        date: ''
      });
    };


return (
  <div> 
    <nav className="navbar navbar-dark bg-dark bg-gradient shadow">
      <div className="container-fluid">
      <a className="navbar-brand fs-3" href="#">
      Track your Finance
      </a>
      </div>
    </nav>

  <div className="container text-dark">
    <form onSubmit={handleFormSubmit} className="fs-4">
    <div class="row">
      <div className="mb-3 mt-3 col"> 
        <label htmlFor="amount" className="form-label">Amount</label>
        <input type="text" className="form-control" id="amount" name="amount" onChange={handleInputChange} value={formData.amount}/>
      </div>
      <div className="mb-3 mt-3 col"> 
        <label htmlFor="date" className="form-label">Date</label>
        <input type="text" className="form-control" id="date" name="date" onChange={handleInputChange} value={formData.date}/>
      </div>
      <div className="mb-3 mt-3 form-check col"> 
        <label htmlFor="is_income" className="form-label">Is Income</label>
        <input className="form-check-input" type="checkbox" id="is_income" name="is_income" onChange={handleInputChange} value={formData.is_income}/>
      </div>
  </div>
      <div className="mb-3"> 
        <label htmlFor="category" className="form-label">Category</label>
        <input type="text" className="form-control" id="category" name="category" onChange={handleInputChange} value={formData.category}/>
      </div>
      <div className="mb-3"> 
        <label htmlFor="description" className="form-label">Description</label>
        <input type="text" className="form-control" id="description" name="description" onChange={handleInputChange} value={formData.description}/>
      </div>



      
      <div class="d-grid gap-2 col-6 mx-auto">
      <button type="submit" className="btn btn-outline-dark btn-lg bg-gradient shadow-lg">Submit</button>
      </div>

    </form>

<hr className="mt-5"></hr>
<p className="text-dark fs-4">History</p>
<table className="table table-striped table-bordered table-hover mt-3">
<thead>
  <tr>
    <th>Amount</th>
    <th>Category</th>
    <th>Description</th>
    <th>Income?</th>
    <th>Date</th>
  </tr>
</thead>
<tbody>
  {transactions.map((transaction) => (
    <tr key={transaction.id}>
      <td>{transaction.amount}</td>
      <td>{transaction.category}</td>
      <td>{transaction.description}</td>
      <td>{transaction.is_income ? 'Yes' : 'No'}</td>
      <td>{transaction.date}</td>
    </tr>
  ))}
</tbody>
</table>



  </div>
  </div>
)

}

export default App;
