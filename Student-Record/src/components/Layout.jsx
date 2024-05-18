import React, { useEffect, useState } from "react";

const Layout = () => {

    const [uid, setId] = useState(null)
    const [name, setName] = useState('')
    const [course, setCourse] = useState('')
    const [city, setCity] = useState('')
    const [stdData, setData] = useState([])
    const [btn, setBtn] = useState('Save')

    const sendData = async() => {
        const res = await fetch('http://localhost/Student/createStudent.php', {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body : JSON.stringify({
                name : name,
                course : course,
                city : city,
            })
        });
        const result = await res.text();
        console.log(result);
        
        getStudent()
        setName('')
        setCourse('')
        setCity('')
    }

    const getStudent = async() => {
        const res = await fetch('http://localhost/Student/getStudent.php');
        const result = await res.json();
        setData(result)
        console.log(stdData);
    }

    const deleteStudent = async(id) => {
        const res = await fetch('http://localhost/Student/delStudent.php', {
            method : 'DELETE',
            headers : {
                 'Content-Type': 'application/json' 
            },
            body : JSON.stringify({
                id : id
            })
        });
        const result = await res.json();
        console.log(result);
        getStudent()
    }

    const setUpdateData = async(data) => {
        setId(data.id)
        setName(data.name);
        setCity(data.city)
        setCourse(data.course);
        setBtn('Update')
    }

    const updateData = async() => {
        
        const res = await fetch('http://localhost/Student/updateStudent.php', {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                id : uid,
                name : name,
                course : course,
                city : city
            })
        })
        
        const result = await res.json();
        console.log(result)
        getStudent()
    }

    useEffect(() => {
        getStudent()
    }, [])

    return(
        <>
         <div className="w-full md:flex gap-10 p-10 bg-sky-300 h-svh">
            <div className="w-full">
                <div>
                    <input type="text" placeholder="Name" className="w-full rounded-md outline-none p-3" onChange={(e) => setName(e.target.value)} value={name} />
                </div>
                <div className="my-5">
                    <select className="w-full outline-none p-3 rounded-md" onChange={(e) => setCourse(e.target.value)}>
                    <option disabled selected className="text-gray-500">-- Select Here --</option>
                        {stdData?.city?.map((opt) => <option key={opt.id} value={opt.id} selected={opt.id === course}>{opt.name}</option>)}
                    </select>
                </div>
                <div>
                    <input type="text" placeholder="City" className="w-full rounded-md outline-none p-3" onChange={(e) => setCity(e.target.value)} value={city} />
                </div>
                <div>
                    <input type="button" value={btn} className="w-full rounded-md outline-none p-3 bg-blue-500 text-white mt-5 cursor-pointer"
                    onClick={btn === 'Save'? sendData : updateData} />
                </div>
            </div>
            <div className="w-full md:mt-0 mt-10">
                <table className="w-full bg-white rounded-md overflow-hidden">
                    <thead className="bg-blue-500 text-white">
                        <tr className="">
                            <th className="py-3 border-r-2">S. No.</th>
                            <th className="py-3 border-r-2">Name</th>
                            <th className="py-3 border-r-2">Courses</th>
                            <th className="py-3 border-r-2">City</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="">
                       
                        {stdData?.data?.map((row, index) => <tr key={row.id}>
                            <td className="px-2">{index+1}</td>
                            <td className="px-2">{row.name}</td>
                            <td className="px-2">{stdData?.city?.map(citi => citi.id === row.course? citi.name: '')}</td>
                            <td className="px-2">{row.city}</td>
                            <td className="flex justify-center">
                                <i className="fa fa-edit block mx-2 text-blue-400 text-xl cursor-pointer" onClick={() => setUpdateData(row)}></i>
                                <i className="fa fa-trash block text-red-500 text-xl cursor-pointer" onClick={() => deleteStudent(row.id)}></i>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
         </div>   
        </>
    )
}


export default Layout;