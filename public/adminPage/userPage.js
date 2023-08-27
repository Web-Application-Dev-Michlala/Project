
//--------------------------------------------------------------------------------------------------------------->Page
$(document).ready(function(){
  $.ajax
  ({
      url:'/isLoggedIn',

  }).done(function(data)
  {
      const navbar=$('#navbar');
      if(data.isConnected!=false)
      { 
         navbar.load('public/Navbar/navBar.html',function()
         { $('#userGreet').text('Hello '+data.isConnected);
         var userLink=$('#userLink')
         userLink.attr('href','/users?username='+data.isConnected)
      })
         
      }
      else
      {
          navbar.load('public/Navbar/navBarLoggedOut.html')
      }
  });
  $.ajax({
    url: "/adminPage/profile",
    type: "GET",
    success: function (fullUserProfile) {
      const formattedDate = new Date(fullUserProfile.schemauser.birthdate).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
       const nameValueElement=$('#namevalue');
       nameValueElement.text(fullUserProfile.schemauser.userName);

       const emailValueElement=$('#emailvalue');
       emailValueElement.text(fullUserProfile.schemauser.email);

       const birthdayValueElement=$('#birthdayvalue');
       birthdayValueElement.text(formattedDate);
    },
    error: function () {
        alert("An error occurred while trying to fetch personal information");
    }
})

    

  
  
})

//--------------------------------------------------------------------------------------------------------------->Orders
$(document).ready(function () {
  $.ajax({
    url: "/adminPage/orders",
    type: "GET",
    success: function (response) {
      const orders = response.orders;
      const orderTableBody = $('#orderTableBody');
      orderTableBody.empty();
      for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        const formattedDate = new Date(order.date).toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
        const date = formattedDate;
        const price = order.price;
        const amount = order.products.length;
        const detailsButtonId = `detailsButton_${i}`; 
        const newRow = $('<tr>');
        newRow.html(`
          <th scope="row">${i + 1}</th>
          <td>${date}</td>
          <td>${price+'$'}</td>
          <td>${amount}</td>
          <td><button id="${detailsButtonId}" type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#orderDetailsModal">Details</button></td>
        `);

        orderTableBody.append(newRow);

        $(`#${detailsButtonId}`).click(function() {
          const modalBody = $('#orderDetailsContent');
        
          const tableBody = modalBody.find('tbody');
          tableBody.empty();
          order.products.forEach((product,i) => {
            const newRow = $('<tr>');
            newRow.html(`
              <td>${product.id}</td>
              <td>${product.brand}</td>
              <td>${product.name}</td>
              <td>$${product.price.$numberDecimal}</td>
              <td><img src="${product.image}" alt="${product.name}" class="product-image"></td>
            `);
            tableBody.append(newRow);
          });
        });
      }
    },
    error: function () {
      console.error("order not loaded");
    }
});
    $.ajax({
      url: "/adminPage/users",
      type: "GET",
      success: function (fullUserProfiles) {
        const userListElement = $('#userList');
        userListElement.empty(); 
        fullUserProfiles.users.forEach(( user)=>
          {
          const username = user.userName;
          const listItem = $('<li>').text(username);
          userListElement.append(listItem);
        });
      },
      error: function () {
        alert("An error occurred while trying to fetch user information");
      }
    });
});
//--------------------------------------------------------------------------------------------------------------->Graphs
function toggleGraphsTab() {
  
    var graphsTab = document.getElementById('tab5');
    var graphsLink = document.querySelector('.tab-content .nav-link[data-bs-toggle="tab"][href="#tab5"]');
    if (graphsTab.classList.contains('show')) {
        graphsTab.classList.remove('show');
        graphsLink.classList.remove('active');
    } else {
        graphsTab.classList.add('show');
        graphsLink.classList.add('active');
      }
    }
/**
 * generates a graph of most profitable category per user under 'Graph' tab
 * 
 * @param {Array} categoryData 
 */
function generateGraph(categoryData) {
      const width = 1000;
      const height = 400;
      const radius = Math.min(width, height) / 2;
    
      try {
        const svg = d3.select('#pie-chart-container')
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', `translate(${width / 2},${height / 2})`);
    
        const color = d3.scaleOrdinal(d3.schemeCategory10);
    
        const pie = d3.pie()
          .value(d => d.totalProfit);
    
        const arc = d3.arc()
          .innerRadius(0)
          .outerRadius(radius);
    
        const arcs = svg.selectAll('arc')
          .data(pie(categoryData))
          .enter()
          .append('g')
          .attr('class', 'arc');
    
        arcs.append('path')
          .attr('d', arc)
          .attr('fill', (d, i) => color(i));
        // Adding the legend
        const legend = svg.selectAll('.legend')
          .data(categoryData)
          .enter()
          .append('g')
          .attr('class', 'legend')
          .attr('transform', (d, i) => `translate(${radius + 20},${(i - categoryData.length / 2) * 20})`);
    
        legend.append('rect')
          .attr('width', 18)
          .attr('height', 18)
          .style('fill', (d, i) => color(i));
    
        legend.append('text')
          .attr('x', 24)
          .attr('y', 9)
          .attr('dy', '0.35em')
          .text(d => d.category);
      } catch (error) {
        console.error('An error occurred while generating the graph:', error);
      }
}
/**
     * Generates a graph showing the top buyers(by order count)
     * 
     * @param {Array} userData 
     */
function generateGraph3(userData) {
  const width = 1000; // Increase width to accommodate the legend
  const height = 400;
  const radius = Math.min(width, height) / 2;

  try {
    const svg = d3.select('#user-pie')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie()
      .value(d => d.totalPurchases);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const arcs = svg.selectAll('arc')
      .data(pie(userData))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => color(i));

    // Create a legend beside the pie chart
    const legend = svg.selectAll('.legend')
      .data(userData)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(${radius + 10},${(i - userData.length / 2) * 20})`); //Adjuts each legend entry to be horizontally on offset of +10 from center and vertically calculate it

    legend.append('rect')
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', (d, i) => color(i));

    legend.append('text')
      .attr('x', 20)
      .attr('y', 9)
      .attr('dy', '.35em')
      .style('text-anchor', 'start')
      .text(d => `${d.username} (Orders: ${d.totalPurchases})`); // Include the order number

  } catch (error) {
    console.error('An error occurred while generating the graph:', error);
  }
}
$(document).ready(function() {
  $.ajax({
    url: '/adminPage/topUsers',
    method: 'GET',
    dataType: 'json',
    success: function(data) {
      const pieData = data.map(([username, orderCount]) => ({
        username: username,
        totalPurchases: orderCount
      }));
      
      generateGraph3(pieData);
    },
    error: function(xhr, status, error) {
      console.error('An error occurred:', error);
    }
  });
})
$(document).ready(function(){
  let categories;
  let orders;
        
  const fetchCategories = $.ajax({
    url: "/adminPage/getCategorys",
    type: "GET",
    success: function (response) {
      categories = response;
    },
    error: function () {
      console.error("An error occurred while trying to fetch categories");
    }
  });


  const fetchOrders = $.ajax({
    url: "/adminPage/allOrders",
    type: "GET",
    success: function (response) {
      orders = response.orders;
    },
    error: function () {
      console.error("An error occurred while trying to fetch orders");
    }
  })

  $.when(fetchCategories, fetchOrders).done( () => {
    const categoryProfits = {};

    // Calculate total profits for each category
    orders.forEach(order => {
      order.products.forEach(product => {
        const category = categories.find(cat => cat.categoryName === product.category);
        if (category) {
          if (!categoryProfits[category.categoryName]) {
            categoryProfits[category.categoryName] = 0;
          }
          categoryProfits[category.categoryName] += parseFloat(product.price.$numberDecimal);
        }
      });
    });

    const categoryData = Object.keys(categoryProfits).map(categoryName => ({
    category: categoryName,
    totalProfit: categoryProfits[categoryName]
    }));

    generateGraph(categoryData);
  });
});
//--------------------------------------------------------------------------------------------------------------->Change Password
/**
 * Validates old password and updates to new password
 * 
 * @param {String} oldPassword 
 * @param {String} newPassword 
 */
function changePassword(oldPassword, newPassword) {
  fetch('/adminPage/changePassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ oldPassword, newPassword})
  }).then(response => {
    if (!response.ok) {
    alert('Password change failed. Incorrect old password.');
  }
   return response.json();
}).then(responseData => {
  if (responseData.success) {
   alert('Password change successful!');
  } else {
   alert('Password change failed. Incorrect old password.');
  }
})
.catch(error => {
  console.error('Error:', error);
  alert('An error occurred while changing the password. Please try again later.');
});
}
$(document).ready(function() {
  $("#submit").click(function(event) {
     event.preventDefault();
     const oldPassword = $("#exampleInputPassword1").val();
     const newPassword = $("#exampleInputPassword2").val();
     changePassword(oldPassword,newPassword);
     sessionStorage.removeItem('categories');
     $.ajax({
      url:'/login/logout',
      type:'GET',
      success: function(){window.location='/login'}
     })
})});
//--------------------------------------------------------------------------------------------------------------->Change Profile Details
$(document).ready(function(){
  var cvs = document.getElementById("canvas");
  ctx = cvs.getContext("2d");
  sA = (Math.PI / 180) * 45;
  sE = (Math.PI / 180) * 90;
  ca = canvas.width;
  ch = canvas.height;
  var loadAnimation
  const changeDetailsButton = document.getElementById('ChangePersonalDetails');
  const savePersonalInfoButton = $("#SavePersonalInfo");

  changeDetailsButton.addEventListener('click', function(event) {
    
    $("#changeDetailsDiv").toggleClass("d-none");
    $("#detailsDiv").toggleClass("d-none");
  });
  savePersonalInfoButton.on("click",function(event) {
    event.preventDefault();
    const newUerName = $("#newUserName").val();
    const newEmail = $("#newEmail").val();
    const newBirthday = $("#newBirthday").val();
    if(newUerName===""||newEmail===""||newBirthday==="")
      alert('please enter details');
    
    ChangeProfile(newUerName,newEmail,newBirthday);
    init();

  })
  /**
   * updates profile details along with name
   * 
   * @param {String} newName 
   * @param {Email} newEmail 
   * @param {Date} newBirthday 
   */
function ChangeProfile(newName, newEmail, newBirthday) {
  $.ajax({//Change profile and move all orders to this user
    contentType: 'application/json',
    data: JSON.stringify({ newName, newEmail, newBirthday }),
    url:'/adminPage/ChangeProfile',
    type: 'POST',
    success:function(response)
    {
      if (response.success===false) 
      {
        clearInterval(loadAnimation);
        ctx.clearRect(0, 0, ca, ch);
        console.log('error')
        alert('Change Profile failed. username already taken');
      }
      else 
      {
        $("#changeDetailsDiv").toggleClass("d-none");
        $("#detailsDiv").toggleClass("d-none");
        clearInterval(loadAnimation);
        ctx.clearRect(0, 0, ca, ch);
        alert('Profile changed successfully!');
        location.reload();
      }
    },
    error:function()
    {
      clearInterval(loadAnimation);
      ctx.clearRect(0, 0, ca, ch);
      console.log('error');
      alert('An error occurred while changing the details');
    }
})

}
function init(){//creates loading animation     
    
  loadAnimation= setInterval(function(){
      
     ctx.clearRect(0, 0, ca, ch);
     ctx.lineWidth = 15;
    
     ctx.beginPath();
     ctx.strokeStyle = "#ffffff";     
     ctx.shadowColor = "#eeeeee";
     ctx.shadowOffsetX = 2;
     ctx.shadowOffsetY = 2;
     ctx.shadowBlur = 5;
     ctx.arc(50, 50, 25, 0, 360, false);
     ctx.stroke();
     ctx.closePath();
      
     sE += 0.05; 
     sA += 0.05;
              
     ctx.beginPath();
     ctx.strokeStyle = "#aaaaaa";
     ctx.arc(50, 50, 25, sA, sE, false);
     ctx.stroke();
     ctx.closePath();   
      
  }, 6);
  
}

})

