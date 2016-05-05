app.factory('CurrentUser',function(LocalFactory,CONFIG,$http){
	return {
		user: function(){
			if(LocalFactory.get('token_admin')){

				return angular.fromJson(LocalFactory.get('token_admin'));
			}else{
				return {};
			}
		}
	}
});
