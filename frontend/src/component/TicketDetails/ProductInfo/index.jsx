import React, { useEffect, useState } from "react";
import ShadowLessCard from "../../../Common/ShadowLessCard";
import product from "../../../assests/images/features.png";
import { axiosSecure } from "../../../api/axios";
import { userHeader } from "../../../Utility/userHeader";
import { getUserDetails } from "../../../service";
import Select from "react-select";
import AssignProductModal from "../../../Common/Modal/AssignProduct";
import { toast } from "react-toastify";

const ProductInfo = ({ ticket, refresh, setRefresh }) => {
  const [availableProducts, setAvailableProducts] = useState({});
  const { userId } = getUserDetails();
  const [showAssignProduct, setShowAssignProduct] = useState(false);

  useEffect(() => {
    if (ticket) {
      fetchingAdminUsers();
    }
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
      if (response) {
        setAvailableProducts(response?.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowAssignProductModal = async () => {
    setShowAssignProduct((prevState) => !prevState);
  };

  const handleAssignProduct = async (e) => {
    try {
      const response = await axiosSecure.post(
        `/assignedProduct`,
        {
          branch: ticket?.userId?.branch || "Goa",
          user: ticket?.userId?._id,
          product: e.value,
          ticketId: ticket.uniqueId,
        },
        {
          headers: {
            Authorization: `Bearer ${
              localStorage.userDetails &&
              JSON.parse(localStorage.userDetails).token
            }`,
          },
        }
      );


      console.log({   branch: ticket?.userId?.branch || "Goa",
        user: ticket?.userId?._id,
        product: e.value,
        ticketId: ticket.uniqueId,})

      if (response) {
        setShowAssignProduct((prevState) => !prevState);
        setRefresh((prevState) => !prevState);
        toast.success("Product assigned successfully");
      }
    } catch (error) {
      console.error(error);
    }
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
                {availableProducts?.count > 0 ? (
                  <>
                    {ticket?.ticketStatus === "Resolve" ? (
                      <span className="in-stock stock">Assigned</span>
                    ) : (
                      <span className="in-stock stock">In stock</span>
                    )}
                  </>
                ) : ticket?.ticketStatus === "Resolve" ? (
                  <span className="in-stock stock">Assigned</span>
                ) : (
                  <span className="stock-out stock">Stock out</span>
                )}
              </div>
            </div>
          </div>
          {availableProducts?.stock && ticket?.assignTo?._id === userId ? (
            <>
              {!showAssignProduct ? (
                <button onClick={handleShowAssignProductModal}>
                  Assign product
                </button>
              ) : (
                <></>
              )}
                 
            </>
          ) : (
            <></>
          )}
        </div>
        {availableProducts?.stock && ticket?.assignTo?._id === userId ? (
          showAssignProduct && (
            <AssignProductModal
              title="Select product"
              show={showAssignProduct}
              // handleAction={}
              handleClose={() => setShowAssignProduct(false)}
            >
              <Select
                className="basic-single"
                classNamePrefix="select"
                isSearchable={true}
                onChange={(e) => handleAssignProduct(e)}
                name="color"
                options={availableProducts?.product}
              />
            </AssignProductModal>
          )
        ) : (
          <></>
        )}
      </div>
    </ShadowLessCard>
  );
};

export default ProductInfo;
