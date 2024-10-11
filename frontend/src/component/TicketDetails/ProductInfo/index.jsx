import React, { useEffect, useState } from "react";
import ShadowLessCard from "../../../Common/ShadowLessCard";
import product from "../../../assests/images/features.png";
import { axiosSecure } from "../../../api/axios";
import { userHeader } from "../../../Utility/userHeader";
import { getUserDetails } from "../../../service";
import { useNavigate } from "react-router-dom";
const ProductInfo = ({ ticket }) => {
  const [isAvailable, setIsAvailable] = useState(false);
  const { userId } = getUserDetails();
  const navigate = useNavigate();
  useEffect(() => {
    if (ticket) {
      fetchingAdminUsers();
    }
  }, [ticket]);

  useEffect(() => {
    console.log(ticket);
  }, [ticket]);

  const fetchingAdminUsers = async () => {
    try {
      const response = await axiosSecure.get(
        `/product/checking-product-quantity/${ticket?.ticketCategory}`,
        {
          headers: {
            Authorization: userHeader(),
          },
        }
      );
      setIsAvailable(response?.data?.stock);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAssignProduct = async () => {
    navigate('/')
  };
  return (
    <ShadowLessCard>
      <div className="product-info">
        <h4 className="title">Product Info</h4>

        <div className="info-wrapper">
          <div className="details">
            <img src={product} width={40} alt="" />
            <div className="info">
              <h5 className="category">{ticket?.ticketCategory}</h5>
              <div className="available">
                {isAvailable ? (
                  <span className="in-stock stock">In stock</span>
                ) : (
                  <span className="stock-out stock">Stock out</span>
                )}
              </div>
            </div>
          </div>
          {isAvailable && ticket?.assignTo === userId && (
            <button onClick={handleAssignProduct}>Assign product</button>
          )}
        </div>
      </div>
    </ShadowLessCard>
  );
};

export default ProductInfo;
