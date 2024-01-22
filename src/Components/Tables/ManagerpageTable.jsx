import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManagerpageTable({ establishmentId }) {
  const apiHostname = process.env.REACT_APP_API_HOSTNAME;
  const [data, setData] = useState([]);

  // ... (your existing code)

useEffect(() => {
    const fetchData = async () => {
      try {
        // Make multiple requests in parallel using axios.all
        const [invoiceResponse, orderResponse, establishmentResponse] = await axios.all([
          axios.get(`${apiHostname}/invoice/`),
          axios.get(`${apiHostname}/order/`),
          axios.get(`${apiHostname}/establishment/${establishmentId}`),
        ]);
  
        // Extract single establishment from the response
        const singleEstablishment = establishmentResponse.data;
  
        // Group orders by establishment
        const ordersByEstablishment = {};
        orderResponse.data.forEach((order) => {
          if (order.establishment === singleEstablishment.id) {
            if (!ordersByEstablishment[singleEstablishment.id]) {
              ordersByEstablishment[singleEstablishment.id] = [];
            }
            ordersByEstablishment[singleEstablishment.id].push(order);
          }
        });
  
        // Group invoices by order and then by establishment
        const invoicesByEstablishment = {};
        invoiceResponse.data.forEach((invoice) => {
          const order = ordersByEstablishment[invoice.order];
          if (order && order[0].establishment === singleEstablishment.id) {
            if (!invoicesByEstablishment[singleEstablishment.id]) {
              invoicesByEstablishment[singleEstablishment.id] = [];
            }
            invoicesByEstablishment[singleEstablishment.id].push({
              invoice,
              order,
            });
          }
        });
  
        // Organize data by establishment
        const organizedData = Object.keys(invoicesByEstablishment).map((establishmentId) => {
          const establishmentData = {
            establishment: singleEstablishment,
            invoices: invoicesByEstablishment[establishmentId],
          };
  
          // Calculate totals and latestInvoiceDate here if needed
  
          return establishmentData;
        });
  
        // Use the organized data as needed
        setData(organizedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  
    // Polling every 5 seconds to update data
    const intervalId = setInterval(fetchData, 5000);
  
    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [apiHostname, establishmentId]); // Empty dependency array to run effect only once on mount
  
  
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    <div className="table-responsive">
      <table className="table text-center">
        <thead>
          <tr className="text-center">
            <th>Fecha</th>
            <th>Serie</th>
            <th>Cantidad entregada</th>
            <th>Cantidad pagada</th>
            <th>diferencial </th>
            <th>Descuento</th>
            <th>Confirmación</th>
          </tr>
        </thead>
        <tbody>
          {data.map((establishmentData) =>
            establishmentData.invoices.map((invoice, index) => (
              <tr key={index}>
                <td>{formatDate(invoice.invoice.created)}</td>
                <td>{invoice.invoice.series}</td>
                <td>{invoice.invoice.quantity_delivered}</td>
                <td>{invoice.invoice.amount_paid}</td>
                <td>{invoice.invoice.balance}</td>
                <td>{invoice.invoice.discount}</td>
                <td>{invoice.invoice.confirmed}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerpageTable;
