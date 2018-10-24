'use strict';


module.exports =async  (app,cb)=> {
  

  var models = app.models();
  var pgsql=app.datasources.db
   var sqlite=app.datasources.dbsql

//----------------------------connect pgsql ---------------------------//
// console.log()
 await reconnect(models,pgsql)
try{
    var usersql = await app.models.variant.find();

}catch(err){
		console.log(err)
	}
      console.log("data1")
       console.log(usersql)

//----------------------------migration------------------------------------------//


//await datasource(dbold.db)
	 await pgsql.disconnect();
await reconnect(models,sqlite)



//----------------------------------end----------------------------------------//



//--------------------------------copy from one table to another--------------//
	console.log('loop start')
  for(let i=0;i<usersql.length;i++){
         	console.log(usersql[i].regcity_code)
            var datavariant={ regcity_code:usersql[i].regcity_code,
                              company_id: usersql[i].company_id,
                              variant_id: usersql[i].variant_id,
                              variant_name: usersql[i].variant_name}
  
  	 try {
      let datafin= 	await user.create(datavariant) 
        console.log(datafin)
       }catch (error) {
         console.error(error);
      }
  }
      await sqlite.disconnect();  /// this disconnect sqlite
   

console.log("finish")
var setresult="true"
	cb(setresult);

//---------------------------------------end------------------------------------------//


//}

}

async function reconnect(models,db){

	console.log('migration waiting start')
   console.log(db.name)

   if(db.name=="db"){
      db.connect() // according to api this should work but it not connecting to pgsl
              var lbTables = ['variant'];
	console.log('migration waiting start')

	
     await  models.forEach(function(Model) {
	 	// var modelname=Model.modelName
	     Model.attachTo(db)
	 });
    }else{

       db.connect() // according to api this should work but it not connecting to sqlite but 2 time url hit it will not reconnect


    	var lbTables = ['variant'];
	console.log('migration waiting start')

	
     await  models.forEach(function(Model) {
	 	// var modelname=Model.modelName
	     Model.attachTo(db)
	 });
	 await   db.automigrate(lbTables);
   }


}


