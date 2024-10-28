import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PincodeFetcher = () => {
    const [pincode, setPincode] = useState('');
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    const fetchPincodeData = async () => {
        if (!pincode) {
            setError('Please enter a pincode.');
            return;
        }

        try {
            const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
            const result = await response.json();

            if (result[0].Status === "Success") {
                setData(result[0].PostOffice);
                setError('');
            } else {
                setData([]);
                setError('Invalid pincode. Please try again.');
            }
        } catch (err) {
            setData([]);
            setError('Error fetching data. Please try again later.');
        }
    };

    return (
        
        <div>
            <h1>Pincode Fetcher</h1>
            <input
                type="text"
                placeholder="Enter Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
            />
            <button onClick={fetchPincodeData}>Fetch Data</button>
            {error && <p className="error">{error}</p>}
            {data.length > 0 && (
                <ul>
                    {data.map((office) => (
                        <li key={office.Name}>
                            {office.Name}, {office.District}, {office.State}
                        </li>
                    ))}
                </ul>
            )}
            <button className='demo'><Link className='demo' to={'/drawing'}>Drawing</Link></button><br />            
            <button className='demo'><Link className='demo' to={'/qrcode'}>QRCodeGenerator</Link></button><br />
            <button className='demo'><Link className='demo'to={'/ocr'}>OCRComonent</Link></button><br />
            <button className='demo'><Link className='demo'to={'/document-writer'}>DocumentWriter</Link></button><br />
        </div>
    );
};

export default PincodeFetcher;
