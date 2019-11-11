function MyTable(options, containerElement) {
    this.colDefs = options.colDefs;
    this.data = options.data;
    this.containerElement = containerElement;
  
    this.addRows = rowDataArray => {
      this.data = [...this.data, ...rowDataArray];
      this.renderBody();
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
          return updateElement ? updateElement : row;
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