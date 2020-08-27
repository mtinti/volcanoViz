// Instance the tour
var tour = new Tour({
    steps: [
    {
      element: "#plot2",
      title: "Gene Highlight",
      content: "Hovering over the dots to highlight in both plots "
    },

    {
      element: "#plot2",
      title: "Drag Selection",
      content: "Dragging a selection box will \
      activate the zoom. <br> The selected genes will appear in the table. \
      <br>Double click to reset the zoom",
    },

    {
        element: "#table_wrapper",
        title: "Table Highlight",
        content: "Hovering on the table rows will highlight the genes \
        on the plots"
    },

    {
        element: "#table_filter",
        title: "Search Table",
        content: "Search with gene id or description"
    }


  ]});