const welcomeText = (user) => {
  const { name, role, password, site } = user;

  return `
  Hello  ${name} 

  Welcome to the team!
  You are now a member of the team as a/an ${role}
  This is where you can share your tech ideas for fellow developers.
  
  Your password is: ${password}
      
  
  NB! Make sure to change your password after your first login. <br/> <br/>

  Login here: ${site}/admin <br/>
  Or visit blog here: ${site}/ <br/> <br/>
  
  Regards,
  Mern Auth System
  `;
};

const WelcomeHTML = (user) => {
  const { name, password, role, site } = user;
  return `
    Hello  <i>${name} </i>! <br/>

    Welcome to the team! <br/>
    You are now a member of the team as a/an ${role}. <br/>
    This is where you can share your tech ideas for fellow developers. <br/> <br/>
    
    Your password is: <b>${password}</b>   <br/> <br/>
        
    
    <b>NB!</b> Make sure to change your password after your first login.   <br/> <br/>

    Login here: <a href="${site}/admin">${site}/admin</a> <br/>
    Or visit blog here: <a href="${site}/">${site}/</a> <br/> <br/>
    
    Regards,<br/>
    Mern Auth System`;
};

const HTML = (data) => {
  return `
    <h1>${data.subject}</h1>
    <p>${data.message}</p>
    `;
};

const Templates = {
  welcomeText,
  WelcomeHTML,
  HTML,
};

module.exports = { Templates };
