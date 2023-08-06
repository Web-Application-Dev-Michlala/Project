//---------------------- Graph handler --------------------
$(document).ready(function () {
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

    generathGraph(categoryData);
  });
});


function generathGraph(categoryData) {
  const width = 400;
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

    arcs.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('dy', '0.35em')
      .text(d => d.data.category)
      .style('text-anchor', 'middle');
  } catch (error) {
    console.error('An error occurred while generating the graph:', error);
  }
}

//----------------------------------------------------------------

$(document).ready(function () {
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
           const nameValueElement=$('#namevalue');
           nameValueElement.text(fullUserProfile.schemauser.userName);

           const emailValueElement=$('#emailvalue');
           emailValueElement.text(fullUserProfile.schemauser.email);

           const birthdayValueElement=$('#birthdayvalue');
           birthdayValueElement.text(fullUserProfile.schemauser.birthdate);

        },
        error: function () {
            alert("An error occurred while trying to fetch personal information");
        }
    })
});


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

$(document).ready(function () {
  });

  //-------------------------------------------------------------------------->***************************************************************************************************************
  $(document).ready(function() {
     $("#submit").click(function(event) {
        event.preventDefault();
        const oldPassword = $("#exampleInputPassword1").val();
        const newPassword = $("#exampleInputPassword2").val();
       // const user=userService.getUserById(session.userName)
        console.log(`oldPassword ${oldPassword} ,newPassword ${newPassword}`);

        
        changePassword(oldPassword,newPassword);
    })});

function changePassword(oldPassword, newPassword) {
  fetch('/adminPage/changePassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ oldPassword, newPassword})
  }).then(response => {
    if (!response.ok) {
    throw new Error('Password change failed. Incorrect old password1111.');
  }
   return response.json();
}).then(responseData => {
  if (responseData.success) {
   alert('Password change successful!');
  } else {
   alert('Password change failed. Incorrect old password2222.');
  }
})
.catch(error => {
  console.error('Error:', error);
  alert('An error occurred while changing the password. Please try again later.');
});
}
