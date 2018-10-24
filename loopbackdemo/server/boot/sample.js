// module.exports = function(app) {
//   var User = app.models.user;
//   var Role = app.models.Role;
//   var RoleMapping = app.models.RoleMapping;


//   User.create([
//     {username: 'bipin', email: 'bipin@gmail.com', password: '123456',phone:'8097893343',companyname:'bipin',company_id:'121'},
  
//   ], function(err, users) {
//     if (err) throw err;

//     console.log('Created users:', users);

//     //create the admin role
//     Role.create({
//       name: 'admin'
//     }, function(err, role) {
//       if (err) throw err;

//       console.log('Created role:', role);

//       //make bob an admin
//       role.principals.create({
//         principalType: RoleMapping.USER,
//         principalId: users[0].id
//       }, function(err, principal) {
//         if (err) throw err;

//         console.log('Created principal:', principal);
//       });
//     });
//   });
// };