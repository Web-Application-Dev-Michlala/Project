
//--------------------------------------------------------------------------------------------------------------->Page Load
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
   
});
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
function ChangeProfile(newName, newEmail, newBirthday) {//Change profile details
  $.ajax({
    contentType: 'application/json',
    data: JSON.stringify({ newName, newEmail, newBirthday }),
    url:'/adminPage/ChangeProfile',
    type: 'POST',
    success:function(response)
    {
      if (response.success===false) {
        clearInterval(loadAnimation);
        ctx.clearRect(0, 0, ca, ch);
        console.log('error')
        alert('Change Profile failed. Username already taken');
      }
      else
      {
        $("#changeDetailsDiv").toggleClass("d-none");
        $("#detailsDiv").toggleClass("d-none");
        clearInterval(loadAnimation);
        ctx.clearRect(0, 0, ca, ch);
        alert('Profile changed successfully!');
        location.reload()
      }  
    },
    error:function()
    {
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
    alert('Password change failed. Incorrect old password1111.');
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



