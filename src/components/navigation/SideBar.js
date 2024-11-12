import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../components.css';
import './navigation.css';
import Activity from '../Activity';

const SideBar = () => {
    const [selected, setSelected] = useState('home');
    const [activities, setActivities] = useState([]);
    const [showActivities, setShowActivities] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState(null); // State to store API error messages

    const navigate = useNavigate();

    const setPage = (pageName) => {
        setSelected(pageName);
        switch (pageName) {
            case 'home':
                navigate('/home');
                setShowActivities(false);
                break;
            case 'favorites':
                navigate('/favorites');
                setShowActivities(false);
                break;
            case 'watchlater':
                navigate('/watchlater');
                setShowActivities(false);
                break;
            case 'activity':
                setShowActivities(!showActivities);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        axios.get('/api/activity')
            .then(response => {
                setActivities(response.data);
                setError(null); // Clear any previous errors
            })
            .catch(error => {
                console.error('Error fetching activities:', error);
                setError('Failed to load activities');
            });
    }, []);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button className="hamburger" onClick={toggleSidebar}>
                &#9776;
            </button>
            {isOpen && (
                <nav className="sidebar">
                    <ul className="sidebar-list">
                        <li onClick={() => setPage('home')} className={selected === 'home' ? 'selected' : ''}>
                            <span className="icon">🏠</span> Home
                        </li>
                        <li onClick={() => setPage('favorites')} className={selected === 'favorites' ? 'selected' : ''}>
                            <span className="icon">⭐</span> Favorites
                        </li>
                        <li onClick={() => setPage('watchlater')} className={selected === 'watchlater' ? 'selected' : ''}>
                            <span className="icon">🕒</span> Watch Later
                        </li>
                        <li onClick={() => setPage('activity')} className={selected === 'activity' ? 'selected' : ''}>
                            <span className="icon">📋</span> Activity
                        </li>
                    </ul>

                    {showActivities && (
                        <ul className="activity-list">
                            {error ? (
                                <p>{error}</p>
                            ) : activities.length > 0 ? (
                                activities.slice(0, 10).map((activity, index) => (
                                    <Activity key={index} activity={activity} />
                                ))
                            ) : (
                                <p>No activities found</p>
                            )}
                        </ul>
                    )}
                </nav>
            )}
        </div>
    );
};

export default SideBar;
