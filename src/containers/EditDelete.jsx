import React, { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function EditDelete(props) {

    const [values, setValues] = useState('');
    console.log(values);
    const [newVal, setNewVal] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    const [data, setData] = useState(newVal)
    const [filter, setFilter] = useState('all')


    useEffect(() => {
        const fromLocal = JSON.parse(localStorage.getItem('newVal'))
        console.log(fromLocal)
        if (fromLocal) {
            setNewVal(fromLocal)
        } else {
            localStorage.setItem('newVal', '[]')
        }
        setData(JSON.parse(localStorage.getItem('newVal')))
    }, []);


    function handleSubmit(e) {
        e.preventDefault()

        if (values.length) {
            if (editIndex !== null) {
                const updateArt = [...newVal];
                updateArt[editIndex] = { ...updateArt[editIndex], value: values };
                setNewVal(updateArt);
                setData(updateArt);
                setFilter('all')

                localStorage.setItem('newVal', JSON.stringify(updateArt))
                setEditIndex(null)
            } else {
                const tempArr = [...newVal]
                console.log(tempArr);
                tempArr.push({ id: Date.now(), value: values, status: false });
               
                setNewVal(tempArr)
                setData(tempArr)
                setFilter('all')

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



    function handleEdit(id) {
        console.log(id);

        const index = newVal.findIndex(task => task.id === id);
        const editedTask = newVal[index].value;
        setValues(editedTask);
        setEditIndex(index);

        // console.log();
       
    }

    function handleDelete(index) {
        const remove = [...newVal]
        remove.splice(index, 1)
        setNewVal(remove);
        setData(remove)
        setFilter('all')
        localStorage.setItem('newVal', JSON.stringify(remove))
    }

    const handleCheckChange = (e, i) => {
        const tempArr = [...newVal]
        tempArr[i] = {
            ...tempArr[i],
            status: e.target.checked
        }
        console.log(tempArr)

        setNewVal(tempArr)
        setData(tempArr)
        setFilter('all')

        localStorage.setItem('newVal', JSON.stringify(tempArr))
    }


    const handleFilterChange = (selectedFilter) => {
        setFilter(selectedFilter);
        filterData(selectedFilter);
    };

    const filterData = (selectedFilter) => {
        switch (selectedFilter) {
            case 'all':
                setData(newVal);
                break;
            case 'done':
                setData(newVal.filter(item => item.status === true));
                break;
            case 'pending':
                setData(newVal.filter(item => item.status === false));
                break;
            default:
                setData(newVal);
        }
    };


    return (
        <>
            <div className='main'>
                <form action='' style={{ textAlign: 'center' }} onSubmit={handleSubmit}>
                    <label><h2>Add Task</h2></label>
                    <input type='text' className='task' name='values' value={values} onChange={(e) => setValues(e.target.value)} placeholder='Add To Task' />
                    <button type='submit' className='addButton' >{editIndex !== null ? 'update' : 'add'}</button>
                </form>
                <div>
                    <select value={filter} onChange={(e) => handleFilterChange(e.target.value)}>
                        <option value="all">All</option>
                        <option value="done">Done</option>
                        <option value="pending">Pending</option>
                    </select>
                    {
                        data.map((val, index) => {
                            return (
                                <div key={`task-${index}`} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    <input type='checkbox' checked={val.status} onChange={e => handleCheckChange(e, index)} />
                                    <p style={{ display: 'inline-block', marginRight: '10px', color: 'black' }}>{val.value}</p>
                                    <div className='editDeletButton'>
                                        <button onClick={() => handleEdit(val.id)}><FaEdit /></button>
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