import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import BasicModal from "./Modal";

const BasicTable = ({ header, data }) => {
  const headerProps = header.map((h) => h.toLocaleLowerCase());

  const [openModal, setOpenModal] = useState(false);
  const renderLine = () => {
    return (
      data &&
      data.map((data, index) => (
        <tr key={index}>
          {headerProps &&
            headerProps.map((headerTitle, hIndex) => (
              <td key={hIndex} onClick={() => setOpenModal(true)}>
                {data[headerTitle]}
              </td>
            ))}
        </tr>
      ))
    );
  };

  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>{header && header.map((th, i) => <th key={i}>{th}</th>)}</tr>
      </thead>
      <tbody>{renderLine()}</tbody>
    </Table>
  );
};
export default BasicTable;
