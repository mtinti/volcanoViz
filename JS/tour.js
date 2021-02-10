// Instance the tour
var tour = new Tour({
    steps: [
    {
      element: "#aa1aa",
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
      element: "#aa5aa",
      title: "Drag Selection",
      content: "Clik on a circle to add a label  <br> \
      double clcik again to remove the label",
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
    },
    {
      element: "#textAreaIDs",
      title: "Search Multiple IDs",
      content: "You can input several protein IDs at the same time to visualise in the table and plots"
    }



  ]});