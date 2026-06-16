import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Style3.css";

const BillingPage = () => {

  const navigate = useNavigate();

  const [customer, setCustomer] =
    useState("");

  const [project, setProject] =
    useState("");

  const [items, setItems] =
    useState([
      {
        description: "",
        quantity: 0,
        price: 0,
      },
    ]);

  // ADD ITEM
  const addItem = () => {

    setItems([
      ...items,
      {
        description: "",
        quantity: 0,
        price: 0,
      },
    ]);
  };

  // REMOVE ITEM
  const removeItem = (index) => {

    if (items.length === 1) return;

    const updatedItems =
      items.filter(
        (_, i) => i !== index
      );

    setItems(updatedItems);
  };

  // HANDLE CHANGE
  const handleChange = (
    index,
    field,
    value
  ) => {

    const updatedItems =
      [...items];

    updatedItems[index][field] =
      value;

    setItems(updatedItems);
  };

  // GRAND TOTAL
  const total =
    items.reduce(
      (acc, item) =>
        acc +
        item.quantity *
        item.price,
      0
    );

  // PRINT BILL
  const handlePrint = () => {

    const customerName =
      customer.trim() ||
      "Construction-Bill";

    document.title =
      customerName;

    window.print();
  };

  return (

    <div className="billing-page">

      <div className="billing-card">

        {/* BACK BUTTON */}

        <button
          className="back-btn no-print"
          onClick={() =>
            navigate("/admin")
          }
        >
          ⬅ Back Dashboard
        </button>

        <h1>
          🧾 Construction Billing
        </h1>

        {/* CUSTOMER DETAILS */}

        <div className="top-fields">

          <input
            type="text"
            placeholder="Customer Name"
            value={customer}
            onChange={(e) =>
              setCustomer(
                e.target.value
              )
            }
          />

          <input
            type="text"
            placeholder="Project Name"
            value={project}
            onChange={(e) =>
              setProject(
                e.target.value
              )
            }
          />

        </div>

        {/* TABLE */}

        <table>

          <thead>

            <tr>

              <th>Description</th>

              <th>
                Sq Ft / Running Ft
              </th>

              <th>Price</th>

              <th>Total</th>

              <th className="no-print">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {items.map(
              (
                item,
                index
              ) => (

                <tr key={index}>

                  <td>

                    <input
                      type="text"
                      placeholder="Material / Service"
                      value={
                        item.description
                      }
                      onChange={(e) =>
                        handleChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                    />

                  </td>

                  <td>

                    <input
                      type="text"
                      inputMode="decimal"
                      placeholder="0.00"
                      className="decimal-input"
                      value={
                        item.quantity
                      }
                      onChange={(e) =>
                        handleChange(
                          index,
                          "quantity",
                          parseFloat(
                            e.target.value
                          ) || 0
                        )
                      }
                    />

                  </td>

                  <td>

                    <input
                      type="text"
                      inputMode="decimal"
                      placeholder="0.00"
                      className="decimal-input"
                      value={
                        item.price
                      }
                      onChange={(e) =>
                        handleChange(
                          index,
                          "price",
                          parseFloat(
                            e.target.value
                          ) || 0
                        )
                      }
                    />

                  </td>

                  <td>
                    ₹
                    {(
                      item.quantity *
                      item.price
                    ).toFixed(2)}
                  </td>

                  <td className="no-print">

                    <button
                      className="remove-btn"
                      onClick={() =>
                        removeItem(
                          index
                        )
                      }
                      disabled={
                        items.length ===
                        1
                      }
                    >
                      ❌ Remove
                    </button>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

        {/* BUTTONS */}

        <div className="billing-actions no-print">

          <button
            onClick={addItem}
          >
            ➕ Add Item
          </button>

          <button
            onClick={handlePrint}
          >
            🖨 Print Bill
          </button>

        </div>

        {/* TOTAL */}

        <div className="grand-total">

          Grand Total :

          <span>
            ₹
            {total.toFixed(
              2
            )}
          </span>

        </div>

      </div>

    </div>
  );
};

export default BillingPage;