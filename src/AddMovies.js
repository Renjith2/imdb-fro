import { Checkbox, Divider, Select, notification } from "antd";

import {axiosInstance as axios}  from "./apicalls";
import React, { useEffect, useState } from "react";
import { Form, Input, DatePicker, Button, Row, Col, Card, Modal } from "antd";
import MovieService from "./services/MovieService";

const MovieFormPage = () => {
  const [isProducerModalVisible, setIsProducerModalVisible] = useState(false);
  const [isActorModalVisible, setIsActorModalVisible] = useState(false);

  const [form] = Form.useForm();
  const [producers, Setproducers] = React.useState([]);
  const [actors, Setactors] = React.useState([]);
  const [movie,Setmovie]=React.useState([])

 

  useEffect(() => {
    // MovieService.getMovies().then
    // Fetch actors data when the component mounts
    axios
      .get("api/producers/all")
      .then((res) => {
        Setproducers(res.data);
      })
      .catch((error) => {
        console.error("Error fetching actors:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch actors data when the component mounts
    axios
      .get("api/actors/all")
      .then((res) => {
        Setactors(res.data);
      })
      .catch((error) => {
        console.error("Error fetching actors:", error);
      });
  }, []);
  // Create form instance using the useForm hook

  const showProducerModal = () => {
    setIsProducerModalVisible(true);
  };

  const showActorModal = () => {
    setIsActorModalVisible(true);
  };

  const handleProducerOk = () => {
    setIsProducerModalVisible(false);
  };

  const handleActorOk = () => {
    setIsActorModalVisible(false);
  };

  const handleCancel = () => {
    setIsProducerModalVisible(false);
    setIsActorModalVisible(false);
  };

  const handleSubmitMovies = (values) => {
    const newMovie = {
      poster: values.poster,
      title: values.title,
      plot: values.plot,
      actors: values.actors,
      producers: values.producers,
      date: values.date.format("YYYY-MM-DD"),
    };
  
   // Send the new movie data to the API endpoint
    

    axios
      .post("api/movies/add", newMovie)
      .then((response) => {
        console.log("Movie added successfully:", response.data);
        // Check if the response contains a message
        if (response.data.message) {
          // Display the message to the user
          // For example, show a notification
          notification.success({
            message: response.data.message,
          });
        }
        // Reset the form fields after successful submission
        form.resetFields();
      })
      .catch((error) => {
        console.error("Failed to add movie:", error);
        // Check if the error response contains a message
        if (error.response && error.response.data) {
          // Display the error message to the user
          // For example, show a notification
          notification.error({
            message: error.response.data,
          });
        }
      });
  };

  
  const handleSubmitActor = (values) => {
    console.log(values);
    const newActor = {
      name: values.actorName,
      gender: values.actorGender,
      date: values.actorDate,
      bio: values.actorBio,
    };

    // Send the new actor data to the API endpoint
    axios
      .post("api/actors/add", newActor)
      .then((response) => {
        console.log("Actor added successfully:", response.data);
        // Check if the response contains a message
        if (response.data.message) {
          // Display the message to the user
          // For example, show a notification
          notification.success({
            message: response.data.message,
          });
        }
        // Add the new actor to the actors array if required
        // Setactors([...actors, newActor]);
      })
      .catch((error) => {
        console.error("Failed to add actor:", error);
        // Check if the error response contains a message
        if (error.response && error.response.data) {
          // Display the error message to the user
          // For example, show a notification
          notification.error({
            message: error.response.data,
          });
        }
      });

    // Reset the form fields after submission
    form.resetFields();
  };

  const handleSubmitpro = (values) => {
    const newProducer = {
      name: values.producerName,
      gender: values.producerGender,
      date: values.producerDate,
      bio: values.producerBio,
    };

    // Send the new producer data to the API endpoint
    axios
      .post("api/producers/add", newProducer)
      .then((response) => {
        console.log("Producer added successfully:", response.data);
        // Check if the response contains a message
        if (response.data.message) {
          // Display the message to the user
          // For example, show a notification
          notification.success({
            message: response.data.message,
          });
        }
        // Add the new producer to the producers array if required
        // Setproducers([...producers, newProducer]);
      })
      .catch((error) => {
        console.error("Failed to add producer:", error);
        // Check if the error response contains a message
        if (error.response && error.response.data) {
          // Display the error message to the user
          // For example, show a notification
          notification.error({
            message: error.response.data,
          });
        }
      });

    // Reset the form fields after submission
    form.resetFields();
  };

  return (
    <div style={{ padding: "20px" }}>
      <Row justify="start">
        <Col span={12}>
          <Card style={{ width: "100%" }}>
            <Form form={form} onFinish={handleSubmitMovies} layout="vertical">
              <Form.Item name="poster" label="Poster">
                <Input />
              </Form.Item>
              <Form.Item name="title" label="Name">
                <Input />
              </Form.Item>
              <Form.Item name="plot" label="Plot">
                <Input.TextArea />
              </Form.Item>
              <Form.Item name="actors" label="Actors">
              <Select mode="multiple" placeholder="Select Actors">
                  {actors.map((actor) => (
                    <Select.Option key={actor.id} value={actor.id}>
                      {actor.name}
                    </Select.Option>
                  ))}
                </Select>
                {/* <Select
                  mode="multiple"
                  placeholder="Select Actors"
                  optionLabelProp="label"
                  dropdownRender={(menu) => (
                    <div>
                      {menu}
                      <Divider style={{ margin: "4px 0" }} />
                      <Checkbox.Group style={{ padding: "8px" }}>
                        {actors.map((actor) => (
                          <Checkbox
                            key={actor.id}
                            value={actor.id}
                            style={{ display: "block", marginBottom: "8px" }}
                          >
                            {actor.name}
                          </Checkbox>
                        ))}
                      </Checkbox.Group>
                    </div>
                  )}
                /> */}
              </Form.Item>
              <Form.Item name="producers" label="Producers">
                <select className="form-control">
                  <option value="">Select Producer</option>

                  {producers.map((data) => (
                    <option value={data.id}>{data.name}</option>
                  ))}
                </select>
              </Form.Item>
              <Form.Item name="date" label="Release Date">
                <DatePicker format="DD-MM-YYYY" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={12}>
          <div style={{ textAlign: "right" }}>
            <Button style={{ marginRight: 10 }} onClick={showProducerModal}>
              ADD PRODUCERS
            </Button>
            <Button onClick={showActorModal}>ADD ACTORS</Button>
          </div>
        </Col>
      </Row>

      <Modal
        title="Add Producer"
        visible={isProducerModalVisible}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              handleSubmitpro(values);
              handleProducerOk();
            })
            .catch((errorInfo) => {
              console.log("Validation failed:", errorInfo);
            });
        }}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="producerName" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="producerGender" label="Gender">
            <Input />
          </Form.Item>
          <Form.Item name="producerDate" label="Date">
            <DatePicker format="DD-MM-YYYY" />
          </Form.Item>
          <Form.Item name="producerBio" label="Bio">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Add Actor"
        visible={isActorModalVisible}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              handleSubmitActor(values);
              handleActorOk();
            })
            .catch((errorInfo) => {
              console.log("Validation failed:", errorInfo);
            });
        }}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="actorName" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="actorGender" label="Gender">
            <Input />
          </Form.Item>
          <Form.Item name="actorDate" label="Date">
            <DatePicker format="DD-MM-YYYY" />
          </Form.Item>
          <Form.Item name="actorBio" label="Bio">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MovieFormPage;
