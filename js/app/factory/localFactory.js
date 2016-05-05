app.factory('LocalFactory',function(){
	return{
		set:function(key,val){
			return localStorage.setItem(key,val);
		},
		get:function(key){
			return localStorage.getItem(key);
		},
		unset:function(key){
			return localStorage.removeItem(key);
		},
		removeAll(){
			return localStorage.clear();
		}
	}
});
