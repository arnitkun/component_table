## Introduction

A simple table component made in pure javacript.

The table can have variable rows and columns, with the cells belonging to any 3 of the three types: text,
input and checkbox.

The data can supplied to the table component can be changed by supplying the arguments to the script.

Contains an HTML template to test the component.

## Using table component

The component is initialized by a call to `myTable()` function, to which the arguemnts are passed.

The component provides functions to add, delete and update its rows:

### Adding row

function addRow() // list of rows is passed, containing both id and data

### Delete Row

function deleteRow() // list of row ids to delete

### update Row

function updateRow() // list of rows to update, containing both id and data