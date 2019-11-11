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
    
}