/*document.addEventListener('DOMContentLoaded', function() {
  const customDateInput = document.getElementById('newBirthday');
  console.log("new birthday:",newBirthday)
  console.log('customDateInput:', customDateInput);

  const today = new Date().toISOString().split('T')[0];
  console.log('today:', today);

  customDateInput.setAttribute('max', today);
});

document.addEventListener('DOMContentLoaded', function() {
  const changeDetailsButton = document.getElementById('ChangePersonalDetails');
  const iframe = document.getElementById('iframe');
  const iframeContainer = document.getElementById('changeDetails');

  changeDetailsButton.addEventListener('click', function() {
    // Set the source of the iframe to changeDetails.html
    iframe.src = "public/adminPage/changeDetails.html";

    // Show the iframe container
    iframeContainer.style.display = 'block';
  });
});*/
//------------------------------------------------------------------------------------------------------------------------------------->

document.addEventListener('DOMContentLoaded', function() {
  const changeDetailsButton = document.getElementById('ChangePersonalDetails');
  const savePersonalInfoButton = $("#SavePersonalInfo");

  changeDetailsButton.addEventListener('click', function() {
    $("#changeDetailsDiv").toggleClass("d-none");
    $("#detailsDiv").toggleClass("d-none");
  });
  savePersonalInfoButton.on("click",function() {
    const newUerName = $("#newUserName").val();
    const newEmail = $("#newEmail").val();
    const newBirthday = $("#newBirthday").val();
    ChangeProfile(newUerName,newEmail,newBirthday);

  })

});

function ChangeProfile(newName, newEmail, newBirthday) {
  fetch('/adminPage/ChangeProfile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ newName, newEmail, newBirthday })
  }).then(response => {
    if (!response.ok) {
      throw new Error('Change Profile failed.Error!!');
    }
    return response.json();
  }).then(responseData => {
    if (responseData.success) {
      $("#changeDetailsDiv").toggleClass("d-none");
      $("#detailsDiv").toggleClass("d-none");  
      alert('Profile changed successfully!');
    } else {
      alert('Profile changed failed.2222');
    }
  })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while changing the password. Please try again later.');
    });
}

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
/*
  $(document).ready(function () {
    $.ajax({
      url: "/adminPage/orders",
      type: "GET",
      success: function (fullUserProfiles) {
        const ordersListElement = $('#ordersList');
        ordersListElement.empty(); 
    
        fullUserProfiles.users.forEach(( user)=>{
          user.purchaseHistory.forEach(( order)=>{

            
           
          const listItem = $('<li>').text(order);
          ordersListElement.append(listItem);
          }); }
        
        
    );
      },
      error: function () {
        alert("An error occurred while trying to fetch user information");
      }
    });
  });
*/
  //-------------------------------------------------------------------------->***************************************************************************************************************
  $(document).ready(function() {
     $("#submit").click(function(event) {
        event.preventDefault();
        const oldPassword = $("#exampleInputPassword1").val();
        const newPassword = $("#exampleInputPassword2").val();
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
//--------------------------------------------------------------------------------------------------------------->
// $(document).ready(function() {
//   $("#SavePersonalInfo").click(function(event) {
//      event.preventDefault();
//      const newUerName = $("#newUerName").val();
//      const newEmail = $("#newEmail").val();
//      const newBirthday = $("#newBirthday").val();
//      console.log(`newUerName: ${newUerName} ,newEmail: ${newEmail} ,newBirthday ${newBirthday}`);
//      //ChangeProfile(newUerName,newEmail,newBirthday);
//  })});

