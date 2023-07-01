

$( document ).ready(function() 
{
    
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

    
    
    document.getElementById('form').addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent form submission
      
        const form = event.target;
        const username = form.querySelector('input[name="username"]').value;
        const password = form.querySelector('input[name="password"]').value;
        const birthdate = form.querySelector('input[name="birthdate"]').value;
        const email = form.querySelector('input[name="email"]').value;
      
        const payload = {
          username,
          password,
          birthdate,
          email,
        };
      
        const url = form.action;
      
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
      
          if (response.ok) 
          {
              window.location.href = '/login';
          } else {
            const data = await response.json();
            alert("username is already taken");
          }
        } catch (error) {
          console.log('Error:', error);
        }
      });
});