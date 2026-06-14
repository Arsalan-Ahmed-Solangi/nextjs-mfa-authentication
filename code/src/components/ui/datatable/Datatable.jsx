"use client";

import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  Box,
  Skeleton,
  Stack,
  Chip,
} from "@mui/material";

import colors from "@/themes/colors";

const Datatable = ({
  columns,
  rows,
  loading = false,
  searchFieldLabel = "Search",
  rowKey,
  showEdit = false,
  showDelete = false,
  showView = false,
  showDownload = false,
  onEdit,
  onDelete,
  onView,
  onDownload,
  downloadingId,
}) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(0);
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRows = rows.filter((row) =>
    columns.some((col) =>
      String(row[col.accessor] ?? "")
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  );

  return (
    <Box>
      <TextField
        label={searchFieldLabel}
        variant="outlined"
        size="small"
        fullWidth
        value={search}
        onChange={handleSearchChange}
        sx={{
          mb: 2,
          backgroundColor: "#f9f9f9",
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />

      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={String(col.accessor)}
                  sx={{ fontSize: 12 }}
                >
                  <strong>{col.label}</strong>
                </TableCell>
              ))}

              {(showEdit ||
                showDelete ||
                showView ||
                showDownload) && (
                <TableCell sx={{ fontSize: 12 }}>
                  <strong>Actions</strong>
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              [...Array(5)].map((_, rowIndex) => (
                <TableRow key={`skeleton-row-${rowIndex}`}>
                  {columns.map((_, colIndex) => (
                    <TableCell
                      key={`skeleton-cell-${rowIndex}-${colIndex}`}
                    >
                      <Skeleton variant="text" />
                    </TableCell>
                  ))}

                  {(showEdit ||
                    showDelete ||
                    showView ||
                    showDownload) && (
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : filteredRows.length > 0 ? (
              filteredRows
                .slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
                .map((row, rowIndex) => (
                  <TableRow
                    key={
                      rowKey
                        ? row[rowKey]
                        : `row-${rowIndex}`
                    }
                  >
                    {columns.map((col, colIndex) => {
                      const value = row[col.accessor];

                      // Status chip
                      if (col.accessor === "status") {
                        const isActive =
                          value === 1 || value === true;

                        return (
                          <TableCell
                            key={`cell-${rowIndex}-${colIndex}`}
                          >
                            <Chip
                              label={
                                isActive
                                  ? "Active"
                                  : "Inactive"
                              }
                              size="small"
                              variant="outlined"
                              sx={{
                                color: isActive
                                  ? "green"
                                  : "red",
                                border: `1px solid ${
                                  isActive
                                    ? "green"
                                    : "red"
                                }`,
                                backgroundColor:
                                  "transparent",
                                fontSize: 10,
                              }}
                            />
                          </TableCell>
                        );
                      }

                      let displayValue = value;

                      // Date formatting
                      if (
                        col.accessor === "created_at" ||
                        col.accessor === "updated_at"
                      ) {
                        try {
                          const date = new Date(value);

                          displayValue = `${date.toLocaleDateString()} ${date.toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}`;
                        } catch {
                          displayValue = value;
                        }
                      }

                      return (
                        <TableCell
                          key={`cell-${rowIndex}-${colIndex}`}
                          sx={{ fontSize: 12 }}
                        >
                          {displayValue}
                        </TableCell>
                      );
                    })}

                    {(showEdit ||
                      showDelete ||
                      showView ||
                      showDownload) && (
                      <TableCell>
                        <Stack
                          direction="row"
                          spacing={1}
                        >
                          {showView && (
                            <Chip
                              label="View"
                              clickable
                              size="small"
                              onClick={() =>
                                onView?.(row)
                              }
                              sx={{
                                fontSize: 10,
                                color: colors.info,
                                border: `1px solid ${colors.info}`,
                                backgroundColor:
                                  "transparent",
                              }}
                              variant="outlined"
                            />
                          )}

                          {showEdit && (
                            <Chip
                              label="Edit"
                              clickable
                              size="small"
                              onClick={() =>
                                onEdit?.(row)
                              }
                              sx={{
                                fontSize: 10,
                                color:
                                  colors.primary,
                                border: `1px solid ${colors.primary}`,
                                backgroundColor:
                                  "transparent",
                              }}
                              variant="outlined"
                            />
                          )}

                          {showDelete && (
                            <Chip
                              label="Delete"
                              clickable
                              size="small"
                              onClick={() =>
                                onDelete?.(row)
                              }
                              sx={{
                                fontSize: 10,
                                color: colors.error,
                                border: `1px solid ${colors.error}`,
                                backgroundColor:
                                  "transparent",
                              }}
                              variant="outlined"
                            />
                          )}

                          {showDownload && (
                            <Chip
                              label="Download"
                              clickable
                              size="small"
                              disabled={
                                downloadingId ===
                                row.dataset_id
                              }
                              onClick={() =>
                                onDownload?.(row)
                              }
                              sx={{
                                fontSize: 10,
                                color:
                                  colors.success,
                                border: `1px solid ${colors.success}`,
                                backgroundColor:
                                  "transparent",
                              }}
                              variant="outlined"
                            />
                          )}
                        </Stack>
                      </TableCell>
                    )}
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={
                    columns.length + 1
                  }
                  align="center"
                >
                  <Typography variant="body2">
                    No records found.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {!loading && filteredRows.length > 0 && (
        <TablePagination
          component="div"
          count={filteredRows.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={
            handleChangeRowsPerPage
          }
          rowsPerPageOptions={[
            5, 10, 25,
          ]}
        />
      )}
    </Box>
  );
};

export default Datatable;