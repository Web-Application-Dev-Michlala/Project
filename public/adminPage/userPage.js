

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
