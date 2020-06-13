import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiX} from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';


export default function Create() {
    const [name, setName] = useState('');
    const [type, setType] = useState('boolean');
    const [pin, setPin] = useState(1);
    const value = 0;
    const history = useHistory();

    async function handleCreateDevice(e) {    
        e.preventDefault();
        
        const data = {
            "name": name,
            "type": type,
            "pin": pin,
            "value": value
        } 

        try {
            await api.post('devices', data);
            history.push('/');
        }
        catch(err) {
            alert(`Error: Device not created.`);
        }
    }
    return (
        <div className="form-container">
            <form onSubmit={handleCreateDevice}>
                <div className="form-header">
                    <h1>Adicionar dispositivo</h1>
                    <Link to="/devices" className="back-btn">
                        <FiX size={30}/>
                    </Link>
                </div>
                <label htmlFor="device-name">Nome do dispositivo</label>
                <input name="device-name"
                value={name}
                onChange= {e =>setName(e.target.value)}
                type="text"
                placeholder="Nome do dispositivo"
                required/>

                <label htmlFor="device-type">Tipo do dispositivo</label>
                <select name="device-type" value={type} onChange={e => setType(e.target.value)}  required>
                    <option value="boolean">Boolean</option>
                    <option value="continuous">Continuous</option>
                </select>

                <label htmlFor="device-pin">Pino (Pin)</label>
                <input id="pin"
                name="device-pin"
                value={pin}
                onChange={e =>setPin(e.target.value)}
                type="number"
                min="5"
                max="9"
                placeholder="Pino" required/>

                <button type="submit">Criar dispositivo</button>
            </form>
        </div>
    );
};
