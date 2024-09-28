import  { useState, useEffect } from 'react';
import { db } from '../firebase';
import {QRCode} from 'qrcode.react';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState({ class: '', rollNumber: '', name: '' });

  useEffect(() => {
    const fetchStudents = async () => {
      const snapshot = await db.collection('students').get();
      const studentList = snapshot.docs.map(doc => doc.data());
      setStudents(studentList);
    };
    fetchStudents();
  }, []);

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const filteredStudents = students.filter(student => {
    return (
      (!filter.class || student.class === filter.class) &&
      (!filter.rollNumber || student.rollNumber === filter.rollNumber) &&
      (!filter.name || student.name.toLowerCase().includes(filter.name.toLowerCase()))
    );
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Student List</h1>
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          name="name"
          placeholder="Search by name"
          value={filter.name}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="class"
          placeholder="Select Class"
          value={filter.class}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="rollNumber"
          placeholder="Select Roll Number"
          value={filter.rollNumber}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Admission No</th>
            <th className="py-2">Name</th>
            <th className="py-2">Class</th>
            <th className="py-2">Roll Number</th>
            <th className="py-2">Section</th>
            <th className="py-2">QR Code</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map(student => (
            <tr key={student.admissionNo} className="border-b">
              <td className="py-2">{student.admissionNo}</td>
              <td className="py-2">{student.name}</td>
              <td className="py-2">{student.class}</td>
              <td className="py-2">{student.rollNumber}</td>
              <td className="py-2">{student.section}</td>
              <td className="py-2">
                <QRCode value={student.admissionNo} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
