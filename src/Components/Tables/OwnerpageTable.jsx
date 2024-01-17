import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OwnerpageTable = () => {
  const apiHostname = process.env.REACT_APP_API_HOSTNAME;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make multiple requests in parallel using axios.all
        const [invoiceResponse, orderResponse, establishmentResponse] = await axios.all([
          axios.get(`${apiHostname}/invoice/`),
          axios.get(`${apiHostname}/order/`),
          axios.get(`${apiHostname}/establishment/`),
        ]);

        // Create a map to associate orders with establishments
        const orderEstablishmentMap = new Map();
        establishmentResponse.data.forEach((establishment) => {
          orderEstablishmentMap.set(establishment.id, establishment);
        });

        // Organize data by establishment
        const organizedData = [];
        invoiceResponse.data.forEach((invoice) => {
          const order = orderResponse.data.find((order) => order.id === invoice.order);
          const establishment = orderEstablishmentMap.get(order.establishment);

          if (establishment) {
            let establishmentData = organizedData.find((data) => data.establishment.id === establishment.id);

            if (!establishmentData) {
              establishmentData = {
                establishment: establishment,
                latestInvoiceDate: null,
                totals: {
                  quantity_delivered: 0,
                  amount_paid: 0,
                  balance: 0,
                  discount: 0,
                  amountOfLastDelivery: 0,
                  undelivered: 0, // New property for undelivered quantity
                },
              };
              organizedData.push(establishmentData);
            }
            
            // Calculate undelivered
            const order = orderResponse.data.find((order) => order.id === invoice.order);
            
            if (order) {
              console.log("Order found")
              console.log(order)
              const reservedQuantity = parseInt(order.reserved_quantity, 10);
              const quantitySold = parseInt(order.quantity_sold, 10);
              console.log("Order Details found")
              console.log( reservedQuantity)
              console.log( quantitySold)
              establishmentData.totals.undelivered += (reservedQuantity - (Number(quantitySold)));
            }
            
            

            establishmentData.invoices = [
              ...(establishmentData.invoices || []),
              {
                ...invoice,
                order: order, // Attach the order details to the invoice
              },
            ];

            // Calculate totals
            establishmentData.totals.quantity_delivered += invoice.quantity_delivered;
            establishmentData.totals.amount_paid += invoice.amount_paid;
            establishmentData.totals.balance += invoice.balance;
            establishmentData.totals.discount += invoice.discount;

            

            

            // Update latest invoice date and calculate amount of last delivery
            const invoiceDate = new Date(invoice.created);
            if (!establishmentData.latestInvoiceDate || invoiceDate > establishmentData.latestInvoiceDate) {
              establishmentData.latestInvoiceDate = invoiceDate;
              establishmentData.totals.amountOfLastDelivery = invoice.amount_paid;
            }
          }
        });

        

        // Use the organized data as needed
        setData(organizedData);
        console.log("organizedData");
        console.log(organizedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Polling every 5 seconds to update data
    const intervalId = setInterval(fetchData, 5000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [apiHostname]); // Empty dependency array to run effect only once on mount

  return (
    <div className="table-responsive">
      <table className="table text-center">
        <thead>
          <tr className="text-center">
            <th>Cliente</th>
            <th>Last Delivery Date</th>
            <th>Total Delivered</th>
            <th>Amount of Last Delivery</th>
            <th>Amount Paid</th>
            <th>Balance</th>
            <th>Undelivered</th>
          </tr>
        </thead>
        <tbody>
          {data.map((establishmentData) => (
            <tr key={establishmentData.establishment.id}>
              <td>{establishmentData.establishment.name}</td>
              <td>{establishmentData.latestInvoiceDate ? establishmentData.latestInvoiceDate.toLocaleDateString() : '-'}</td>
              <td>{establishmentData.totals.quantity_delivered}</td>
              <td>{establishmentData.totals.amountOfLastDelivery}</td>
              <td>{establishmentData.totals.amount_paid}</td>
              <td>{establishmentData.totals.balance}</td>
              <td>{establishmentData.totals.undelivered}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OwnerpageTable;
