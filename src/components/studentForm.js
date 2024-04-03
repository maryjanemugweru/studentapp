import React, { useState } from 'react';
import axios from 'axios'; // Import Axios library for making HTTP requests
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormComponent = () => {
  const [data, setFormData] = useState({
    firstname: '',
    lastname: '',
    gender: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveStudent = (e) => {
    e.preventDefault();
    if (data.firstname.length === 0) {
      toast.error('First Name is required', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    } else if (data.lastname.length === 0) {
      toast.error('Last Name is required', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    } else if (data.gender.length === 0) {
      toast.error('Gender is required', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    } else {
      axios
        .post('http://localhost:4000/api/students/addStudent', data)
        .then((res) => {
          toast.success('New student added successfully', {
            position: toast.POSITION.TOP_RIGHT,
            autoclose: 3000,
          });
        })
        .catch((err) => {
          toast.error('Something went wrong while adding the student', {
            position: toast.POSITION.TOP_RIGHT,
            autoclose: 3000,
          });
        });
    }
  };

  return (
    <div className="container mt-5">
      <form
        onSubmit={saveStudent}
        className="bg-white shadow p-4 rounded"
        style={{ maxWidth: '400px', margin: 'auto' }}
      >
        <div className="mb-3">
          <label htmlFor="firstname" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstname"
            placeholder="First Name"
            name="firstname"
            value={data.firstname}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastname" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastname"
            placeholder="Last Name"
            name="lastname"
            value={data.lastname}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <select
            className="form-select"
            id="gender"
            name="gender"
            value={data.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default FormComponent;
