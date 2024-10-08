import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import * as yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { axiosSecure } from "../../../api/axios";
import { userHeader } from "../../../Utility/userHeader";
import InputField from "../../../component/Shared/Form/Input";
import { Controller, useForm } from "react-hook-form";
import SelectField from "../../../component/Shared/Form/Select";
import { ticketStatus } from "../utils/ticketStatus";
import { ticketPriorities } from "../utils/ticketPriorities";
import { yupResolver } from "@hookform/resolvers/yup";
import Title from "../../../component/Shared/Title";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./style.scss";
import TextAreaField from "../../../component/Shared/Form/TextArea";
import { ticketCategories } from "../utils/ticketCategories";

const TicketAdd = () => {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    ticketName: yup.string().required("Ticket name is required"),
    ticketCategory: yup.string().required("Ticket category is required"),
    ticketPriority: yup.string().required("Ticket priority is required"),
    ticketDetails: yup.string().required("Ticket details are required"),
  });

  const initialValues = {
    ticketName: "",
    ticketCategory: "",
    ticketPriority: "",
    ticketDetails: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const onSubmit = async (values) => {
    try {
      const res = await axiosSecure.post(
        `/ticket`,
        {
          ticketName: values.ticketName,
          ticketCategory: values.ticketCategory,
          ticketPriority: values.ticketPriority,
          ticketDetails: values.ticketDetails,
        },
        {
          headers: {
            Authorization: userHeader(),
          },
        }
      );

      if (res) {
        toast.success("Ticket created successfully!");
        navigate("/ticket");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add-ticket">
      <Row className="wrapper">
        <Col xl={12}>
          <Title
            title="Create a new ticket"
            className="mt-2 mb-4 text-center fw-bold"
          />
        </Col>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col xl={12}>
              <InputField
                label="Ticket Name"
                control={control}
                name="ticketName"
                placeholder="Enter ticket name"
                error={errors.ticketName}
              />
            </Col>
            <Col xl={12}>
              <SelectField
                label="Ticket Category"
                control={control}
                name="ticketCategory"
                options={ticketCategories}
                error={errors.ticketCategory}
              />
            </Col>
          </Row>
          <Row>
            <Col xl={12}>
              <SelectField
                label="Ticket Priority"
                control={control}
                name="ticketPriority"
                options={ticketPriorities}
                error={errors.ticketPriority}
              />
            </Col>
          </Row>
          <Row>
            <Col xl={12}>
              <TextAreaField
                label="Ticket Details"
                control={control}
                name="ticketDetails"
                error={errors.ticketDetails}
                cols={10}
                rows={6}
              />
            </Col>
          </Row>
          <Row className="mt-1">
            <Col xl={12} className="text-center pb-2">
              <button
                className="common-button"
                style={{ width: "150px" }}
                type="submit"
              >
                Submit
              </button>
            </Col>
          </Row>
        </Form>
      </Row>
    </div>
  );
};

export default TicketAdd;
