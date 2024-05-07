import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'antd';
import moment from 'moment';
import axios from 'axios';
import MovieForm from './MovieForm'; // Assuming MovieForm is in a separate file

function MoviePage() {
    const [actor, setActor] = useState([]);

    useEffect(() => {
        // Fetch actors data when the component mounts
        axios.get('http://localhost:8080/api/movie/actors')
            .then(res => {
                setActor(res.data);
            })
            .catch(error => {
                console.error('Error fetching actors:', error);
            });
    }, []);

    return (
        <div>
            <h1>Add New Movie</h1>
            <MovieForm actors={actor} />
        </div>
    );
}

export default MoviePage;
