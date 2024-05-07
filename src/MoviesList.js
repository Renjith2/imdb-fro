import React, { useEffect } from "react";
import { Button, message, Table } from "antd";
import moment from "moment";
import MovieForm from "./MovieForm";
import axios from "axios";

function MoviesList() {
  const [movies, Setmovies] = React.useState([]);
  useEffect(() => {
    // MovieService.getMovies().then
    // Fetch actors data when the component mounts
    var moviePromise=axios
      .get("http://localhost:8080/api/movies/all");
      moviePromise.then((res) => {
     Setmovies(res.data.movies)
        console.log(movies)  
      })
      .catch((error) => {
        console.error("Error fetching actors:", error);
      });
  }, []);
 

  const columns = [
    {
      title: "Poster",
      dataIndex: "poster",
      render: (text, record) => {
        return <img src={record.poster} alt="poster" height="60" width="80" />;
      },
    },
    {
      title: "Name",
      dataIndex: "title",
    },
    {
      title: "Plot",
      dataIndex: "plot",
    },
    { title: "Actors", dataIndex: "actors" },
    { title: "Producers", dataIndex: "producers" },
    {
      title: "Release Date",
      dataIndex: "date",
      render: (text, record) => {
        return moment(record.date).format("DD-MM-YYYY");
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="d-flex gap-1">
            <div className="btn btn-danger">
              <i className="ri-delete-bin-line"></i> Delete
            </div>
            <div className="btn btn-primary">
              <i className="ri-pencil-line"></i> Edit
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={movies} />
    </div>
  );
}

export default MoviesList;
