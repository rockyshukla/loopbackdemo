'use strict';

module.exports = function(Variant) {

    Variant.beforeRemote('create', function (ctx, user, next) {
        var cmpid = ctx.args.options.accessToken.cmpname
        var regcity = cmpid.substring(0, 3);
		
		Variant.findOne({where:{company_id:cmpid,regcity_code:regcity},order:'id DESC', limit:1},function(err,data){
			if(err){
				next(err)
			}else{
				if(data!=null){
					var val = parseInt(data.variant_id)
					var variant_id = val+1
					ctx.args.data.variant_id = val+1
					ctx.args.data.company_id = cmpid
					ctx.args.data.regcity_code = regcity
				}else{
					var variant_id = 1
					ctx.args.data.variant_id = 1
					ctx.args.data.company_id = cmpid
					ctx.args.data.regcity_code = regcity
				}
				next()
			}
		});
    });

    Variant.beforeRemote('find', function (ctx, user, next) {
        var cmpid = ctx.args.options.accessToken.cmpname
        var regcity = cmpid.substring(0, 3);
    	if(ctx.args.filter != undefined){
    		var variant_id = ctx.args.filter.where.variant_id
	        ctx.args.filter={where:{or:[{company_id:cmpid,variant_id:variant_id},{company_id:'I2OCGLB',variant_id:variant_id}]},order: 'id DESC'}
    	}else{
	        ctx.args.filter={where:{or:[{company_id:cmpid},{company_id:'I2OCGLB'}],regcity_code:regcity},order: 'id DESC'}
    	}
        next()
    });


	Variant.beforeRemote('updateAll', function (ctx, user, next) {
        var cmpid = ctx.args.options.accessToken.cmpname
        var regcity = cmpid.substring(0, 3);
		var variant_id = ctx.args.where.variant_id
		ctx.args.where = {company_id:cmpid,regcity_code:regcity,variant_id:variant_id}
		next()
	});

    Variant.beforeRemote('deleteById', function (ctx, user, next) {
        var cmpid = ctx.args.options.accessToken.cmpname
        var regcity = cmpid.substring(0, 3);
		var id = ctx.args.id
		Variant.findOne({where:{id:id,company_id:cmpid,regcity_code:regcity},order:'id DESC', limit:1},function(err,data){
			if(err){
				next(err)
			}else{
				if(data!=null){
					next()
				}else{
					ctx.args.id = 0
					next()
				}
			}
		});
    });
};