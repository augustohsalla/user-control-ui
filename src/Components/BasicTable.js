import { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BasicModal from "./Modal";

const ActionLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
`;

const BasicTable = ({ header, data, deleteMethod }) => {
  const headerProps = header.map((h) => h.toLocaleLowerCase());

  const [openModal, setOpenModal] = useState(false);
  const handleDelete = (data) => {
    deleteMethod(data);
  };
  const renderLine = () => {
    return (
      data &&
      data.map((data, index) => (
        <tr key={index}>
          {headerProps &&
            headerProps.map((headerTitle, hIndex) => {
              const showActions = headerTitle.toLocaleLowerCase() === "actions";
              return showActions ? (
                <td>
                  <ActionLink
                    href={`/edit-user/${data.username}`}
                    to={`/edit-user/${data.username}`}
                    state={data}
                  >
                    ✏️
                  </ActionLink>
                  <ActionLink onClick={() => handleDelete(data.username)}>
                    ❌
                  </ActionLink>
                </td>
              ) : (
                <td key={hIndex} onClick={() => setOpenModal(true)}>
                  {data[headerTitle]}
                </td>
              );
            })}
        </tr>
      ))
    );
  };

  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>{header && header.map((th, i) => <th key={i}>{th}</th>)}</tr>
      </thead>
      <tbody>
        {data && data.length > 0 ? (
          renderLine()
        ) : (
          <tr>
            <td>Sorry, Couldn't find any user with that propertie value</td>
            {header && header.slice(0, header.length - 1).map(() => <td />)}
          </tr>
        )}
      </tbody>
    </Table>
  );
};
export default BasicTable;
