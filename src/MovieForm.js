

import React, { useEffect, useState } from 'react';
import { Button, Form } from 'antd';
import axios from 'axios';

// Separate component for fetching actors
function ActorSelect({ actors }) {
    return (
        <select className="form-control">
            <option value="">Select Actor</option>
            {actors.map(actor => (
                <option key={actor.id} value={actor.id}>
                    {actor.name}
                </option>
            ))}
        </select>
    );
}

function MovieForm() {
    const [actors, setActors] = useState([]);

    useEffect(() => {
        // Fetch actors data when the component mounts
        axios.get('http://localhost:8080/api/movie/actors')
            .then(res => {
                setActors(res.data);
            })
            .catch(error => {
                console.error('Error fetching actors:', error);
            });
    }, []);

    return (
        <div>
            <h1>Add New Movie</h1>
            <Form layout="vertical">
                <Form.Item label="Movie Name" name="title">
                    <input className="form-control" type='text' />
                </Form.Item>
                <Form.Item label="Movie Plot" name="plot">
                    <textarea className="form-control" rows="3" />
                </Form.Item>
                <Form.Item label="Actors" name="actors">
                    <ActorSelect actors={actors} />
                </Form.Item>
                <Form.Item label="Producers" name="producers">
                    <textarea className="form-control" rows="3" />
                </Form.Item>
                <Form.Item label="Release Date" name="date">
                    <input className="form-control" type="date" />
                </Form.Item>
                <Form.Item label="Poster URL" name="poster">
                    <input className="form-control" type="text" />
                </Form.Item>
                <div className="d-flex justify-content-between">
                    <Button type='button'>Cancel</Button>
                    <Button type='submit'>Save</Button>
                </div>
            </Form>
        </div>
    );
}

export default MovieForm;
