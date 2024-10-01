import { Formik } from "formik";
import React from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import * as yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const TicketAdd = () => {
  const schema = yup.object().shape({
    ticketName: yup.string().required("Ticket name is required"),
    ticketCategory: yup.string().required("Ticket category is required"),
    ticketStatus: yup.string().required("Ticket status is required"),
    ticketPriority: yup.string().required("Ticket priority is required"),
    ticketDetails: yup.string().required("Ticket details is required"),
  });

  const initialValues = {
    ticketName: "",
    ticketCategory: "",
    ticketStatus: "",
    ticketPriority: "",
    ticketDetails: "",
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log(values);
  };

  return (
    <Row className="m-3">
      <Col xl={12}>
        <h4 className="fs-5 mb-4">Ticket info</h4>
        <hr />
      </Col>
      <Row>
        <Col xl={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={handleSubmit}
          >
            {({
              handleSubmit,
              errors,
              values,
              handleChange,
              touched,
              setFieldValue,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col xl={6}>
                    <FloatingLabel className="mb-2" label="Ticket Name">
                      <Form.Control
                        type="text"
                        name="ticketName"
                        placeholder="Ticket Name"
                        value={values.ticketName}
                        onChange={handleChange}
                        isInvalid={touched.ticketName && !!errors.ticketName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.ticketName}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Col>
                  <Col xl={6}>
                    <FloatingLabel className="mb-3" label="Category">
                      <Form.Select
                        type="text"
                        name="ticketCategory"
                        value={values.ticketCategory}
                        onChange={handleChange}
                        isInvalid={
                          !!touched.ticketCategory && !!errors.ticketCategory
                        }
                        aria-label="Default select example"
                      >
                        <option value="" disabled hidden>
                          select
                        </option>
                        <option value="Mouse">Mouse</option>
                        <option value="Monitor">Monitor</option>
                        <option value="Headphone">Headphone</option>
                        <option value="Keyboard">Keyboard</option>
                        <option value="USBDongle">USB Dongle</option>
                      </Form.Select>
                      <div className="invalid-feedback">
                        {touched.ticketCategory && errors.ticketCategory}
                      </div>
                    </FloatingLabel>
                  </Col>
                </Row>
                <Row>
                  <Col xl={6}>
                    <FloatingLabel className="mb-3" label="Status">
                      <Form.Select
                        type="text"
                        name="ticketStatus"
                        value={values.ticketStatus}
                        onChange={handleChange}
                        isInvalid={
                          !!touched.ticketStatus && !!errors.ticketStatus
                        }
                        aria-label="Default select example"
                      >
                        <option value="" disabled hidden>
                          select
                        </option>
                        <option value="New Ticket">New Ticket</option>
                        <option value="In progress">In progress</option>
                        <option value="On hold">On hold</option>
                        <option value="Close">Close</option>
                        <option value="Resolve">Resolve</option>
                      </Form.Select>
                      <div className="invalid-feedback">
                        {touched.ticketStatus && errors.ticketStatus}
                      </div>
                    </FloatingLabel>
                  </Col>
                  <Col xl={6}>
                    <FloatingLabel className="mb-3" label="Priority">
                      <Form.Select
                        type="text"
                        name="ticketPriority"
                        value={values.ticketPriority}
                        onChange={handleChange}
                        isInvalid={
                          !!touched.ticketPriority && !!errors.ticketPriority
                        }
                        aria-label="Default select example"
                      >
                        <option value="" disabled hidden>
                          select
                        </option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </Form.Select>
                      <div className="invalid-feedback">
                        {touched.ticketPriority && errors.ticketPriority}
                      </div>
                    </FloatingLabel>
                  </Col>
                </Row>
                <Row>
                  <Col xl={12}>
                    <FloatingLabel className="mb-3" label="">
                      <ReactQuill
                        value={values.ticketDetails}
                        placeholder="Describe your problems"
                        onChange={(content) =>
                          setFieldValue("ticketDetails", content)
                        }
                        style={{ height: "200px" }}
                      />
                      <div className="invalid-feedback">
                        {touched.ticketDetails && errors.ticketDetails}
                      </div>
                    </FloatingLabel>
                  </Col>
                </Row>
                <Row>
                  <Col xl={12} className="mt-5">
                    <Button style={{ width: "150px" }} type="submit">
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Row>
  );
};

export default TicketAdd;
