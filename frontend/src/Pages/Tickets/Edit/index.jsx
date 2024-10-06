import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import InputField from "../../../component/Shared/Form/Input";
import SelectField from "../../../component/Shared/Form/Select";
import { ticketPriorities } from "../utils/ticketPriorities";
import { ticketStatus } from "../utils/ticketStatus";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { userHeader } from "../../../Utility/userHeader";
import { axiosSecure } from "../../../api/axios";
import Title from "../../../component/Shared/Title";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./style.scss";

const TicketEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const schema = yup.object().shape({
    ticketName: yup.string().required("Ticket name is required"),
    ticketCategory: yup.string().required("Ticket category is required"),
    ticketStatus: yup.string().required("Ticket status is required"),
    ticketPriority: yup.string().required("Ticket priority is required"),
    ticketDetails: yup.string().required("Ticket details are required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fetchingSingleTicket = async () => {
    try {
      const response = await axiosSecure.get(`/ticket/${id}`, {
        headers: {
          Authorization: userHeader(),
        },
      });
      setTicket(response?.data);

      reset(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchingSingleTicket();
  }, []);

  const onSubmit = async (values) => {
    try {
      const response = await axiosSecure.put(
        `/ticket/${id}`,
        {
          ticketName: values.ticketName,
          ticketCategory: values.ticketCategory,
          ticketStatus: values.ticketStatus,
          ticketPriority: values.ticketPriority,
          ticketDetails: values.ticketDetails,
        },
        {
          headers: {
            Authorization: userHeader(),
          },
        }
      );

      if (response) {
        toast.success("Ticket is updated!");
        navigate("/ticket");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Row className="wrapper">
      <Col xl={12}>
        <Title
          title="Create a new ticket"
          className="mt-2 mb-4 text-center fw-bold"
        />
      </Col>
      <Row>
        <Col xl={12}>
          {ticket ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col xl={6}>
                  <InputField
                    label="Ticket Name"
                    control={control}
                    name="ticketName"
                    placeholder="Enter ticket name"
                    error={errors.ticketName}
                  />
                </Col>
                <Col xl={6}>
                  <InputField
                    label="Ticket Category"
                    control={control}
                    name="ticketCategory"
                    placeholder="Enter category"
                    error={errors.ticketCategory}
                  />
                </Col>
              </Row>
              <Row>
                <Col xl={6}>
                  <SelectField
                    label="Ticket Status"
                    control={control}
                    name="ticketStatus"
                    options={ticketStatus}
                    error={errors.ticketStatus}
                  />
                </Col>
                <Col xl={6}>
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
                <Col xl={12} className="position-relative">
                  <Controller
                    name="ticketDetails"
                    control={control}
                    render={({ field }) => (
                      <ReactQuill
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Describe your problems"
                        className={`${
                          errors.ticketDetails ? "border-danger" : ""
                        }`}
                        style={{ height: "200px" }}
                      />
                    )}
                  />
                  {errors.ticketDetails && (
                    <div className="error-message mt-5 text-danger position-absolute">
                      {errors.ticketDetails.message}
                    </div>
                  )}
                </Col>
              </Row>
              <Row className="mt-5">
                <Col xl={12} className="mt-5 text-center">
                  <Button style={{ width: "150px" }} type="submit">
                    Submit
                  </Button>
                </Col>
              </Row>
            </form>
          ) : (
            <p>Loading...</p>
          )}
        </Col>
      </Row>
    </Row>
  );
};

export default TicketEdit;
