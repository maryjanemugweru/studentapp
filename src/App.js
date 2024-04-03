import './App.css';
import CourseForm from './components/courseForm';
import FormComponent from './components/studentForm';
import RegForm from './components/regForm';

function App() {
  return (
    <div className="App">
      <FormComponent/>
      <CourseForm/>
      <RegForm/>
    </div>
  );
}

export default App;
