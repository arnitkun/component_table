const options = { //sample test data
    colDefs: [
      {
        label: "Text Columns",
        width: "40%",
        type: "text"
      },
      {
        label: "Input Column",
        width: "60%",
        type: "input"
      },
      {
        label: "Checkbox Column",
        width: "30px",
        type: "checkbox"
      }
    ],
    data: [
      {
        id: "uniqueRowId",
        colData: ["Value1", "value2", true]
      },
      {
        id: "uniqueRowId1",
        colData: ["Value11", "value22", false]
      }
    ]
  };
  
function MyTable(options, containerElement) {
    this.colDefs = options.colDefs;
    this.data = options.data;
    this.containerElement = containerElement;
  
    this.addRows = rowDataArray => { 
      if(rowDataArray.find(//check if row id already exists
          ele => ele.id === rowDataArray.id)
       ){ 
         return;
        } else {
          this.data = [...this.data, ...rowDataArray];
          this.renderBody();
      }
    };

    this.deleteRows = deleteRowsIdArray => {
        this.data = this.data.filter(row => !deleteRowsIdArray.includes(row.id));//new rows exceptthe 
        this.renderBody();//render after delete
      };
    
      this.updateRows = updateRowsDataArray => {
        this.data = this.data.map(row => {
          const updateElement = updateRowsDataArray.find(
            ele => ele.id === row.id
          );
          return updateElement ? updateElement : row;// add updated row if no element exists
        });
        this.renderBody();
      };

      this.render = () => {
        this.renderHead();
        this.renderBody();
      };

      this.renderHead = () => {
        let table = document.createElement("table");
        let thead = document.createElement("thead");
        let tr = document.createElement("tr");
    
        this.colDefs.forEach(col => {// style the columns
          let td = document.createElement("td");
          td.innerText = col.label;
          td.style.width = col.width;
          tr.appendChild(td);
        });
        thead.appendChild(tr);
        table.appendChild(thead);
        this.containerElement.appendChild(table);
      };
      this.renderBody = () => {
        var table = this.containerElement.childNodes[0];
        let tbody = document.createElement("tbody");
        this.data.forEach(rowData => { 
          let trBody = document.createElement("tr");
          trBody.setAttribute("id", rowData.id);
          rowData.colData.forEach((datum, index) => {
            let td = document.createElement("td");
            if (this.colDefs[index].type === "text") {//logic for deciding cell type
              td.innerText = datum;
            } else if (this.colDefs[index].type === "input") {
              const input = document.createElement("input");
              input.setAttribute("type", "text");
              input.setAttribute("value", datum);
              input.checked = datum;
              td.appendChild(input);
            } else if (this.colDefs[index].type === "checkbox") {
              const input = document.createElement("input");
              input.setAttribute("type", "checkbox");
              input.setAttribute("value", datum);
              input.checked = datum;
              td.appendChild(input);
            }
            td.style.width = this.colDefs[index].width;
            trBody.appendChild(td);//append cell to row
          });
          tbody.appendChild(trBody);//append row to body
        });
        table.childNodes[1]//check if there is already a row. If yes, append new row else replace.
          ? table.replaceChild(tbody, table.childNodes[1])
          : table.appendChild(tbody);
      };
}

const containerElement = document.getElementById("app");
var table = new MyTable(options, containerElement);
table.render();

setTimeout(//timeout for testing
    () =>
      table.addRows([
        {
          id: "uniqueRowId3",
          colData: ["Value111", "value222", false]
        },
        {
          id: "uniqueRowId4",
          colData: ["Value1111", "value2222", true]
        }
      ]),
    1000
  );
  
  setTimeout(() => table.deleteRows(["uniqueRowId1"]), 3000);
  
  setTimeout(
    () =>
      table.updateRows([
        {
          id: "uniqueRowId7",
          colData: ["Value3", "value3", true]
        }
      ]),
    5000
  );
  