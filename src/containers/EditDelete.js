import React, { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function EditDelete(props) {

    const [values, setValues] = useState('');
    const [newVal, setNewVal] = useState([]);
    const [editIndex, setEditIndex] = useState(null);


    useEffect(() => {
        const fromLocal = JSON.parse(localStorage.getItem('newVal'))
        console.log(fromLocal)
        if (fromLocal) {
            setNewVal(fromLocal)
        } else {
            localStorage.setItem('newVal', '[]')
        }
    }, []);


    function handleSubmit(e) {
        e.preventDefault()

        if (values.length) {
            if (editIndex !== null) {
                const updateArt = [...newVal];
                updateArt[editIndex] = { ...updateArt[editIndex], value: values };
                setNewVal(updateArt);

                localStorage.setItem('newVal', JSON.stringify(updateArt))
                setEditIndex(null)
            } else {
                const tempArr = [...newVal]
                tempArr.push({ value: values, status :false })
                setNewVal(tempArr)
                // setnext(prvId => prvId + 1);
                localStorage.setItem('newVal', JSON.stringify(tempArr))
            }
        } else {
            alert('please enter value')
        }


        // const newEntry = { value: values }
        // setNewVal([...newVal, newEntry]);
        setValues('')
    }





    function handleEdit(index) {
        console.log(index);
        setValues(newVal[index].value)
        setEditIndex(index);
    }

    function handleDelete(index) {
        const remove = [...newVal]
        remove.splice(index, 1)
        setNewVal(remove);
        localStorage.setItem('newVal', JSON.stringify(remove))
    }

    const handleCheckChange = (e,i) => {
        const tempArr = [...newVal]
        tempArr[i]  = {
            ...tempArr[i],
            status: e.target.checked
        }
        console.log(tempArr)

        setNewVal(tempArr)

                localStorage.setItem('newVal', JSON.stringify(tempArr))

    }



    return (
        <>
            <div className='main'>
                <form action='' style={{ textAlign: 'center' }} onSubmit={handleSubmit}>
                    <label><h2>Add Task</h2></label>
                    <input type='text' className='task' name='values' value={values} onChange={(e) => setValues(e.target.value)} placeholder='Add To Task' />
                    <button type='submit' className='addButton' >{editIndex !== null ? 'update' : 'add'}</button>
                </form>
                <div>
                    {
                        newVal.map((val, index) => {
                            return (
                                <div key={`task-${index}`} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    <input type='checkbox' checked={val.status} onChange={e=>handleCheckChange(e,index)} />
                                    <p style={{ display: 'inline-block', marginRight: '10px', color:'black' }}>{val.value}</p>
                                    <div className='editDeletButton'>
                                        <button onClick={() => handleEdit(index)}><FaEdit /></button>
                                        <button onClick={() => handleDelete(index)}>< MdDelete /></button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default EditDelete;