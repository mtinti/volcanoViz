// Instance the tour
var tour = new Tour({
    steps: [




      {
        element: "#theImg",
        title: "Data Visualization App",
        content: "This little tour will show you some of the functionalities of this website"
      },



      {
        element: "#aa1aa",
        title: "Gene Highlight",
        content: "Hovering over the dots to highlight in both plots"
      },
    
      {
        element: "#aa5aa",
        title: "Add Label",
        content: "Clik on a circle to add a label  <br> \
        double clcik again to remove the label",
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
    },


    {
      element: "#textAreaIDs",
      title: "Search Multiple IDs",
      content: "You can input several protein IDs at the same time to visualise in the table and plots"
    },

    {
      element: "#button_2",
      title: "Ssve/Download the image",
      content: "Click on this button to save the plot as an SVG file"
    },

    //{
    //  element: "#theImg",
    //  title: "<h3>WELL DONE!!!<h3>",
    //  content: "you won a spacial prize for following this tour to the end!<br>\
    //  <button id='button_3' type='submit' class='btn btn-primary' onclick='run_joke();'>Redeem</button>"
    //},

  ]});