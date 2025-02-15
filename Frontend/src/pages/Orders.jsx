import React, { useContext, useEffect, useState } from "react";
import "./Orders.css";
import { ShopContext } from "../context/ShopContext";
import { backendUrl } from "../App";
import axios from "axios";
import { jsPDF } from "jspdf";
const Orders = () => {
  const { token, currency, productList } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        backendUrl + "/api/order/user-orders",
        {},
        { headers: { token } }
      );
      console.log(response.data);
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;

            item["payment"] = order.payment;

            item["paymentMethod"] = order.paymentMethod;

            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {}
  };

  // const generateInvoice = (order) => {
  //   const doc = new jsPDF();

  //   // Colors - using a more modern palette
  //   const primaryColor = "#1E293B"; // Dark blue-gray
  //   const secondaryColor = "#64748B"; // Medium blue-gray
  //   const accentColor = "#3B82F6"; // Bright blue
  //   const backgroundColor = "#F8FAFC"; // Light gray-blue

  //   // Dimensions
  //   const margin = 20;
  //   const pageWidth = doc.internal.pageSize.width;
  //   const pageHeight = doc.internal.pageSize.height;
  //   const contentWidth = pageWidth - 2 * margin;

  //   // Background
  //   doc.setFillColor(backgroundColor);
  //   doc.rect(0, 0, pageWidth, pageHeight, "F");

  //   // Header
  //   doc.setFillColor(primaryColor);
  //   doc.rect(0, 0, pageWidth, 50, "F");

  //   // Company Logo/Name
  //   doc.setTextColor("#FFFFFF");
  //   doc.setFontSize(28);
  //   doc.setFont("helvetica", "bold");
  //   doc.text("ElectronicsCorp", margin, 35);

  //   // Company Details (without location)
  //   doc.setTextColor(secondaryColor);
  //   doc.setFontSize(10);
  //   doc.setFont("helvetica", "normal");
  //   const companyDetails = [
  //     "ElectronicsCorp Inc.",
  //     "Phone: (555) 123-4567",
  //     "Email: info@electronicscorp.com",
  //   ];
  //   let yPos = 70;
  //   companyDetails.forEach((line) => {
  //     doc.text(line, margin, yPos);
  //     yPos += 8;
  //   });

  //   // Customer Section
  //   yPos = 110;
  //   doc.setTextColor(primaryColor);
  //   doc.setFontSize(12);
  //   doc.setFont("helvetica", "bold");
  //   doc.text("BILLED TO:", margin, yPos);

  //   // Add customer information placeholder
  //   // Replace with actual customer data from your order object if available
  //   doc.setTextColor(secondaryColor);
  //   doc.setFontSize(10);
  //   doc.setFont("helvetica", "normal");
  //   doc.text("Customer Name", margin, yPos + 10);
  //   doc.text("customer@email.com", margin, yPos + 20);

  //   // Invoice Details Box - modern floating card style
  //   doc.setFillColor(255, 255, 255); // White background
  //   doc.roundedRect(pageWidth - 170, 70, 150, 70, 3, 3, "F");

  //   // Add subtle shadow effect
  //   doc.setDrawColor(230, 230, 230);
  //   doc.setLineWidth(0.5);
  //   doc.roundedRect(pageWidth - 170, 70, 150, 70, 3, 3, "S");

  //   // Invoice Details
  //   doc.setTextColor(primaryColor);
  //   doc.setFontSize(16);
  //   doc.setFont("helvetica", "bold");
  //   doc.text("INVOICE", pageWidth - 160, 90);

  //   doc.setFontSize(10);
  //   doc.text("Invoice Number:", pageWidth - 160, 105);
  //   doc.text("Date:", pageWidth - 160, 115);
  //   doc.text("Payment Method:", pageWidth - 160, 125);

  //   doc.setFont("helvetica", "normal");
  //   doc.text(`INV-${order._id}`, pageWidth - 80, 105);
  //   doc.text(
  //     `${new Date(order.date).toLocaleDateString()}`,
  //     pageWidth - 80,
  //     115
  //   );
  //   doc.text(`${order.paymentMethod}`, pageWidth - 80, 125);

  //   // Order Items Section Title
  //   yPos = 160;
  //   doc.setTextColor(primaryColor);
  //   doc.setFontSize(14);
  //   doc.setFont("helvetica", "bold");
  //   doc.text("Order Details", margin, yPos);

  //   // Table Headers
  //   yPos += 15;
  //   const tableHeaders = ["Item", "Quantity", "Price", "Total"];
  //   const columnWidths = [
  //     contentWidth * 0.4,
  //     contentWidth * 0.2,
  //     contentWidth * 0.2,
  //     contentWidth * 0.2,
  //   ];
  //   let xPos = margin;

  //   // Modern table header with rounded corners for first and last cells
  //   doc.setFillColor(primaryColor);

  //   // Draw rounded rectangle for header
  //   doc.roundedRect(margin, yPos, contentWidth, 12, 2, 2, "F");

  //   doc.setTextColor("#FFFFFF");
  //   doc.setFontSize(10);
  //   doc.setFont("helvetica", "bold");

  //   tableHeaders.forEach((header, index) => {
  //     const colWidth = columnWidths[index];
  //     // Center align for quantity, price and total
  //     if (index === 0) {
  //       doc.text(header, xPos + 5, yPos + 8);
  //     } else {
  //       doc.text(header, xPos + colWidth / 2, yPos + 8, { align: "center" });
  //     }
  //     xPos += colWidth;
  //   });

  //   // Table Content
  //   yPos += 20;
  //   doc.setTextColor(secondaryColor);
  //   doc.setFont("helvetica", "normal");

  //   // Zebra striping for rows
  //   doc.setFillColor(248, 250, 252); // Lighter shade of background
  //   doc.rect(margin, yPos - 6, contentWidth, 16, "F");

  //   // Item row
  //   xPos = margin;
  //   doc.text(order.name, xPos + 5, yPos);

  //   xPos += columnWidths[0];
  //   doc.text(order.quantity.toString(), xPos + columnWidths[1] / 2, yPos, {
  //     align: "center",
  //   });

  //   xPos += columnWidths[1];
  //   doc.text(`$${order.price.toFixed(2)}`, xPos + columnWidths[2] / 2, yPos, {
  //     align: "center",
  //   });

  //   xPos += columnWidths[2];
  //   doc.text(
  //     `$${(order.price * order.quantity).toFixed(2)}`,
  //     xPos + columnWidths[3] / 2,
  //     yPos,
  //     { align: "center" }
  //   );

  //   // Separator line
  //   yPos += 15;
  //   doc.setDrawColor(accentColor);
  //   doc.setLineWidth(0.5);
  //   doc.line(margin, yPos, margin + contentWidth, yPos);

  //   // Total Section - right aligned
  //   yPos += 20;
  //   const totalLabelWidth = 80;
  //   const totalValueWidth = 80;

  //   // Create total box with subtle background
  //   doc.setFillColor(248, 250, 252);
  //   doc.roundedRect(
  //     pageWidth - margin - totalLabelWidth - totalValueWidth,
  //     yPos - 10,
  //     totalLabelWidth + totalValueWidth,
  //     40,
  //     3,
  //     3,
  //     "F"
  //   );

  //   // Total row
  //   doc.setTextColor(primaryColor);
  //   doc.setFont("helvetica", "bold");
  //   doc.text(
  //     "Total Amount:",
  //     pageWidth - margin - totalValueWidth - 5,
  //     yPos + 5,
  //     { align: "right" }
  //   );

  //   doc.setTextColor(accentColor);
  //   doc.setFontSize(14);
  //   doc.text(
  //     `$${(order.price * order.quantity).toFixed(2)}`,
  //     pageWidth - margin,
  //     yPos + 5,
  //     { align: "right" }
  //   );

  //   // Thank you note
  //   yPos += 60;
  //   doc.setTextColor(primaryColor);
  //   doc.setFontSize(12);
  //   doc.setFont("helvetica", "italic");
  //   doc.text("Thank you for your business!", pageWidth / 2, yPos, {
  //     align: "center",
  //   });

  //   // Footer
  //   doc.setTextColor(secondaryColor);
  //   doc.setFontSize(8);
  //   doc.setFont("helvetica", "normal");
  //   doc.text(
  //     "ElectronicsCorp Inc. | Terms & Conditions Apply",
  //     pageWidth / 2,
  //     pageHeight - 20,
  //     { align: "center" }
  //   );

  //   // Save the PDF
  //   doc.save(`ElectronicsCorp-Invoice-${order._id}.pdf`);
  // };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>My Orders</h1>
        <p className="orders-subheader">
          Showing your {Math.min(orderData.length)} most recent orders
        </p>
      </div>

      <div className="orders-list">
        {orderData.map((item, index) => (
          <div key={index} className="order-item">
            <div className="order-image-container">
              <img
                src={item.image[0]}
                alt={item.name}
                className="order-image"
              />
              <span className="status-badge">{item.status}</span>
            </div>

            <div className="order-details">
              <div className="order-title">
                <h3>{item.name}</h3>
                <p className="order-number">Order #ORD-{item._id}</p>
              </div>

              <div className="order-info">
                <div className="info-item">
                  <span className="info-label">Price:</span>
                  <span className="info-value">
                    {currency}
                    {item.price}
                  </span>
                </div>

                <div className="info-item">
                  <span className="info-label">Quantity:</span>
                  <span className="info-value">{item.quantity}</span>
                </div>

                <div className="info-item">
                  <span className="info-label">Payment Method:</span>
                  <span className="info-value">{item.paymentMethod}</span>
                </div>

                <div className="info-item">
                  <span className="info-label">Date:</span>
                  <span className="info-value">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            {/* <button
              onClick={() => generateInvoice(item)}
              className="invoice-button"
            >
              Download Invoice
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
