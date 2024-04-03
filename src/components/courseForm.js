import React, { useState } from 'react';
import axios from 'axios'; // Import Axios library for making HTTP requests
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CourseForm = () => {
  const [data, setFormData] = useState({
    courseName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveCourse = (e) => {
    e.preventDefault();
    if (data.courseName.length === 0) {
      toast.error('Course Name is required', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    } else {
      axios
        .post('http://localhost:4000/api/courses/addcourse', data)
        .then((res) => {
            setFormData(res.data);

          toast.success('Course added successfully', {
            position: toast.POSITION.TOP_RIGHT,
            autoclose: 3000,
          });
        })
        .catch((err) => {
          toast.error('Something went wrong while adding the course', {
            position: toast.POSITION.TOP_RIGHT,
            autoclose: 3000,
          });
        });
    }
  };

  return (
    <div className="container mt-5">
      <form
        onSubmit={saveCourse}
        className="bg-white shadow p-4 rounded"
        style={{ maxWidth: '400px', margin: 'auto' }}
      >
        <div className="mb-3">
          <label htmlFor="course" className="form-label">
            course
          </label>
          <input
            type="text"
            className="form-control"
            id="course"
            placeholder="course"
            name="courseName"
            value={data.courseName}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CourseForm;