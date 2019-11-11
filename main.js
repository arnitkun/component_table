function MyTable(options, containerElement) {
    this.colDefs = options.colDefs;
    this.data = options.data;
    this.containerElement = containerElement;
  
    this.addRows = rowDataArray => {
      this.data = [...this.data, ...rowDataArray];
      this.renderBody();
    };
}