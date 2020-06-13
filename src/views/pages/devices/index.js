import React, {useState, useEffect} from 'react';
import {FiTrash2, FiPlusSquare} from 'react-icons/fi';
import {Link} from 'react-router-dom';
import api from '../../services/api';

import './styles.css';
import './device.css';
import './responsive.css';

export default function Devices() {
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        let isPromisePending = true;

        api.get('devices').then(response => {
            if(isPromisePending)
              setDevices(response.data)
            },
        () => {alert(`Error: Unable to connect to the server, please refresh the page.`)});

        return () => {isPromisePending = false};
    });
    
    async function handleChange(id, value) {
        try {
            await api.post('device', {id: id, value: !value});
        } 
        catch(err) {
            alert (`Error: Unable to connect to the server, please refresh the page.`);
        }
    }

    async function handleRemove(id) {   
        try {
            await api.delete(`devices/${id}`);
        } 
        catch(err) {
            alert (`Error: Unable to connect to the server, please refresh the page.`);
        }
    }

    return (
        <div className="devices-container">
            <Link to="/create-device" className="add-btn">
                <FiPlusSquare size={30} className="add-icon" /><span> Adicionar dispositivo </span>
            </Link>
            <ul className="devices-list">
                {devices.map(devices => (
                    <li className="device" key={devices.id}>
                    <div className="device-header">
                        <strong># {devices.name}</strong>
                        <button>
                            <FiTrash2 size={30}
                            className="remove-btn"
                            onClick={() => handleRemove(devices.id)} />
                        </button>
                    </div>
                    <div className="device-body">
                        <div>
                            <strong>ID</strong>
                            <p>{devices.id}</p>
                        </div>
                        <div>
                            <strong>PIN</strong>
                            <p>{devices.pin}</p>
                        </div>
                    </div>
                    {
                        devices.type === "boolean" && 
                            <button
                            className={devices.value ? "switch-btn btn-on" : "switch-btn btn-off"}
                            onClick= {() => handleChange(devices.id, devices.value)}>
                                {devices.value ? "Ligado" : "Desligado"}
                            </button>
                    }
                    {/* Not working yet */
                    /*{
                        devices.type === "continuous" &&
                            <input type="range"
                            name="value"
                            className="value-slider"
                            value={devices.value}
                            onChange={() => handleChange(devices.id, devices.value)}
                            min="0"
                            max="100"
                            />
                    }*/
                    }

                </li>
                ))
                } 
            </ul>
        </div>
    );
}