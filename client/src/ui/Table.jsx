import { createContext, useContext } from "react";

const TableContext = createContext();
const Table = ({ children, className }) => {
  return (
    <TableContext.Provider value={{}}>
      <table className={className}>{children}</table>
    </TableContext.Provider>
  );
};
function Header({ columns, trClassName, headerClassName, thClassName }) {
  return (
    <thead className={headerClassName}>
      <tr className={trClassName}>
        {columns?.map((column, i) => (
          <th key={i} className={thClassName}>
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function Row({ children }) {
  return <tbody>{children}</tbody>;
}
Table.Header = Header;
Table.Row = Row;
export default Table;
