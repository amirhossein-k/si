import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,getKeyValue} from "@heroui/react";

const Tables = () => {
  const rows = [
    { key: "1", name: "Tony Reichert", role: "CEO", status: "Active" },
    { key: "2", name: "Zoey Lang", role: "Technical Lead", status: "Paused" },
    { key: "3", name: "Jane Fisher", role: "Senior Developer", status: "Active" },
    { key: "4", name: "William Howard", role: "Community Manager", status: "Vacation" }
  ];

  const columns = [
    { key: "name", label: "NAME" },
    { key: "role", label: "ROLE" },
    { key: "status", label: "STATUS" }
  ];

  return (
    <Table  aria-label="Example static collection table" >
      <TableHeader>
        {columns.map((column) =>
          <TableColumn key={column.key} >{column.label}</TableColumn>
        )}
      </TableHeader>
      <TableBody >
         {rows.map((row, index) => (
    <TableRow
      key={row.key}
    
      style={{ backgroundColor: index % 2 === 1 ? '#afafaf' : undefined }}
    >
      {(columnKey) => <TableCell   className="rounded-r-lg even:rounded-r-none last:rounded-r-none last:rounded-l-lg">{getKeyValue(row, columnKey)}</TableCell>}
    </TableRow>
  ))}
      </TableBody>
    </Table>
  )
}
export default Tables
