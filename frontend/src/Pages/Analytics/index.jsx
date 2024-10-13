import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Bar,
  BarChart,
} from "recharts";
import ShadowLessCard from "../../Common/ShadowLessCard";
import "./style.scss";
import { Col, Row } from "react-bootstrap";
import { axiosSecure } from "../../api/axios";
import { userHeader } from "../../Utility/userHeader";
import Title from "../../component/Shared/Title";
const Analytics = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure.get(`/analytics/ticket-stat`, {
          headers: { Authorization: userHeader() },
        });
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // if (!data) return <div>Loading...</div>;
  return (
    <div className="analytics">
      <div className="title-bar d-flex align-items-center justify-content-between">
        <Title title="Ticket Analytics" className="m-0" />
        {/* <Link to="/ticket/create">
          <button className="common-button">Create Ticket</button>
        </Link> */}
      </div>
      <Row className="">
        <Col xl={6} className="mb-4">
          <ShadowLessCard>
            <h2 className="chart-title">Ticket Status Distribution</h2>
            <PieChart width={300} height={300}>
              <Pie
                data={data?.statusStats}
                dataKey="count"
                nameKey="_id"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {data?.statusStats.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={["#0088FE", "#00C49F", "#FFBB28"][index % 3]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ShadowLessCard>
        </Col>
        <Col xl={6} className="mb-4">
          <ShadowLessCard>
            <h2 className="chart-title">Ticket Priority Distribution</h2>

            <BarChart width={600} height={300} data={data?.priorityStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ShadowLessCard>
        </Col>
        <Col xl={6}>
          <ShadowLessCard>
            <h2 className="chart-title">Ticket Category Distribution</h2>

            <BarChart width={600} height={300} data={data?.categoryStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#ff7300" />
            </BarChart>
          </ShadowLessCard>
        </Col>
        <Col xl={6}>
          <ShadowLessCard>
            <h2 className="chart-title">Ticket Time status Distribution</h2>

            <LineChart width={600} height={300} data={data?.timeStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </ShadowLessCard>
        </Col>
      </Row>
    </div>
  );
};

export default Analytics;
